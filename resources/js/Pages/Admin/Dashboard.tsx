import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '../../Layouts/AdminLayout';
import { Branch, PageProps } from '../../types';
import { 
    DollarSign, 
    ShoppingBag, 
    TrendingUp, 
    Clock, 
    Flame, 
    Store, 
    Users, 
    UtensilsCrossed, 
    Calendar,
    ArrowUpRight,
    MapPin,
    CheckCircle2
} from 'lucide-react';
import { formatPrice, getLocalizedText } from '../../lib/i18n';

interface DashboardProps extends PageProps {
    metrics: {
        total_revenue: number;
        today_revenue: number;
        total_orders_count: number;
        today_orders_count: number;
        completed_orders_count: number;
        pending_orders_count: number;
        average_order_value: number;
        order_types_breakdown: {
            delivery: { count: number; revenue: number };
            collection: { count: number; revenue: number };
            dine_in: { count: number; revenue: number };
        };
        branch_comparison: Array<{
            id: number;
            name: string;
            city: string;
            orders_count: number;
            revenue: number;
            is_active: boolean;
        }>;
        top_items: Array<{
            product_id: number;
            product_name: any;
            total_qty: number;
            total_sales: number;
        }>;
        reservations_summary: {
            total: number;
            pending: number;
            upcoming: number;
        };
        recent_orders: any[];
    };
    branches: Branch[];
    selectedBranchId: number | null;
    isSuperAdmin: boolean;
}

