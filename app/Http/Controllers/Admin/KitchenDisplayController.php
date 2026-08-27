<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Order;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class KitchenDisplayController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->hasRole('super-admin');

        $branches = Branch::where('is_active', true)->get();

        $selectedBranchId = null;
        if (! $isSuperAdmin && $user->branch_id) {
            $selectedBranchId = $user->branch_id;
        } elseif ($request->filled('branch_id') && $request->query('branch_id') !== 'all') {
            $selectedBranchId = (int) $request->query('branch_id');
        } else {
            $selectedBranchId = $branches->first()?->id;
        }

        $orders = $this->getKdsOrders($selectedBranchId);

        return Inertia::render('Admin/Kds/Index', [
            'initialOrders' => $orders,
            'branches' => $branches,
            'selectedBranchId' => $selectedBranchId,
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }

    public function fetchOrders(Request $request): JsonResponse
    {
        $user = $request->user();
        $isSuperAdmin = $user->hasRole('super-admin');

        $branchId = null;
        if (! $isSuperAdmin && $user->branch_id) {
            $branchId = $user->branch_id;
        } elseif ($request->filled('branch_id') && $request->query('branch_id') !== 'all') {
            $branchId = (int) $request->query('branch_id');
        }

        $orders = $this->getKdsOrders($branchId);

        return response()->json([
            'orders' => $orders,
            'timestamp' => Carbon::now()->toIso8601String(),
        ]);
    }

    public function advanceStatus(Request $request, Order $order): JsonResponse
    {
        $currentStatus = $order->order_status;
        $newStatus = match ($currentStatus) {
            'pending' => 'in_kitchen',
            'in_kitchen' => 'ready',
            'ready' => $order->order_type === 'delivery' ? 'out_for_delivery' : 'completed',
            'out_for_delivery' => 'delivered',
            default => 'completed',
        };

        $updateData = ['order_status' => $newStatus];
        if (in_array($newStatus, ['delivered', 'completed'])) {
            $updateData['completed_at'] = Carbon::now();
        }

        $order->update($updateData);

        return response()->json([
            'success' => true,
            'order' => $order->load(['branch', 'items']),
            'new_status' => $newStatus,
        ]);
    }

    protected function getKdsOrders(?int $branchId)
    {
        $query = Order::with(['branch', 'items.product'])
            ->whereIn('order_status', ['pending', 'in_kitchen', 'ready', 'out_for_delivery'])
            ->orderBy('created_at', 'asc');

        if ($branchId) {
            $query->where('branch_id', $branchId);
        }

        return $query->get();
    }
}
