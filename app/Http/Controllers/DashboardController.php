<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Maatwebsite\Excel\Facades\Excel;
use Modules\Agent\Entities\PaymentTransaction;

class DashboardController extends Controller
{
    /**
     * Constructor for the controller.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware(['auth', 'verified', 'status_check'])->except(['redirectToDashboard']);
        \cs_set('theme', [
            'title' => 'Dashboard',
            'back' => \back_url(),
            'breadcrumb' => [
                [
                    'name' => 'Dashboard',
                    'link' => false,
                ],

            ],
            'rprefix' => 'admin.dashboard',
        ]);

        $this->middleware('auth');
    }

    public function index(Request $request)
    {
        $total_agent = 0;
        $total_customer = 0;
        $top_10_agents = 0;
        $top_10_lowest_rating_agents = 0;

        $this_month_in_out = 0;

        $chartone = 10; //$this->chartOne($request);
        $chartTwo = 10; //$this->chartTwo($request);

        return view('dashboard', compact(
            'total_agent',
            'total_customer',
            'top_10_agents',
            'top_10_lowest_rating_agents',
            'this_month_in_out',
            'chartone',
            'chartTwo'
        ));
    }

    public function redirectToDashboard()
    {
        return redirect()->route('admin.dashboard');
    }

    public function importFromFile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_file' => 'required|file|mimes:xls,xlsx,csv,txt|max:204800',
        ], [
            'required' => 'Import file is missing',
            'file' => 'Should be a file',
            'mimes' => 'Only .xls, .xlsx, .csv file accepted',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => 'false',
                'errors' => $validator->errors()->all(),
            ], 400);
        } else {

            try {

                $cls = "App\Imports\\".$request->cls;
                Excel::import(new $cls(), $request->import_file);

                return response()->json(['success' => true], 200);
            } catch (\Exception $e) {

                if (get_class($e) == ValidationException::class) {
                    return response()->json([
                        'success' => 'false',
                        'errors' => $e->errors(),
                    ], 400);
                } elseif (get_class($e) == \Maatwebsite\Excel\Validators\ValidationException::class) {
                    return response()->json([
                        'success' => 'false',
                        'errors' => $e->errors(),
                    ], 400);
                } else {
                    return response()->json([
                        'success' => 'false',
                        'errors' => 'Please Follow the Demo File Data Orientation | '.get_class($e),
                    ], 400);
                }

            }

        }

    }

    public function downloadDemoFile($file_name)
    {
        $filepath = public_path('demo_files/'.$file_name);

        return Response::download($filepath);
    }

    public function getDateWiseTransactionsApi(Request $request)
    {
        return PaymentTransaction::selectRaw('DATE_FORMAT(payment_date, "%b %d") as day')
            ->selectRaw("SUM(CASE WHEN transaction_type = '1' THEN amount ELSE 0 END) AS income, ".
                "SUM(CASE WHEN transaction_type = '2' THEN amount ELSE 0 END) AS expenses")
            ->whereBetween('payment_date', [$request->start_date, $request->end_date])

            ->groupBy('day', 'transaction_type')
            ->get();
    }
}
