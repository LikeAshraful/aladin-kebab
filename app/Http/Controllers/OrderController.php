<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Services\OrderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'branch_id' => ['required', 'exists:branches,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:30'],
            'customer_email' => ['nullable', 'email', 'max:255'],
            'order_type' => ['required', 'in:delivery,collection,dine_in'],
            'delivery_address' => ['nullable', 'array'],
            'delivery_address.street' => ['required_if:order_type,delivery', 'nullable', 'string', 'max:255'],
            'delivery_address.building_number' => ['required_if:order_type,delivery', 'nullable', 'string', 'max:50'],
            'delivery_address.apartment' => ['nullable', 'string', 'max:50'],
            'delivery_address.city' => ['required_if:order_type,delivery', 'nullable', 'string', 'max:100'],
            'delivery_address.postal_code' => ['required_if:order_type,delivery', 'nullable', 'string', 'max:20'],
            'delivery_address.door_code' => ['nullable', 'string', 'max:50'],
            'delivery_address.notes' => ['nullable', 'string', 'max:500'],
            'table_number' => ['required_if:order_type,dine_in', 'nullable', 'string', 'max:50'],
            'payment_method' => ['required', 'in:blik,card_online,cash_on_delivery,card_on_delivery,pay_at_counter'],
            'customer_notes' => ['nullable', 'string', 'max:500'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => ['required', 'exists:products,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'items.*.modifiers' => ['nullable', 'array'],
            'items.*.item_notes' => ['nullable', 'string', 'max:255'],
        ]);

        $order = $this->orderService->createOrder($validated, $request->user()?->id);

        return redirect()->route('orders.show', ['order' => $order->order_number])
            ->with('success', 'Zamówienie zostało złożone pomyślnie!');
    }

    public function show(string $orderNumber): Response
    {
        $order = Order::with(['branch', 'items.product'])->where('order_number', $orderNumber)->firstOrFail();

        return Inertia::render('Orders/Show', [
            'order' => $order,
        ]);
    }

    public function pay(Request $request, string $orderNumber): RedirectResponse
    {
        $order = Order::where('order_number', $orderNumber)->firstOrFail();

        $order->update([
            'payment_status' => 'paid',
        ]);

        return back()->with('success', 'Płatność została zaksięgowana!');
    }

    public function myOrders(Request $request): Response
    {
        $user = $request->user();
        $orders = Order::with(['branch', 'items'])
            ->where('user_id', $user->id)
            ->orderBy('id', 'desc')
            ->paginate(15);

        return Inertia::render('Orders/MyOrders', [
            'orders' => $orders,
        ]);
    }
}
