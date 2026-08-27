import React, { useState } from 'react';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { AppLayout } from '../../Layouts/AppLayout';
import { Branch, PageProps } from '../../types';
import { 
    Calendar as CalendarIcon, 
    Clock, 
    Users, 
    MapPin, 
    Sparkles, 
    CheckCircle2, 
    ArrowRight,
    Utensils
} from 'lucide-react';

interface ReservationCreateProps extends PageProps {
    branches: Branch[];
    selectedBranch: Branch | null;
}

export default function ReservationCreate({ branches, selectedBranch }: ReservationCreateProps) {
    const { auth } = usePage<PageProps>().props;

    const { data, setData, post, processing, errors } = useForm({
        branch_id: selectedBranch?.id || branches[0]?.id || 1,
        customer_name: auth.user?.name || '',
        customer_phone: auth.user?.phone || '',
        customer_email: auth.user?.email || '',
        guests_count: 2,
        reservation_date: new Date().toISOString().split('T')[0],
        reservation_time: '18:00',
        seating_preference: 'indoor',
        notes: '',
    });

    const timeSlots = [
        '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
        '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
        '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('reservations.store'));
    };

    return (
        <AppLayout branches={branches} selectedBranch={selectedBranch}>
            <Head title="Rezerwacja Stolika — Aladen Spicy Kebab" />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 font-bold text-xs">
                        <CalendarIcon className="w-3.5 h-3.5" />
                        <span>Darmowa Rezerwacja Online</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-white">
                        Zarezerwuj Stolik w Aladen
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                        Ciesz się gorącymi potrawami z grilla w komfortowych warunkach. Wybierz dogodny termin i preferowane miejsce.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-neutral-900 border border-neutral-800 shadow-2xl space-y-6">
                    {/* Branch Picker */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-300 block uppercase tracking-wider">
                            Wybierz Restaurację / Filię *
                        </label>
                        <select
                            value={data.branch_id}
                            onChange={(e) => setData('branch_id', Number(e.target.value))}
                            className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3.5 text-sm text-white font-semibold outline-none focus:ring-2 focus:ring-amber-500"
                        >
                            {branches.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name} — {b.address}, {b.city}
                                </option>
                            ))}
                        </select>
                        {errors.branch_id && <span className="text-xs text-red-400">{errors.branch_id}</span>}
                    </div>

                    {/* Guests & Date & Time */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="text-xs font-bold text-neutral-300 block mb-1">
                                Liczba osób *
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={40}
                                value={data.guests_count}
                                onChange={(e) => setData('guests_count', Number(e.target.value))}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-sm text-white font-bold outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            {errors.guests_count && <span className="text-xs text-red-400">{errors.guests_count}</span>}
                        </div>

                        <div>
                            <label className="text-xs font-bold text-neutral-300 block mb-1">
                                Data wizyty *
                            </label>
                            <input
                                type="date"
                                value={data.reservation_date}
                                onChange={(e) => setData('reservation_date', e.target.value)}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-sm text-white font-bold outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            {errors.reservation_date && <span className="text-xs text-red-400">{errors.reservation_date}</span>}
                        </div>

                        <div>
                            <label className="text-xs font-bold text-neutral-300 block mb-1">
                                Godzina *
                            </label>
                            <select
                                value={data.reservation_time}
                                onChange={(e) => setData('reservation_time', e.target.value)}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-sm text-white font-bold outline-none focus:ring-2 focus:ring-amber-500"
                            >
                                {timeSlots.map((slot) => (
                                    <option key={slot} value={slot}>
                                        {slot}
                                    </option>
                                ))}
                            </select>
                            {errors.reservation_time && <span className="text-xs text-red-400">{errors.reservation_time}</span>}
                        </div>
                    </div>

                    {/* Seating preference */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-neutral-300 block uppercase tracking-wider">
                            Preferowana Strefa Miejsca
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                                { key: 'indoor', label: 'Sala Główna' },
                                { key: 'outdoor', label: 'Ogródek' },
                                { key: 'terrace', label: 'Taras' },
                                { key: 'quiet_corner', label: 'Cichy Kącik / VIP' },
                            ].map((pref) => (
                                <button
                                    type="button"
                                    key={pref.key}
                                    onClick={() => setData('seating_preference', pref.key)}
                                    className={`p-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                                        data.seating_preference === pref.key
                                            ? 'bg-amber-500 text-black border-amber-400 shadow-md'
                                            : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-750'
                                    }`}
                                >
                                    {pref.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-neutral-800">
                        <div>
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Imię i nazwisko osoby rezerwującej *
                            </label>
                            <input
                                type="text"
                                value={data.customer_name}
                                onChange={(e) => setData('customer_name', e.target.value)}
                                placeholder="Jan Kowalski"
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            {errors.customer_name && <span className="text-xs text-red-400">{errors.customer_name}</span>}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Telefon do potwierdzenia *
                            </label>
                            <input
                                type="tel"
                                value={data.customer_phone}
                                onChange={(e) => setData('customer_phone', e.target.value)}
                                placeholder="+48 600 123 456"
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-amber-500"
                            />
                            {errors.customer_phone && <span className="text-xs text-red-400">{errors.customer_phone}</span>}
                        </div>

                        <div className="sm:col-span-2">
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Adres e-mail (do powiadomień)
                            </label>
                            <input
                                type="email"
                                value={data.customer_email}
                                onChange={(e) => setData('customer_email', e.target.value)}
                                placeholder="jan.kowalski@example.com"
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Dodatkowe uwagi / życzenia specjalne:
                            </label>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                placeholder="np. krzesełko dla dziecka, rezerwacja z okazji urodzin..."
                                rows={2}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl p-3 text-xs text-white outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-600/20 hover:scale-[1.01] transition-all disabled:opacity-50"
                    >
                        <span>{processing ? 'Przesyłanie...' : 'Zarezerwuj Stolik Online'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
