import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppLayout } from '../../Layouts/AppLayout';
import { Order, PageProps } from '../../types';
import { 
    CheckCircle2, 
    Clock, 
    Flame, 
    MapPin, 
    Phone, 
    Printer, 
    ArrowLeft, 
    Sparkles, 
    ShoppingBag,
    CreditCard,
    AlertCircle
} from 'lucide-react';
import { formatPrice, getLocalizedText, Locale } from '../../lib/i18n';
import { ThermalReceiptModal } from '../../Components/ThermalReceiptModal';
import axios from 'axios';

interface OrderShowProps extends PageProps {
    order: Order;
}

export default function OrderShow({ order, locale = 'pl' }: OrderShowProps) {
    const currentLocale = (locale as Locale) || 'pl';
    const [receiptText, setReceiptText] = useState<string | null>(null);
    const [isPaying, setIsPaying] = useState(false);

    const steps = [
        { key: 'pending', label: 'Otrzymane', icon: '1' },
        { key: 'in_kitchen', label: 'W kuchni', icon: '2' },
        { key: order.order_type === 'delivery' ? 'out_for_delivery' : 'ready', label: order.order_type === 'delivery' ? 'W drodze' : 'Gotowe', icon: '3' },
        { key: 'completed', label: 'Doręczone', icon: '4' },
    ];

    const getStepIndex = (status: string) => {
        if (status === 'pending') return 0;
        if (status === 'in_kitchen') return 1;
        if (status === 'ready' || status === 'out_for_delivery') return 2;
        if (status === 'delivered' || status === 'completed') return 3;
        return 0;
    };

    const currentStepIndex = getStepIndex(order.order_status);

    const handlePrintReceipt = async () => {
        try {
            const res = await axios.get(`/admin/orders/${order.id}/receipt`);
            setReceiptText(res.data.receipt_text);
        } catch {
            alert('Nie udało się pobrać paragonu.');
        }
    };

    const handleSimulatePayment = () => {
        setIsPaying(true);
        router.post(`/orders/${order.order_number}/pay`, {}, {
            preserveScroll: true,
            onFinish: () => setIsPaying(false),
        });
    };

    return (
        <AppLayout branches={[]} selectedBranch={order.branch || null}>
            <Head title={`Zamówienie #${order.order_number} — Aladen Kebab`} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase tracking-wider">
                                {order.order_number}
                            </span>
                            <span className="text-xs text-neutral-400">
                                {new Date(order.created_at).toLocaleString('pl-PL')}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white mt-1.5">
                            Status Twojego Zamówienia
                        </h1>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={handlePrintReceipt}
                            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-2 transition-colors"
                        >
                            <Printer className="w-4 h-4 text-amber-400" />
                            <span>Drukuj Paragon</span>
                        </button>
                    </div>
                </div>

                {/* Live Progress Timeline */}
                <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-xl space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                            <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                                Aktualny etap
                            </span>
                        </div>

                        {order.estimated_ready_at && order.order_status !== 'completed' && order.order_status !== 'delivered' && (
                            <div className="text-xs text-neutral-300 font-bold flex items-center gap-1.5 bg-neutral-800 px-3 py-1.5 rounded-xl border border-neutral-700">
                                <Clock className="w-3.5 h-3.5 text-amber-400" />
                                <span>
                                    Szacowany czas: {new Date(order.estimated_ready_at).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Stepper Dots & Line */}
                    <div className="relative flex items-center justify-between">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-neutral-800 z-0" />
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-red-600 to-amber-500 z-0 transition-all duration-500"
                            style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                        />

                        {steps.map((step, idx) => {
                            const isCompleted = idx <= currentStepIndex;
                            const isCurrent = idx === currentStepIndex;

                            return (
                                <div key={step.key} className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                                            isCurrent
                                                ? 'bg-amber-500 text-black ring-4 ring-amber-500/30 scale-110 shadow-lg'
                                                : isCompleted
                                                ? 'bg-red-600 text-white'
                                                : 'bg-neutral-800 text-neutral-500 border border-neutral-700'
                                        }`}
                                    >
                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                                    </div>
                                    <span
                                        className={`text-xs font-bold mt-2 whitespace-nowrap ${
                                            isCurrent ? 'text-amber-400' : isCompleted ? 'text-neutral-200' : 'text-neutral-500'
                                        }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Branch & Delivery Info */}
                    <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                        <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                            Informacje o realizacji
                        </h3>

                        {order.branch && (
                            <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-2">
                                <div className="font-bold text-white text-sm">{order.branch.name}</div>
                                <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    <span>{order.branch.address}, {order.branch.city}</span>
                                </div>
                                <div className="text-xs text-neutral-400 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                                    <a href={`tel:${order.branch.phone}`} className="text-amber-400 hover:underline">
                                        {order.branch.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        <div className="space-y-2 text-xs text-neutral-300">
                            <div className="flex justify-between py-1 border-b border-neutral-800">
                                <span>Typ zamówienia:</span>
                                <span className="font-bold text-white uppercase">
                                    {order.order_type === 'delivery' ? '🛵 Dostawa' : order.order_type === 'collection' ? '🛍️ Odbiór' : '🍽️ Na miejscu'}
                                </span>
                            </div>

                            {order.order_type === 'delivery' && order.delivery_address && (
                                <div className="py-1 border-b border-neutral-800 space-y-0.5">
                                    <span className="text-neutral-400 block">Adres dostawy:</span>
                                    <div className="font-semibold text-white">
                                        {order.delivery_address.street} {order.delivery_address.building_number}
                                        {order.delivery_address.apartment ? `/${order.delivery_address.apartment}` : ''}
                                    </div>
                                    <div className="text-neutral-400">
                                        {order.delivery_address.postal_code} {order.delivery_address.city}
                                    </div>
                                </div>
                            )}

                            {order.order_type === 'dine_in' && (
                                <div className="flex justify-between py-1 border-b border-neutral-800">
                                    <span>Stolik:</span>
                                    <span className="font-bold text-amber-400">{order.table_number || 'Nie przypisano'}</span>
                                </div>
                            )}

                            <div className="flex justify-between py-1 border-b border-neutral-800">
                                <span>Płatność:</span>
                                <span className="font-semibold text-white uppercase">
                                    {order.payment_method} ({order.payment_status === 'paid' ? '✅ Opłacone' : '⏳ Oczekuje'})
                                </span>
                            </div>
                        </div>

                        {order.payment_status === 'pending' && (
                            <button
                                onClick={handleSimulatePayment}
                                disabled={isPaying}
                                className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                            >
                                <CreditCard className="w-4 h-4" />
                                <span>{isPaying ? 'Księgowanie...' : 'Opłać zamówienie teraz (Symulacja BLIK)'}</span>
                            </button>
                        )}
                    </div>

                    {/* Order Items Summary */}
                    <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                            <h3 className="text-sm font-bold text-neutral-400 uppercase tracking-wider">
                                Zamówione Pozycje
                            </h3>

                            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                                {(order.items || []).map((item, idx) => (
                                    <div key={idx} className="p-3 rounded-2xl bg-neutral-950/70 border border-neutral-800 space-y-1.5">
                                        <div className="flex justify-between text-xs font-bold text-white">
                                            <span>
                                                {item.quantity}x {getLocalizedText(item.product_name, currentLocale)}
                                            </span>
                                            <span className="text-amber-400">{formatPrice(item.total_price)}</span>
                                        </div>

                                        {item.selected_modifiers && item.selected_modifiers.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {item.selected_modifiers.map((mod: any, mIdx: number) => (
                                                    <span
                                                        key={mIdx}
                                                        className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] text-neutral-300"
                                                    >
                                                        {mod.option_name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Financial Totals */}
                        <div className="pt-4 border-t border-neutral-800 space-y-1.5 text-xs">
                            <div className="flex justify-between text-neutral-400">
                                <span>Wartość produktów:</span>
                                <span className="text-white">{formatPrice(order.subtotal)}</span>
                            </div>
                            {order.delivery_fee > 0 && (
                                <div className="flex justify-between text-neutral-400">
                                    <span>Dostawa:</span>
                                    <span className="text-white">{formatPrice(order.delivery_fee)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                                <span>Suma całkowita:</span>
                                <span className="text-amber-400 text-lg">{formatPrice(order.total_amount)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Wróć do strony głównej</span>
                    </Link>
                </div>
            </div>

            {/* Thermal Receipt Preview Modal */}
            <ThermalReceiptModal
                receiptText={receiptText}
                onClose={() => setReceiptText(null)}
            />
        </AppLayout>
    );
}
