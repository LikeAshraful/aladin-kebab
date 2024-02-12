<?php

namespace App\Traits;

use App\Models\Notifications;
use App\Models\User;
use Barryvdh\DomPDF\Facade as PDF;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Modules\Cms\Entities\CmsSetting;
use Modules\Customer\Entities\Customers;
use Modules\Setting\Entities\CardTypes;
use Modules\Setting\Entities\PaymentMethods;
use Modules\Subcription\Entities\Subscription;
use Srmklive\PayPal\Services\PayPal as PayPalClient;
use Stripe\Customer;
use Stripe\Stripe;

trait Common
{
    public function agentinfo($id)
    {
        $user = User::select('user_name', 'id')->with('agent', 'agent.category', 'agent.subCategory', 'agent.country', 'agent.documents', 'agent.educations', 'agent.jobs')->findOrFail($id);

        return $user;
    }

    public function cardtype()
    {
        return $this->belongsTo(CardTypes::class, 'card_type_id', 'id');
    }

    public function payment_method()
    {
        return $this->belongsTo(PaymentMethods::class);
    }

    public function cmsSetting($id)
    {
        $CmsSetting = CmsSetting::select('details')->firstWhere('id', $id);
        $websetup = json_decode($CmsSetting?->details);

        return $websetup;
    }

    private function checkPaymentTransection($token)
    {
        try {

            $provider = new PayPalClient;

            $provider->setApiCredentials(config('paypal'));
            $provider->getAccessToken();

            $response = $provider->capturePaymentOrder($token);
            //$response = $provider->getExpressCheckoutDetails($request['token']);

            if (isset($response['status']) && $response['status'] == 'COMPLETED') {

                $result = [
                    'status' => true,
                    'message' => 'Transaction complete.',
                ];

                return (object) $result;
            } else {

                $result = [
                    'status' => false,
                    'message' => $response['message'] ?? 'Something went wrong.',
                ];

                return (object) $result;
            }
        } catch (\Exception $e) {
            $result = [
                'status' => false,
                'message' => $e->getMessage(),
            ];

            return (object) $result;
        }
    }

    private function checkStripPayment($stripeToken, $pricing, $userinfo)
    {
        try {

            Stripe::setApiKey(env('STRIPE_SECRET'));
            $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

            if (empty($userinfo->customer->stripe_cus_id)) {

                $cus = Customer::create([
                    'name' => @$userinfo->name,
                    'email' => @$userinfo->email,
                    'source' => $stripeToken,
                ]);
                $customer = $cus->id;
                Customers::where('id', $userinfo->customer->id)->update(['stripe_cus_id' => $cus->id]);

                // payment create to stripe
                $ch = $stripe->charges->create([
                    'amount' => 100 * @$pricing->trial_price,
                    'currency' => 'usd',
                    'customer' => $customer,
                    'description' => 'Payment form rocket answer',
                ]);

                $ch_id = $ch->id;
            } else {

                // payment create to stripe
                $customer = $userinfo->customer->stripe_cus_id;

                $paymentIntent = $stripe->paymentIntents->create([
                    'customer' => $customer,
                    'amount' => 100 * @$pricing->trial_price,
                    'currency' => 'usd',
                    'payment_method_data' => [
                        'type' => 'card',
                        'card' => [
                            'token' => $stripeToken,
                        ],
                    ],
                    'confirmation_method' => 'automatic',
                    'description' => 'Payment form rocket answer',
                ]);
                $ch = $paymentIntent->confirm();
                $ch_id = $ch->latest_charge;
            }

            $result = [
                'status' => true,
                'message' => 'Transaction complete.',
                'subs_id' => '',
                'ch_id' => $ch_id,
            ];

            return (object) $result;
        } catch (\Exception $e) {

            $result = [
                'status' => false,
                'message' => $e->getMessage(),
            ];

            return (object) $result;
        }
    }

    public function sentInvoiceByMail($invoice_id)
    {

        $invoice = Subscription::with(['customer', 'category'])->where('subscription_id', $invoice_id)->first();
        $data = ['invoice' => $invoice];
        $pdf = PDF::loadView('subcription::pdf.invoice', $data);

        $pdfname = 'pdf/'.$invoice->id.uniqid().'.pdf';

        Storage::put($pdfname, $pdf->output());

        $data = [
            'email' => $invoice->customer?->email,
            // 'form_address'  => 'tuhinsorker92@gmail.com',
            // 'file'          => Storage::path('pdf/invoice.pdf')
        ];
        Mail::send('subcription::pdf.email', $data, function ($message) use ($data) {
            $message->to($data['email']);
            // $message->from($data['form_address']);
            $message->subject('Payment Invoice');
            // $message->attach($data['file']);
        });

        return $pdfname;
        // if(Storage::exists('pdf/invoice.pdf')){
        //     Storage::delete('pdf/invoice.pdf');
        // }
    }

    public function paypalMerchentAccount()
    {

        $info = PaymentMethods::select('id', 'name', 'client_id')->get();
        $data = [
            'client_id' => $info[0]->client_id,
            'strip_pk_key' => $info[1]->client_id,
        ];

        return (object) $data;
    }

    public function remainingDays($invoice_package): string
    {
        $remaining_days = 0;
        $diff_in_days = 0;

        $current_date = \Carbon\Carbon::now();
        if (isset($invoice_package->invoice_date)) {
            $invoice_date = $invoice_package->invoice_date;
            $diff_in_days = $current_date->diffInDays($invoice_date);
        }
        if (isset($invoice_package->package->duration)) {
            if ($diff_in_days > 0 && $diff_in_days <= (int) $invoice_package->package->duration) {
                $remaining_days = (int) $invoice_package->package->duration - $diff_in_days;
            }
        }

        return $remaining_days;
    }

    public function productCreateToStripe($productInfo)
    {

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        //create product
        $product = $stripe->products->create([
            'name' => $productInfo['name'],
            'id' => $productInfo['name'].'-'.$productInfo['code'],
            'metadata' => [
                'name' => $productInfo['name'],
                'last-date' => date('Y-d-m'),
            ],
        ]);

        return $product->id;
    }

    public function productUpdateToStripe($productInfo)
    {
        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        //create product
        $product = $stripe->products->update([
            'name' => $productInfo['name'],
            'id' => $productInfo['code'],
            'metadata' => [
                'name' => $productInfo['name'],
                'last-date' => date('Y-d-m'),
            ],
        ]);

        return $product->id;
    }

    public function createSubscriptionToStripe($price_id, $customer_id)
    {

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));

        $subscription = $stripe->subscriptions->create([
            'customer' => $customer_id,
            'items' => [
                ['price' => $price_id],
            ],
            'metadata' => [
                'start_date' => '07-08-2023',
            ],
        ]);

        return $subscription->id;
    }

    public function subscriptionCancelToStripe($stripe_subs_id)
    {

        $stripe = new \Stripe\StripeClient(env('STRIPE_SECRET'));
        $response = $stripe->subscriptions->cancel(
            "$stripe_subs_id",
            ['prorate' => 'true']
        );

        return $response;
    }

    public function notification($data)
    {
        return Notifications::create($data);
    }
}
