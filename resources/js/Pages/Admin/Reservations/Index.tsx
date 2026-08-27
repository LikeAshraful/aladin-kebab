import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '../../../Layouts/AdminLayout';
import { Reservation, Branch, PageProps } from '../../../types';
import { 
    Calendar as CalendarIcon, 
    Clock, 
    Users, 
    Check, 
    X, 
    Filter, 
    Phone, 
    Mail, 
    CheckCircle2
} from 'lucide-react';

interface ReservationsIndexProps extends PageProps {
    reservations: {
        data: Reservation[];
        links: any[];
    };
    branches: Branch[];
    filters: {
        branch_id?: string;
        status?: string;
        date?: string;
    };
    isSuperAdmin: boolean;
}

export default function ReservationsIndex({
    reservations,
    branches,
    filters,
    isSuperAdmin,
}: ReservationsIndexProps) {
    const [selectedBranchId, setSelectedBranchId] = useState(filters.branch_id || 'all');
    const [selectedStatus, setSelectedStatus] = useState(filters.status || 'all');
    const [selectedDate, setSelectedDate] = useState(filters.date || '');
    const [editingTable, setEditingTable] = useState<{ id: number; table: string } | null>(null);

    const applyFilters = () => {
        router.get(
            route('admin.reservations.index'),
            {
                branch_id: selectedBranchId,
                status: selectedStatus,
                date: selectedDate || undefined,
            },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleUpdateStatus = (reservationId: number, status: string, tableAssigned?: string) => {
        router.patch(route('admin.reservations.update', { reservation: reservationId }), {
            status,
            table_assigned: tableAssigned,
        }, {
            preserveScroll: true,
            onSuccess: () => setEditingTable(null),
        });
    };

    return (
        <AdminLayout title="Zarządzanie Rezerwacjami Stolików">
            <Head title="Rezerwacje Stolików — Aladen Kebab" />

            <div className="space-y-6">
                {/* Filter Controls */}
                <div className="p-5 rounded-3xl bg-neutral-900 border border-neutral-800">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        {isSuperAdmin && (
                            <select
                                value={selectedBranchId}
                                onChange={(e) => setSelectedBranchId(e.target.value)}
                                className="bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2.5 text-xs text-white font-semibold outline-none"
                            >
                                <option value="all">Wszystkie lokale</option>
                                {branches.map((b) => (
                                    <option key={b.id} value={b.id}>
                                        {b.name}
                                    </option>
                                ))}
                            </select>
                        )}

                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2.5 text-xs text-white font-semibold outline-none"
                        >
                            <option value="all">Wszystkie statusy</option>
                            <option value="pending">Oczekujące na akceptację</option>
                            <option value="confirmed">Potwierdzone</option>
                            <option value="completed">Zrealizowane</option>
                            <option value="cancelled">Anulowane</option>
                        </select>

                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="bg-neutral-800 border border-neutral-700 rounded-2xl px-3 py-2 text-xs text-white outline-none"
                        />

                        <button
                            type="button"
                            onClick={applyFilters}
                            className="py-2.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filtruj</span>
                        </button>
                    </div>
                </div>

                {/* Reservations Table */}
                <div className="rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-neutral-950/80 text-neutral-400 font-bold uppercase tracking-wider border-b border-neutral-800">
                                <tr>
                                    <th className="p-4">Kod Rezerwacji</th>
                                    <th className="p-4">Lokal</th>
                                    <th className="p-4">Klient & Kontakt</th>
                                    <th className="p-4">Termin & Osoby</th>
                                    <th className="p-4">Strefa & Uwagi</th>
                                    <th className="p-4">Przydzielony Stolik</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Akcje</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-neutral-800/80">
                                {reservations.data.length === 0 ? (
                                    <tr>
                                        <td colSpan={8} className="py-12 text-center text-neutral-500 font-semibold">
                                            Brak rezerwacji spełniających wybrane kryteria.
                                        </td>
                                    </tr>
                                ) : (
                                    reservations.data.map((res) => (
                                        <tr key={res.id} className="hover:bg-neutral-850 transition-colors">
                                            <td className="p-4 font-mono font-bold text-amber-400 whitespace-nowrap">
                                                {res.reservation_code}
                                            </td>

                                            <td className="p-4 text-neutral-300 font-medium">
                                                {res.branch?.name || 'Filia'}
                                            </td>

                                            <td className="p-4 space-y-0.5">
                                                <div className="font-bold text-white">{res.customer_name}</div>
                                                <div className="text-neutral-400 flex items-center gap-1">
                                                    <Phone className="w-3 h-3 text-amber-400" />
                                                    <span>{res.customer_phone}</span>
                                                </div>
                                            </td>

                                            <td className="p-4 space-y-1 whitespace-nowrap">
                                                <div className="font-bold text-white flex items-center gap-1">
                                                    <CalendarIcon className="w-3.5 h-3.5 text-amber-400" />
                                                    <span>{res.reservation_date}</span>
                                                </div>
                                                <div className="text-neutral-400 flex items-center gap-2">
                                                    <span>🕒 {res.reservation_time}</span>
                                                    <span>•</span>
                                                    <span>👥 {res.guests_count} os.</span>
                                                </div>
                                            </td>

                                            <td className="p-4 max-w-xs space-y-0.5">
                                                <span className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-bold text-amber-300">
                                                    {res.seating_preference}
                                                </span>
                                                {res.notes && (
                                                    <div className="text-[11px] text-neutral-400 truncate">
                                                        {res.notes}
                                                    </div>
                                                )}
                                            </td>

                                            <td className="p-4">
                                                {editingTable?.id === res.id ? (
                                                    <div className="flex items-center gap-1">
                                                        <input
                                                            type="text"
                                                            value={editingTable.table}
                                                            onChange={(e) => setEditingTable({ id: res.id, table: e.target.value })}
                                                            className="w-24 bg-neutral-800 border border-neutral-700 rounded-lg p-1 text-xs text-white outline-none"
                                                            placeholder="Stół 5"
                                                        />
                                                        <button
                                                            onClick={() => handleUpdateStatus(res.id, res.status, editingTable.table)}
                                                            className="p-1 rounded bg-amber-500 text-black font-bold"
                                                        >
                                                            ✓
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setEditingTable({ id: res.id, table: res.table_assigned || '' })}
                                                        className="text-xs font-bold text-neutral-300 hover:text-amber-400 underline"
                                                    >
                                                        {res.table_assigned || '+ Przypisz stół'}
                                                    </button>
                                                )}
                                            </td>

                                            <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                                    res.status === 'confirmed'
                                                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                                                        : res.status === 'pending'
                                                        ? 'bg-amber-950 text-amber-300 border border-amber-500'
                                                        : 'bg-neutral-800 text-neutral-400'
                                                }`}>
                                                    {res.status}
                                                </span>
                                            </td>

                                            <td className="p-4 text-right space-x-1 whitespace-nowrap">
                                                {res.status === 'pending' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateStatus(res.id, 'confirmed', res.table_assigned || undefined)}
                                                        className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                                                    >
                                                        Potwierdź
                                                    </button>
                                                )}
                                                {res.status === 'confirmed' && (
                                                    <button
                                                        type="button"
                                                        onClick={() => handleUpdateStatus(res.id, 'completed')}
                                                        className="px-2.5 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs"
                                                    >
                                                        Zrealizowano
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
