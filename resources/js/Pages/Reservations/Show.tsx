import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '../../Layouts/AppLayout';
import { Reservation, PageProps } from '../../types';
import { 
    CheckCircle2, 
    Calendar, 
    Clock, 
    Users, 
    MapPin, 
    Phone, 
    ArrowLeft, 
    Sparkles, 
    QrCode 
} from 'lucide-react';
import { translations, Locale } from '../../lib/i18n';

interface ReservationShowProps extends PageProps {
    reservation: Reservation;
}

export default function ReservationShow({ reservation, locale = 'pl' }: ReservationShowProps) {
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    return (
        <AppLayout branches={[]} selectedBranch={reservation.branch || null}>
            <Head title={`${t.bookTableTitle} #${reservation.reservation_code} — ${t.brandName}`} />

            <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 space-y-6">
                <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg">
                        <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-white">
                        {t.reservationConfirmedTitle}
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400">
                        {t.reservationConfirmedSub}
                    </p>
                </div>

                {/* Voucher Card */}
                <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                        <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
                                {t.reservationCode}
                            </span>
                            <div className="text-2xl font-black font-mono text-amber-400">
                                {reservation.reservation_code}
                            </div>
                        </div>

                        <div className="text-right">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                reservation.status === 'confirmed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            }`}>
                                {reservation.status === 'confirmed' ? t.statusConfirmed : t.statusPending}
                            </span>
                        </div>
                    </div>

                    {/* Meta Grid */}
                    <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                            <span className="text-neutral-500 font-semibold flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                <span>{t.date}</span>
                            </span>
                            <div className="font-black text-sm text-white">{reservation.reservation_date}</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                            <span className="text-neutral-500 font-semibold flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5 text-amber-400" />
                                <span>{t.time}</span>
                            </span>
                            <div className="font-black text-sm text-white">{reservation.reservation_time}</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                            <span className="text-neutral-500 font-semibold flex items-center gap-1">
                                <Users className="w-3.5 h-3.5 text-amber-400" />
                                <span>{t.numberOfGuests}</span>
                            </span>
                            <div className="font-black text-sm text-white">{reservation.guests_count} {t.guestsSuffix}</div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1">
                            <span className="text-neutral-500 font-semibold">{t.tableAssigned}</span>
                            <div className="font-black text-sm text-amber-400">
                                {reservation.table_assigned || t.toBeAssigned}
                            </div>
                        </div>
                    </div>

                    {/* Branch Info */}
                    {reservation.branch && (
                        <div className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-1 text-xs">
                            <div className="font-bold text-white text-sm">{reservation.branch.name}</div>
                            <div className="text-neutral-400 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                                <span>{reservation.branch.address}, {reservation.branch.city}</span>
                            </div>
                            <div className="text-neutral-400 flex items-center gap-1">
                                <Phone className="w-3.5 h-3.5 text-amber-400" />
                                <span>{reservation.branch.phone}</span>
                            </div>
                        </div>
                    )}

                    {reservation.notes && (
                        <div className="text-xs text-neutral-400 bg-neutral-950/50 p-3 rounded-xl border border-neutral-800">
                            <strong>{t.notes}</strong> {reservation.notes}
                        </div>
                    )}
                </div>

                <div className="text-center pt-2">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300 underline"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>{t.backToHome}</span>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
