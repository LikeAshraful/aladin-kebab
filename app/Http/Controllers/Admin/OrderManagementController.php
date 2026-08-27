<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Order;
use App\Services\OrderService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderManagementController extends Controller
{
    public function __construct(protected OrderService $orderService) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->hasRole('super-admin');

        $query = Order::with(['branch', 'items']);

        if (! $isSuperAdmin && $user->branch_id) {
            $query->where('branch_id', $user->branch_id);
        } elseif ($request->filled('branch_id') && $request->query('branch_id') !== 'all') {
            $query->where('branch_id', $request->query('branch_id'));
        }

        if ($request->filled('status') && $request->query('status') !== 'all') {
            $query->where('order_status', $request->query('status'));
        }

        if ($request->filled('order_type') && $request->query('order_type') !== 'all') {
            $query->where('order_type', $request->query('order_type'));
        }

        if ($request->filled('search')) {
            $search = $request->query('search');
            $query->where(function ($q) use ($search) {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%");
            });
        }

        $orders = $query->orderBy('id', 'desc')->paginate(20)->withQueryString();
        $branches = Branch::all();

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'branches' => $branches,
            'filters' => $request->only(['branch_id', 'status', 'order_type', 'search']),
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }

    public function updateStatus(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'order_status' => ['required', 'in:pending,in_kitchen,ready,out_for_delivery,delivered,completed,cancelled'],
            'payment_status' => ['nullable', 'in:pending,paid,failed,refunded'],
            'kitchen_notes' => ['nullable', 'string', 'max:500'],
        ]);

        $updateData = [
            'order_status' => $validated['order_status'],
        ];

        if (isset($validated['payment_status'])) {
            $updateData['payment_status'] = $validated['payment_status'];
        }

        if (isset($validated['kitchen_notes'])) {
            $updateData['kitchen_notes'] = $validated['kitchen_notes'];
        }

        if (in_array($validated['order_status'], ['delivered', 'completed'])) {
            $updateData['completed_at'] = Carbon::now();
        }

        $order->update($updateData);

        return back()->with('success', "Status zamówienia {$order->order_number} zmieniony na {$order->order_status}.");
    }

    public function receipt(Order $order): JsonResponse
    {
        $text = $this->orderService->generateReceiptText($order);

        return response()->json([
            'receipt_text' => $text,
            'order' => $order->load(['branch', 'items']),
        ]);
    }
}
