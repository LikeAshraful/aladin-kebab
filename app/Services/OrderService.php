<?php

namespace App\Services;

use App\Models\Branch;
use App\Models\Order;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class OrderService
{
    public function createOrder(array $data, ?int $userId = null): Order
    {
        return DB::transaction(function () use ($data, $userId) {
            $branch = Branch::findOrFail($data['branch_id']);

            if (! $branch->is_active) {
                throw ValidationException::withMessages([
                    'branch_id' => 'Wybrany lokal jest obecnie nieczynny.',
                ]);
            }

            $orderType = $data['order_type'] ?? 'collection';
            $itemsData = $data['items'] ?? [];

            if (empty($itemsData)) {
                throw ValidationException::withMessages([
                    'items' => 'Koszyk jest pusty.',
                ]);
            }

            $subtotal = 0.0;
            $preparedItems = [];

            foreach ($itemsData as $rawItem) {
                $product = Product::with(['modifierGroups.options'])->findOrFail($rawItem['product_id']);

                if (! $product->isAvailableAtBranch($branch->id)) {
                    $prodName = is_array($product->name) ? ($product->name['pl'] ?? reset($product->name)) : $product->name;
                    throw ValidationException::withMessages([
                        'items' => "Produkt \"{$prodName}\" jest niedostępny w wybranym lokalu.",
                    ]);
                }

                $quantity = max(1, intval($rawItem['quantity'] ?? 1));
                $unitPrice = (float) $product->base_price;
                $selectedModifiers = [];

                if (! empty($rawItem['modifiers']) && is_array($rawItem['modifiers'])) {
                    foreach ($rawItem['modifiers'] as $modData) {
                        $modifierPrice = (float) ($modData['price_modifier'] ?? 0.0);
                        $unitPrice += $modifierPrice;
                        $selectedModifiers[] = [
                            'group_name' => $modData['group_name'] ?? 'Modyfikator',
                            'option_name' => $modData['option_name'] ?? '',
                            'price_modifier' => $modifierPrice,
                        ];
                    }
                }

                $itemTotal = round($unitPrice * $quantity, 2);
                $subtotal += $itemTotal;

                $preparedItems[] = [
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'unit_price' => $unitPrice,
                    'quantity' => $quantity,
                    'total_price' => $itemTotal,
                    'selected_modifiers' => $selectedModifiers,
                    'item_notes' => $rawItem['item_notes'] ?? null,
                ];
            }

            $deliveryFee = 0.0;
            if ($orderType === 'delivery') {
                if ($subtotal < $branch->min_order_amount) {
                    throw ValidationException::withMessages([
                        'subtotal' => "Minimalna kwota zamówienia z dostawą dla tej filii wynosi {$branch->min_order_amount} zł.",
                    ]);
                }

                if ($branch->free_delivery_threshold && $subtotal >= $branch->free_delivery_threshold) {
                    $deliveryFee = 0.0;
                } else {
                    $deliveryFee = (float) $branch->delivery_fee;
                }
            }

            $discountAmount = 0.0;
            $totalAmount = round($subtotal + $deliveryFee - $discountAmount, 2);

            $paymentMethod = $data['payment_method'] ?? 'blik';
            $paymentStatus = in_array($paymentMethod, ['blik', 'card_online']) ? 'paid' : 'pending';

            $estimatedMinutes = $orderType === 'delivery'
                ? $branch->estimated_delivery_time_minutes
                : $branch->estimated_prep_time_minutes;

            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'branch_id' => $branch->id,
                'user_id' => $userId,
                'customer_name' => $data['customer_name'],
                'customer_phone' => $data['customer_phone'],
                'customer_email' => $data['customer_email'] ?? null,
                'order_type' => $orderType,
                'delivery_address' => $orderType === 'delivery' ? ($data['delivery_address'] ?? null) : null,
                'table_number' => $orderType === 'dine_in' ? ($data['table_number'] ?? null) : null,
                'subtotal' => $subtotal,
                'delivery_fee' => $deliveryFee,
                'discount_amount' => $discountAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $paymentMethod,
                'payment_status' => $paymentStatus,
                'order_status' => 'pending',
                'customer_notes' => $data['customer_notes'] ?? null,
                'estimated_ready_at' => Carbon::now()->addMinutes($estimatedMinutes),
            ]);

            foreach ($preparedItems as $pItem) {
                $order->items()->create($pItem);
            }

            return $order;
        });
    }

    /**
     * Generate thermal ESC-POS formatted receipt text
     */
    public function generateReceiptText(Order $order): string
    {
        $order->loadMissing(['branch', 'items']);
        $branch = $order->branch;

        $lines = [];
        $lines[] = '==========================================';
        $lines[] = '           ALADEN SPICY KEBAB             ';
        $lines[] = '       Autentyczny Kebab i Dania          ';
        $lines[] = '==========================================';
        $lines[] = 'Lokal: '.$branch->name;
        $lines[] = 'Adres: '.$branch->address.', '.$branch->city;
        $lines[] = 'Tel:   '.$branch->phone;
        $lines[] = '------------------------------------------';
        $lines[] = 'Zamówienie: '.$order->order_number;
        $lines[] = 'Data:       '.$order->created_at->format('Y-m-d H:i:s');
        $lines[] = 'Typ:        '.strtoupper($order->order_type);
        if ($order->order_type === 'dine_in' && $order->table_number) {
            $lines[] = 'Stół:       '.$order->table_number;
        }
        $lines[] = 'Klient:     '.$order->customer_name;
        $lines[] = 'Telefon:    '.$order->customer_phone;
        if ($order->order_type === 'delivery' && ! empty($order->delivery_address)) {
            $addr = $order->delivery_address;
            $lines[] = 'Dostawa:    '.($addr['street'] ?? '').' '.($addr['building_number'] ?? '').'/'.($addr['apartment'] ?? '');
            $lines[] = 'Miasto:     '.($addr['postal_code'] ?? '').' '.($addr['city'] ?? '');
            if (! empty($addr['door_code'])) {
                $lines[] = 'Kod do domofonu: '.$addr['door_code'];
            }
        }
        $lines[] = '------------------------------------------';
        $lines[] = sprintf('%-24s %3s %10s', 'PRODUKT', 'ILO', 'KWOTA');
        $lines[] = '------------------------------------------';

        foreach ($order->items as $item) {
            $name = is_array($item->product_name) ? ($item->product_name['pl'] ?? reset($item->product_name)) : $item->product_name;
            $lines[] = sprintf('%-24s %3d %9.2f zł', mb_substr($name, 0, 24), $item->quantity, $item->total_price);

            if (! empty($item->selected_modifiers)) {
                foreach ($item->selected_modifiers as $mod) {
                    $modText = '  + '.($mod['option_name'] ?? '');
                    $lines[] = mb_substr($modText, 0, 40);
                }
            }
            if ($item->item_notes) {
                $lines[] = '  * Uwagi: '.mb_substr($item->item_notes, 0, 38);
            }
        }

        $lines[] = '------------------------------------------';
        $lines[] = sprintf('%-30s %8.2f zł', 'Suma częściowa:', $order->subtotal);
        if ($order->delivery_fee > 0) {
            $lines[] = sprintf('%-30s %8.2f zł', 'Dostawa:', $order->delivery_fee);
        }
        $lines[] = '==========================================';
        $lines[] = sprintf('%-30s %8.2f zł', 'RAZEM DO ZAPŁATY:', $order->total_amount);
        $lines[] = '==========================================';
        $lines[] = 'Płatność:  '.strtoupper($order->payment_method).' ('.strtoupper($order->payment_status).')';
        if ($order->customer_notes) {
            $lines[] = 'Notatki:   '.$order->customer_notes;
        }
        $lines[] = '------------------------------------------';
        $lines[] = '       Dziękujemy za zamówienie!          ';
        $lines[] = '          Smacznego / Afiyet olsun!       ';
        $lines[] = '==========================================';

        return implode("\n", $lines);
    }
}
