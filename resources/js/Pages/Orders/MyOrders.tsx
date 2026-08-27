import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '../../Layouts/AppLayout';
import { Order, PageProps } from '../../types';
import { ShoppingBag, ArrowRight, Clock, MapPin } from 'lucide-react';
import { formatPrice, getLocalizedText, Locale } from '../../lib/i18n';

interface MyOrdersProps extends PageProps {
    orders: {
        data: Order[];
        links: any[];
    };
}

export default function MyOrders({ orders, locale = 'pl' }: MyOrdersProps) {
    const currentLocale = (locale as Locale) || 'pl';

    return (
        <AppLayout>
            <Head title="Moje Zamówienia — Aladen Kebab" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white">Moje Zamówienia</h1>
                        <p className="text-xs text-neutral-400 mt-1">Historia Twoich zamówień online</p>
                    </div>
                </div>

                {orders.data.length === 0 ? (
                    <div className="py-20 text-center space-y-3 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                        <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto" />
                        <h3 className="text-base font-bold text-white">Brak historii zamówień</h3>
                        <p className="text-xs text-neutral-400">Złóż swoje pierwsze zamówienie z pysznego menu!</p>
                        <Link
                            href="/"
                            className="inline-block mt-3 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs"
                        >
                            Przejdź do menu
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.data.map((order) => (
                            <Link
                                key={order.id}
                                href={route('orders.show', { order: order.order_number })}
                                className="block p-5 rounded-3xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/50 transition-all shadow-md group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-amber-400">
                                                {order.order_number}
                                            </span>
                                            <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-[10px] uppercase font-bold text-neutral-300">
                                                {order.order_status}
                                            </span>
                                        </div>

                                        <div className="text-xs text-neutral-400 flex items-center gap-3">
                                            <span>{new Date(order.created_at).toLocaleDateString('pl-PL')}</span>
                                            <span>•</span>
                                            <span>{order.branch?.name || 'Filia Aladen'}</span>
                                        </div>

                                        <div className="text-xs text-neutral-300 pt-1 line-clamp-1">
                                            {(order.items || []).map((i) => `${i.quantity}x ${getLocalizedText(i.product_name, currentLocale)}`).join(', ')}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                        <span className="text-lg font-black text-amber-400">
                                            {formatPrice(order.total_amount)}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-500 text-neutral-400 group-hover:text-black flex items-center justify-center transition-colors">
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
