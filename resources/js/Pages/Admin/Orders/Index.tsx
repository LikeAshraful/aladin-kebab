import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AdminLayout } from '../../../Layouts/AdminLayout';
import { Order, Branch, PageProps } from '../../../types';
import { 
    ShoppingBag, 
    Search, 
    Filter, 
    Printer, 
    CheckCircle, 
    Clock, 
    MapPin, 
    Phone, 
    CreditCard,
    ArrowRight
} from 'lucide-react';
import { formatPrice, getLocalizedText } from '../../../lib/i18n';
import { ThermalReceiptModal } from '../../../Components/ThermalReceiptModal';
import axios from 'axios';

interface OrdersIndexProps extends PageProps {
    orders: {
        data: Order[];
        links: any[];
    };
    branches: Branch[];
    filters: {
        branch_id?: string;
        status?: string;
        order_type?: string;
        search?: string;
    };
    isSuperAdmin: boolean;
}

export default function OrdersIndex({
    orders,
    branches,
    filters,
    isSuperAdmin,
}: OrdersIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedBranchId, setSelectedBranchId] = useState(filters.branch_id || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [selectedOrderType, setSelectedOrderType] = useState(filters.order_type || 'all');
    const [receiptText, setReceiptText] = useState<string | null>(null);

    const applyFilters = () => {
        router.get(
            route('admin.orders.index'),
            {
                branch_id: selectedBranchId,
                status: selectedStatus,
                order_type: selectedOrderType,
                search: search || undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleStatusChange = (orderId: number, newStatus: string) => {
        router.patch(route('admin.orders.status', { order: orderId }), {
            order_status: newStatus,
        }, {
            preserveScroll: true,
        });
    };

    const handlePrintReceipt = async (orderId: number) => {
        try {
            const res = await axios.get(`/admin/orders/${orderId}/receipt`);
            setReceiptText(res.data.receipt_text);
        } catch {
            alert('Nie udało się pobrać paragonu.');
        }
    };

    return (
        <AdminLayout title="Zarządzanie Zamówieniami & POS">
            <Head title="Zamówienia — Aladen Kebab POS" />

            <div className="space-y-6">
                {/* Filter Bar */}
                <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        {/* Search Input */}
                        <div className="lg:col-span-2 relative">
                            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
                                placeholder="Szukaj po nr, nazwisku lub tel..."
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Branch Filter */}
                        {isSuperAdmin && (
                            <select
                                value={selectedBranchId}
                                onChange={(e) => {
                                    setSelectedBranchId(e.target.value);
                                }}
                                className="bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2.5 text-xs text-white font-semibold outline-none"
                            >
                                <option value="all">Wszystkie filie</option>
                                {branches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Status Filter */}
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2.5 text-xs text-white font-semibold outline-none"
                        >
                            <option value="all">Wszystkie statusy</option>
                            <option value="pending">Oczekujące</option>
                            <option value="in_kitchen">W kuchni</option>
                            <option value="ready">Gotowe</option>
                            <option value="out_for_delivery">W drodze</option>
                            <option value="delivered">Doręczone</option>
                            <option value="completed">Zrealizowane</option>
                            <option value="cancelled">Anulowane</option>
                        </select>

                        {/* Apply Button */}
                        <button
                            type="button"
                            onClick={applyFilters}
                            className="py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filtruj listę</span>
                        </button>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-neutral-950/80 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
                                <tr>
                                    <th className="p-4">Nr Zamówienia</th>
                                    <th className="p-4">Lokal</th>
                                    <th className="p-4">Klient & Kontakt</th>
                                    <th className="p-4">Typ & Adres</th>
                                    <th className="p-4">Pozycje w koszyku</th>
                                    <th className="p-4">Kwota</th>
                                    <th className="p-4">Zmień Status</th>
                                    <th className="p-4 text-right">Akcje</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800/80">
                                {orders.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-12 text-center text-neutral-500 font-semibold">
                                            Brak zamówień spełniających wybrane kryteria.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.data.map((order) => (
                                        <tr key={order.id} className="hover:bg-neutral-850 transition-colors">
                                            <td className="p-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                                                {order.order_number}
                                                <div className="text-[10px] text-neutral-500 font-sans mt-0.5">
                                                    {new Date(order.created_at).toLocaleString('pl-PL')}
                                                </div>
                                            </td>

                                            <td className="p-4 text-neutral-300 font-medium">
                                                {order.branch?.name || 'Filia'}
                                            </td>

                                            <td className="p-4 space-y-0.5">
                                                <div className="font-bold text-white">{order.customer_name}</div>
                                                <div className="text-neutral-400 flex items-center gap-1">
                                                    <Phone className="w-3 h-3 text-amber-400" />
                                                    <span>{order.customer_phone}</span>
                                                </div>
                                            </td>

                                            <td className="p-4 space-y-0.5">
                                                <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-black uppercase text-amber-300">
                                                    {order.order_type === 'delivery' ? '🛵 Dostawa' : order.order_type === 'collection' ? '🛍️ Odbiór' : '🍽️ Na miejscu'}
                                                </span>
                                                {order.order_type === 'delivery' && order.delivery_address && (
                                                    <div className="text-[11px] text-neutral-400">
                                                        {order.delivery_address.street} {order.delivery_address.building_number}, {order.delivery_address.city}
                                                    </div>
                                                )}
                                                {order.order_type === 'dine_in' && order.table_number && (
                                                    <div className="text-[11px] text-amber-400 font-bold">
                                                        {order.table_number}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="p-4 max-w-xs space-y-1">
                                                {(order.items || []).map((item, idx) => (
                                                    <div key={idx} className="text-[11px] text-neutral-300">
                                                        <strong>{item.quantity}x</strong> {getLocalizedText(item.product_name, 'pl')}
                                                    </div>
                                                ))}
                                            </td>

                                            <td className="p-4 font-black text-sm text-white whitespace-nowrap">
                                                {formatPrice(order.total_amount)}
                                                <div className="text-[10px] text-emerald-400 font-bold uppercase">
                                                    {order.payment_method}
                                                </div>
                                            </td>

                                            <td className="p-4">
                                                <select
                                                    value={order.order_status}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    className="bg-neutral-800 border border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs font-bold text-white outline-none focus:ring-1 focus:ring-amber-500"
                                                >
                                                    <option value="pending">Oczekujące</option>
                                                    <option value="in_kitchen">W kuchni</option>
                                                    <option value="ready">Gotowe</option>
                                                    <option value="out_for_delivery">W drodze</option>
                                                    <option value="delivered">Doręczone</option>
                                                    <option value="completed">Zrealizowane</option>
                                                    <option value="cancelled">Anulowane</option>
                                                </select>
                                            </td>

                                            <td className="p-4 text-right whitespace-nowrap">
                                                <button
                                                    type="button"
                                                    onClick={() => handlePrintReceipt(order.id)}
                                                    className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors"
                                                    title="Drukuj paragon ESC-POS"
                                                >
                                                    <Printer className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Thermal Receipt Preview Modal */}
            <ThermalReceiptModal
                receiptText={receiptText}
                onClose={() => setReceiptText(null)}
            />
        </AdminLayout>
    );
}
