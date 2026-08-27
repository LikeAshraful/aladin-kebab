import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '../../Layouts/AppLayout';
import { Reservation, PageProps } from '../../types';
import { Calendar, ArrowRight, MapPin, Users, Clock } from 'lucide-react';

interface MyReservationsProps extends PageProps {
    reservations: {
        data: Reservation[];
        links: any[];
    };
}

export default function MyReservations({ reservations }: MyReservationsProps) {
    return (
        <AppLayout>
            <Head title="Moje Rezerwacje — Aladen Kebab" />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white">Moje Rezerwacje</h1>
                        <p className="text-xs text-neutral-400 mt-1">Lista Twoich rezerwacji stolików</p>
                    </div>

                    <Link
                        href={route('reservations.create')}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs shadow-md"
                    >
                        + Nowa Rezerwacja
                    </Link>
                </div>

                {reservations.data.length === 0 ? (
                    <div className="py-20 text-center space-y-3 bg-neutral-900 border border-neutral-800 rounded-3xl p-8">
                        <Calendar className="w-12 h-12 text-neutral-600 mx-auto" />
                        <h3 className="text-base font-bold text-white">Brak zarezerwowanych stolików</h3>
                        <p className="text-xs text-neutral-400">Zarezerwuj stolik na obiad lub spotkanie ze znajomymi!</p>
                        <Link
                            href={route('reservations.create')}
                            className="inline-block mt-3 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs"
                        >
                            Zarezerwuj teraz
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {reservations.data.map((res) => (
                            <Link
                                key={res.id}
                                href={route('reservations.show', { code: res.reservation_code })}
                                className="block p-5 rounded-3xl bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/50 transition-all shadow-md group"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-xs font-bold text-amber-400">
                                                {res.reservation_code}
                                            </span>
                                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] uppercase font-extrabold ${
                                                res.status === 'confirmed'
                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                            }`}>
                                                {res.status === 'confirmed' ? 'Potwierdzona' : 'Oczekuje'}
                                            </span>
                                        </div>

                                        <div className="text-sm font-bold text-white">
                                            {res.branch?.name || 'Filia Aladen'}
                                        </div>

                                        <div className="flex flex-wrap gap-4 text-xs text-neutral-400">
                                            <span className="flex items-center gap-1 text-neutral-300">
                                                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                                {res.reservation_date}
                                            </span>
                                            <span className="flex items-center gap-1 text-neutral-300">
                                                <Clock className="w-3.5 h-3.5 text-amber-400" />
                                                {res.reservation_time}
                                            </span>
                                            <span className="flex items-center gap-1 text-neutral-300">
                                                <Users className="w-3.5 h-3.5 text-amber-400" />
                                                {res.guests_count} osoby
                                            </span>
                                        </div>
                                    </div>

                                    <div className="w-8 h-8 rounded-full bg-neutral-800 group-hover:bg-amber-500 text-neutral-400 group-hover:text-black flex items-center justify-center transition-colors shrink-0">
                                        <ArrowRight className="w-4 h-4" />
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