export default function Dashboard({
    metrics,
    branches,
    selectedBranchId,
    isSuperAdmin,
}: DashboardProps) {
    const handleBranchFilter = (branchId: string) => {
        router.get(
            route('admin.dashboard'),
            { branch_id: branchId },
            { preserveState: true, preserveScroll: true }
        );
    };

    return (
        <AdminLayout title="Pulpit Analityczny & Statystyki Sieci">
            <Head title="Pulpit Administratora — Aladen Kebab" />

            <div className="space-y-8">
                {/* Top Controls: Branch Switcher & Quick KDS Access */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-900 p-4 rounded-3xl border border-neutral-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <Store className="w-5 h-5" />
                        </div>
                        <div>
                            <div className="text-xs text-neutral-400 font-bold uppercase tracking-wider">
                                Filtr Danych
                            </div>
                            <div className="text-sm font-black text-white">
                                {isSuperAdmin ? 'Wszystkie Filie Łącznie' : 'Twoja Filia'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {isSuperAdmin && (
                            <select
                                value={selectedBranchId || 'all'}
                                onChange={(e) => handleBranchFilter(e.target.value)}
                                className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-2 text-xs font-bold text-white outline-none"
                            >
                                <option value="all">Wszystkie filie (Master View)</option>
                                {branches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <Link
                            href={route('admin.kds.index')}
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-xs flex items-center gap-2 shadow-lg shadow-red-600/20"
                        >
                            <UtensilsCrossed className="w-4 h-4" />
                            <span>Otwórz KDS Kuchni</span>
                        </Link>
                    </div>
                </div>

                {/* Primary Metric Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Revenue */}
                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
                            <span>Przychód Łączny</span>
                            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                                <DollarSign className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-emerald-400 tracking-tight">
                            {formatPrice(metrics.total_revenue)}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                            Dzisiaj: <strong className="text-white">{formatPrice(metrics.today_revenue)}</strong>
                        </div>
                    </div>

                    {/* Total Orders */}
                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
                            <span>Zrealizowane Zamówienia</span>
                            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                                <ShoppingBag className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {metrics.total_orders_count}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                            Dzisiaj: <strong className="text-white">{metrics.today_orders_count}</strong> • Aktywne: <strong className="text-amber-400">{metrics.pending_orders_count}</strong>
                        </div>
                    </div>

                    {/* Average Order Value */}
                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
                            <span>Średnia Wartość Koszyka</span>
                            <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                                <TrendingUp className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {formatPrice(metrics.average_order_value)}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                            Wskaźnik rentowności sprzedaży
                        </div>
                    </div>

                    {/* Reservations */}
                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex items-center justify-between text-neutral-400 text-xs font-bold">
                            <span>Rezerwacje Stolików</span>
                            <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                                <Calendar className="w-4 h-4" />
                            </div>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                            {metrics.reservations_summary.total}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                            Oczekujące: <strong className="text-amber-400">{metrics.reservations_summary.pending}</strong> • Nadchodzące: <strong className="text-emerald-400">{metrics.reservations_summary.upcoming}</strong>
                        </div>
                    </div>
                </div>

                {/* Channels Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-neutral-400">🛵 Dostawa pod adres</span>
                            <div className="text-xl font-black text-white">
                                {metrics.order_types_breakdown.delivery.count} zam.
                            </div>
                            <div className="text-xs text-amber-400 font-semibold">
                                {formatPrice(metrics.order_types_breakdown.delivery.revenue)}
                            </div>
                        </div>
                        <span className="text-2xl">🛵</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-neutral-400">🛍️ Odbiór osobisty</span>
                            <div className="text-xl font-black text-white">
                                {metrics.order_types_breakdown.collection.count} zam.
                            </div>
                            <div className="text-xs text-amber-400 font-semibold">
                                {formatPrice(metrics.order_types_breakdown.collection.revenue)}
                            </div>
                        </div>
                        <span className="text-2xl">🛍️</span>
                    </div>

                    <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-neutral-400">🍽️ Na miejscu (Dine-in)</span>
                            <div className="text-xl font-black text-white">
                                {metrics.order_types_breakdown.dine_in.count} zam.
                            </div>
                            <div className="text-xs text-amber-400 font-semibold">
                                {formatPrice(metrics.order_types_breakdown.dine_in.revenue)}
                            </div>
                        </div>
                        <span className="text-2xl">🍽️</span>
                    </div>
                </div>

                {/* Branch Comparison Table & Top Items */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Branch Table */}
                    <div className="lg:col-span-7 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-black text-white">Porównanie Wyników Filii</h3>
                            <span className="text-xs text-neutral-400 font-semibold">{metrics.branch_comparison.length} lokali</span>
                        </div>

                        <div className="space-y-2 max-h-80 overflow-y-auto">
                            {metrics.branch_comparison.map((b) => (
                                <div
                                    key={b.id}
                                    className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between"
                                >
                                    <div className="space-y-0.5">
                                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                                            <span>{b.name}</span>
                                        </div>
                                        <div className="text-[11px] text-neutral-400">
                                            {b.city} • {b.orders_count} zamówień
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <div className="text-sm font-black text-emerald-400">
                                            {formatPrice(b.revenue)}
                                        </div>
                                        <span className="text-[10px] text-emerald-500 font-bold uppercase">
                                            Aktywny
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Selling Items */}
                    <div className="lg:col-span-5 p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                        <h3 className="text-base font-black text-white">Top Bestsellery Kebabowe</h3>

                        <div className="space-y-2.5">
                            {metrics.top_items.map((item, idx) => (
                                <div
                                    key={idx}
                                    className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center">
                                            #{idx + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <div className="text-xs font-bold text-white truncate max-w-[140px]">
                                                {getLocalizedText(item.product_name, 'pl')}
                                            </div>
                                            <div className="text-[10px] text-neutral-400">
                                                {item.total_qty} sprzedanych szt.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-xs font-black text-amber-400">
                                        {formatPrice(Number(item.total_sales) || 0)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Orders Stream */}
                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-base font-black text-white">Ostatnie Zamówienia w Sieci</h3>
                        <Link
                            href={route('admin.orders.index')}
                            className="text-xs text-amber-400 hover:text-amber-300 font-bold flex items-center gap-1"
                        >
                            <span>Zobacz wszystkie</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="text-neutral-500 font-bold uppercase border-b border-neutral-800">
                                <tr>
                                    <th className="pb-3">Nr Zamówienia</th>
                                    <th className="pb-3">Lokal</th>
                                    <th className="pb-3">Klient</th>
                                    <th className="pb-3">Typ</th>
                                    <th className="pb-3">Kwota</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Czas</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800">
                                {metrics.recent_orders.map((order) => (
                                    <tr key={order.id} className="hover:bg-neutral-850">
                                        <td className="py-3 font-mono font-bold text-amber-400">
                                            {order.order_number}
                                        </td>
                                        <td className="py-3 text-neutral-300">
                                            {order.branch?.name || 'Filia'}
                                        </td>
                                        <td className="py-3 text-white font-medium">
                                            {order.customer_name} ({order.customer_phone})
                                        </td>
                                        <td className="py-3 uppercase font-semibold text-neutral-400">
                                            {order.order_type}
                                        </td>
                                        <td className="py-3 font-bold text-white">
                                            {formatPrice(order.total_amount)}
                                        </td>
                                        <td className="py-3">
                                            <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-[10px] uppercase font-bold text-amber-400">
                                                {order.order_status}
                                            </span>
                                        </td>
                                        <td className="py-3 text-right text-neutral-400">
                                            {new Date(order.created_at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
