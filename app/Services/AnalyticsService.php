<?php

namespace App\Services;

use App\Models\Branch;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function getMasterDashboardMetrics(?int $branchId = null): array
    {
        $ordersQuery = Order::query();
        $reservationsQuery = Reservation::query();

        if ($branchId) {
            $ordersQuery->where('branch_id', $branchId);
            $reservationsQuery->where('branch_id', $branchId);
        }

        $totalRevenue = (float) (clone $ordersQuery)->where('payment_status', 'paid')->sum('total_amount');
        $totalOrdersCount = (clone $ordersQuery)->count();
        $completedOrdersCount = (clone $ordersQuery)->whereIn('order_status', ['delivered', 'completed'])->count();
        $pendingOrdersCount = (clone $ordersQuery)->whereIn('order_status', ['pending', 'in_kitchen', 'ready', 'out_for_delivery'])->count();

        // Today's stats
        $todayOrdersQuery = (clone $ordersQuery)->whereDate('created_at', Carbon::today());
        $todayRevenue = (float) (clone $todayOrdersQuery)->where('payment_status', 'paid')->sum('total_amount');
        $todayOrdersCount = (clone $todayOrdersQuery)->count();

        $avgOrderValue = $totalOrdersCount > 0 ? round($totalRevenue / max(1, $totalOrdersCount), 2) : 0.00;

        // Breakdown by order type
        $orderTypes = (clone $ordersQuery)
            ->select('order_type', DB::raw('count(*) as count'), DB::raw('sum(total_amount) as revenue'))
            ->groupBy('order_type')
            ->get()
            ->keyBy('order_type');

        // Branch performance comparison
        $branchComparison = Branch::withCount('orders')
            ->with(['orders' => function ($q) {
                $q->where('payment_status', 'paid');
            }])
            ->get()
            ->map(function ($branch) {
                $rev = $branch->orders->sum('total_amount');

                return [
                    'id' => $branch->id,
                    'name' => $branch->name,
                    'city' => $branch->city,
                    'orders_count' => $branch->orders_count,
                    'revenue' => (float) $rev,
                    'is_active' => $branch->is_active,
                ];
            });

        // Top selling items
        $orderIds = (clone $ordersQuery)->pluck('id');
        $castProductName = match (DB::getDriverName()) {
            'mysql' => 'CAST(product_name AS CHAR)',
            default => 'CAST(product_name AS TEXT)',
        };

        $topItems = OrderItem::whereIn('order_id', $orderIds)
            ->select('product_id', DB::raw("{$castProductName} as product_name"), DB::raw('sum(quantity) as total_qty'), DB::raw('sum(total_price) as total_sales'))
            ->groupBy('product_id', DB::raw($castProductName))
            ->orderByDesc('total_qty')
            ->limit(5)
            ->get();

        // Reservations summary
        $totalReservations = (clone $reservationsQuery)->count();
        $pendingReservations = (clone $reservationsQuery)->where('status', 'pending')->count();
        $upcomingReservations = (clone $reservationsQuery)->where('reservation_date', '>=', Carbon::today())->where('status', 'confirmed')->count();

        // Recent orders stream
        $recentOrders = (clone $ordersQuery)
            ->with(['branch', 'items'])
            ->orderBy('id', 'desc')
            ->limit(10)
            ->get();

        return [
            'total_revenue' => $totalRevenue,
            'today_revenue' => $todayRevenue,
            'total_orders_count' => $totalOrdersCount,
            'today_orders_count' => $todayOrdersCount,
            'completed_orders_count' => $completedOrdersCount,
            'pending_orders_count' => $pendingOrdersCount,
            'average_order_value' => $avgOrderValue,
            'order_types_breakdown' => [
                'delivery' => [
                    'count' => $orderTypes['delivery']->count ?? 0,
                    'revenue' => (float) ($orderTypes['delivery']->revenue ?? 0),
                ],
                'collection' => [
                    'count' => $orderTypes['collection']->count ?? 0,
                    'revenue' => (float) ($orderTypes['collection']->revenue ?? 0),
                ],
                'dine_in' => [
                    'count' => $orderTypes['dine_in']->count ?? 0,
                    'revenue' => (float) ($orderTypes['dine_in']->revenue ?? 0),
                ],
            ],
            'branch_comparison' => $branchComparison,
            'top_items' => $topItems,
            'reservations_summary' => [
                'total' => $totalReservations,
                'pending' => $pendingReservations,
                'upcoming' => $upcomingReservations,
            ],
            'recent_orders' => $recentOrders,
        ];
    }
}
