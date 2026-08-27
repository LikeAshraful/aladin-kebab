import React, { useState, useEffect, useRef } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '../../../Layouts/AdminLayout';
import { Order, Branch, PageProps } from '../../../types';
import { 
    UtensilsCrossed, 
    Clock, 
    Volume2, 
    VolumeX, 
    Printer, 
    CheckCircle, 
    ArrowRight, 
    Flame, 
    AlertCircle, 
    RefreshCw,
    MapPin,
    Phone
} from 'lucide-react';
import { formatPrice, getLocalizedText } from '../../../lib/i18n';
import { ThermalReceiptModal } from '../../../Components/ThermalReceiptModal';
import axios from 'axios';

interface KdsIndexProps extends PageProps {
    initialOrders: Order[];
    branches: Branch[];
    selectedBranchId: number | null;
    isSuperAdmin: boolean;
}

export default function KdsIndex({
    initialOrders,
    branches,
    selectedBranchId,
    isSuperAdmin,
    locale = 'pl',
}: KdsIndexProps) {
    const currentLocale = (locale as any) || 'pl';
    const [orders, setOrders] = useState<Order[]>(initialOrders);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [receiptText, setReceiptText] = useState<string | null>(null);
    const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());
    const [isAdvancing, setIsAdvancing] = useState<number | null>(null);
    const previousOrderCountRef = useRef(initialOrders.length);

    // Synthesize kitchen chime using Web Audio API
    const playKitchenChime = () => {
        if (!soundEnabled) return;
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5

            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.6);
        } catch {
            // Audio context fallback
        }
    };

    // Auto poll orders every 6 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const params = selectedBranchId ? { branch_id: selectedBranchId } : {};
                const res = await axios.get(route('admin.kds.fetch'), { params });
                const fetchedOrders: Order[] = res.data.orders;

                if (fetchedOrders.length > previousOrderCountRef.current) {
                    playKitchenChime();
                }
                previousOrderCountRef.current = fetchedOrders.length;
                setOrders(fetchedOrders);
                setLastFetchTime(new Date());
            } catch {
                // Ignore poll errors
            }
        }, 6000);

        return () => clearInterval(interval);
    }, [selectedBranchId, soundEnabled]);

    const handleAdvanceStatus = async (orderId: number) => {
        setIsAdvancing(orderId);
        try {
            const res = await axios.post(`/admin/api/kds/orders/${orderId}/advance`);
            if (res.data.success) {
                // Refresh local state
                setOrders((prev) =>
                    prev.map((o) => (o.id === orderId ? res.data.order : o)).filter((o) =>
                        ['pending', 'in_kitchen', 'ready', 'out_for_delivery'].includes(o.order_status)
                    )
                );
            }
        } catch (err) {
            alert('Wystąpił błąd podczas zmiany statusu.');
        } finally {
            setIsAdvancing(null);
        }
    };

    const handlePrintReceipt = async (orderId: number) => {
        try {
            const res = await axios.get(`/admin/orders/${orderId}/receipt`);
            setReceiptText(res.data.receipt_text);
        } catch {
            alert('Nie udało się pobrać paragonu.');
        }
    };

    const handleBranchFilter = (bId: string) => {
        router.get(
            route('admin.kds.index'),
            { branch_id: bId },
            { preserveState: true, preserveScroll: true }
        );
    };

    // Group orders by column
    const pendingOrders = orders.filter((o) => o.order_status === 'pending');
    const inKitchenOrders = orders.filter((o) => o.order_status === 'in_kitchen');
    const readyOrders = orders.filter((o) => o.order_status === 'ready' || o.order_status === 'out_for_delivery');

    // Calculate urgency indicator based on elapsed minutes
    const getOrderAgeInfo = (createdAt: string) => {
        const diffMinutes = Math.floor((Date.now() - new Date(createdAt).getTime()) / 60000);
        let color = 'bg-emerald-950 text-emerald-300 border-emerald-600/50';
        if (diffMinutes >= 20) {
            color = 'bg-red-950 text-red-300 border-red-500 animate-pulse';
        } else if (diffMinutes >= 10) {
            color = 'bg-amber-950 text-amber-300 border-amber-500';
        }
        return { diffMinutes, color };
    };

    return (
        <AdminLayout title="System Kuchni (KDS) — Live Kitchen Feed">
            <Head title="KDS Kuchnia — Aladen Kebab" />

            <div className="space-y-6">
                {/* KDS Control Header */}
                <div className="p-4 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center">
                            <Flame className="w-5 h-5 fill-red-400" />
                        </div>
                        <div>
                            <div className="text-base font-black text-white flex items-center gap-2">
                                <span>KDS Stanowisko Kuchni</span>
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                            </div>
                            <div className="text-xs text-neutral-400">
                                Aktywne zamówienia w przygotowaniu: <strong className="text-amber-400">{orders.length}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {isSuperAdmin && (
                            <select
                                value={selectedBranchId || 'all'}
                                onChange={(e) => handleBranchFilter(e.target.value)}
                                className="bg-neutral-800 border border-neutral-700 rounded-xl px-3 py-1.5 text-xs font-bold text-white outline-none"
                            >
                                <option value="all">Wszystkie filie</option>
                                {branches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        {/* Sound Alert Toggle */}
                        <button
                            type="button"
                            onClick={() => {
                                setSoundEnabled(!soundEnabled);
                                if (!soundEnabled) playKitchenChime();
                            }}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                                soundEnabled
                                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                                    : 'bg-neutral-800 border-neutral-700 text-neutral-400'
                            }`}
                        >
                            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            <span>{soundEnabled ? 'Dźwięk aktywny' : 'Wyciszony'}</span>
                        </button>

                        <div className="text-[11px] text-neutral-500 flex items-center gap-1 pl-2">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Odświeżono: {lastFetchTime.toLocaleTimeString('pl-PL')}</span>
                        </div>
                    </div>
                </div>

                {/* 3-Column KDS Board */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Column 1: Oczekujące / Pending */}
                    <div className="space-y-4">
                        <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-red-500" />
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                    Nowe / Oczekujące ({pendingOrders.length})
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {pendingOrders.map((order) => {
                                const { diffMinutes, color } = getOrderAgeInfo(order.created_at);

                                return (
                                    <div
                                        key={order.id}
                                        className="p-5 rounded-3xl bg-neutral-900 border-2 border-red-500/50 shadow-xl space-y-4 animate-in fade-in"
                                    >
                                        {/* Order Card Header */}
                                        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                                            <div>
                                                <span className="font-mono text-base font-black text-amber-400">
                                                    {order.order_number}
                                                </span>
                                                <div className="text-xs font-bold text-white mt-0.5">
                                                    {order.order_type === 'delivery' ? '🛵 DOSTAWA' : order.order_type === 'collection' ? '🛍️ ODBIÓR' : `🍽️ STÓŁ: ${order.table_number || '?'}`}
                                                </div>
                                            </div>

                                            <div className="text-right space-y-1">
                                                <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black border ${color}`}>
                                                    ⏱️ {diffMinutes} min temu
                                                </span>
                                            </div>
                                        </div>

                                        {/* Items Checklist */}
                                        <div className="space-y-2.5">
                                            {(order.items || []).map((item, i) => (
                                                <div key={i} className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 space-y-1">
                                                    <div className="flex justify-between text-xs font-bold text-white">
                                                        <span className="text-amber-300">
                                                            {item.quantity}x {getLocalizedText(item.product_name, currentLocale)}
                                                        </span>
                                                    </div>

                                                    {item.selected_modifiers && item.selected_modifiers.length > 0 && (
                                                        <div className="text-[11px] text-neutral-300 space-y-0.5">
                                                            {item.selected_modifiers.map((m: any, idx: number) => (
                                                                <div key={idx}>+ {m.option_name}</div>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {item.item_notes && (
                                                        <div className="text-[10px] text-red-400 font-bold italic">
                                                            ⚠️ UWAGA: {item.item_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        {order.customer_notes && (
                                            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300">
                                                <strong>Notatka klienta:</strong> {order.customer_notes}
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="pt-2 flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handlePrintReceipt(order.id)}
                                                className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                                                title="Drukuj bon kuchenny"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>

                                            <button
                                                type="button"
                                                disabled={isAdvancing === order.id}
                                                onClick={() => handleAdvanceStatus(order.id)}
                                                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
                                            >
                                                <span>Rozpocznij przygotowanie</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 2: W przygotowaniu / In Kitchen */}
                    <div className="space-y-4">
                        <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                    W Przygotowaniu ({inKitchenOrders.length})
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {inKitchenOrders.map((order) => {
                                const { diffMinutes, color } = getOrderAgeInfo(order.created_at);

                                return (
                                    <div
                                        key={order.id}
                                        className="p-5 rounded-3xl bg-neutral-900 border-2 border-amber-500/50 shadow-xl space-y-4"
                                    >
                                        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                                            <div>
                                                <span className="font-mono text-base font-black text-amber-400">
                                                    {order.order_number}
                                                </span>
                                                <div className="text-xs font-bold text-white mt-0.5">
                                                    {order.order_type === 'delivery' ? '🛵 DOSTAWA' : order.order_type === 'collection' ? '🛍️ ODBIÓR' : `🍽️ STÓŁ: ${order.table_number || '?'}`}
                                                </div>
                                            </div>

                                            <span className={`px-2.5 py-1 rounded-xl text-[11px] font-black border ${color}`}>
                                                ⏱️ {diffMinutes} min
                                            </span>
                                        </div>

                                        <div className="space-y-2.5">
                                            {(order.items || []).map((item, i) => (
                                                <div key={i} className="p-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                                                    <div className="text-xs font-bold text-amber-300">
                                                        {item.quantity}x {getLocalizedText(item.product_name, currentLocale)}
                                                    </div>
                                                    {item.selected_modifiers && item.selected_modifiers.length > 0 && (
                                                        <div className="text-[11px] text-neutral-300">
                                                            {item.selected_modifiers.map((m: any) => m.option_name).join(', ')}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>

                                        <div className="pt-2 flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handlePrintReceipt(order.id)}
                                                className="p-3 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
                                            >
                                                <Printer className="w-4 h-4" />
                                            </button>

                                            <button
                                                type="button"
                                                disabled={isAdvancing === order.id}
                                                onClick={() => handleAdvanceStatus(order.id)}
                                                className="flex-1 py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                                            >
                                                <span>✓ Oznacz jako GOTOWE</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Column 3: Gotowe / Ready */}
                    <div className="space-y-4">
                        <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                                    Gotowe do Wydania ({readyOrders.length})
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {readyOrders.map((order) => (
                                <div
                                    key={order.id}
                                    className="p-5 rounded-3xl bg-neutral-900 border-2 border-emerald-500/50 shadow-xl space-y-4"
                                >
                                    <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                                        <div>
                                            <span className="font-mono text-base font-black text-emerald-400">
                                                {order.order_number}
                                            </span>
                                            <div className="text-xs font-bold text-white mt-0.5">
                                                {order.customer_name} ({order.customer_phone})
                                            </div>
                                        </div>

                                        <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-600">
                                            {order.order_status === 'out_for_delivery' ? 'W drodze' : 'Gotowe'}
                                        </span>
                                    </div>

                                    <div className="text-xs text-neutral-300">
                                        {(order.items || []).length} pozycji • Kwota: <strong>{formatPrice(order.total_amount)}</strong>
                                    </div>

                                    <button
                                        type="button"
                                        disabled={isAdvancing === order.id}
                                        onClick={() => handleAdvanceStatus(order.id)}
                                        className="w-full py-3 px-4 rounded-2xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        <span>
                                            {order.order_type === 'delivery' && order.order_status === 'ready'
                                                ? 'Przekaż kierowcy (W drogę)'
                                                : 'Wydano klientowi (Zakończ)'}
                                        </span>
                                    </button>
                                </div>
                            ))}
                        </div>
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
