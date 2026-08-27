import React, { useState } from 'react';
import { Head, router, useForm } from '@inertiajs/react';
import { AdminLayout } from '../../../Layouts/AdminLayout';
import { Branch, Category, PageProps } from '../../../types';
import { 
    Store, 
    MapPin, 
    Phone, 
    Clock, 
    Check, 
    X, 
    Save, 
    Sparkles, 
    AlertCircle,
    Shield
} from 'lucide-react';
import { formatPrice, getLocalizedText } from '../../../lib/i18n';
import axios from 'axios';

interface BranchStockProps extends PageProps {
    branches: Branch[];
    selectedBranch: Branch;
    categories: Category[];
    isSuperAdmin: boolean;
}

export default function BranchStock({
    branches,
    selectedBranch,
    categories,
    isSuperAdmin,
    locale = 'pl',
}: BranchStockProps) {
    const currentLocale = (locale as any) || 'pl';
    const [branchId, setBranchId] = useState(selectedBranch.id);
    const [togglingProductId, setTogglingProductId] = useState<number | null>(null);

    const { data, setData, patch, processing } = useForm({
        name: selectedBranch.name,
        address: selectedBranch.address,
        phone: selectedBranch.phone,
        delivery_radius_km: selectedBranch.delivery_radius_km,
        min_order_amount: selectedBranch.min_order_amount,
        delivery_fee: selectedBranch.delivery_fee,
        free_delivery_threshold: selectedBranch.free_delivery_threshold || 75.0,
        is_active: selectedBranch.is_active,
    });

    const handleSwitchBranch = (id: number) => {
        setBranchId(id);
        router.get(route('admin.branches.stock'), { branch_id: id }, { preserveScroll: true });
    };

    const handleToggleStock = async (productId: number, currentStatus: boolean) => {
        setTogglingProductId(productId);
        try {
            await axios.post(`/admin/branches/${selectedBranch.id}/toggle-product`, {
                product_id: productId,
                is_in_stock: !currentStatus,
            });
            router.reload({ only: ['categories', 'selectedBranch'] });
        } catch {
            alert('Wystąpił błąd podczas zmiany dostępności produktu.');
        } finally {
            setTogglingProductId(null);
        }
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('admin.branches.update', { branch: selectedBranch.id }));
    };

    return (
        <AdminLayout title={`Stany Magazynowe & Parametry Filii: ${selectedBranch.name}`}>
            <Head title="Stany Filii — Aladen Kebab" />

            <div className="space-y-8">
                {/* Branch Switcher Header */}
                {isSuperAdmin && (
                    <div className="flex items-center gap-2 overflow-x-auto pb-2">
                        {branches.map((b) => (
                            <button
                                key={b.id}
                                onClick={() => handleSwitchBranch(b.id)}
                                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                                    selectedBranch.id === b.id
                                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                        : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                                }`}
                            >
                                <Store className="w-4 h-4" />
                                <span>{b.name}</span>
                            </button>
                        ))}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column: Product Stock Toggles */}
                    <div className="lg:col-span-7 space-y-6">
                        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                                <div>
                                    <h3 className="text-base font-black text-white">Dostępność Produktów w tej Filii</h3>
                                    <p className="text-xs text-neutral-400">
                                        Kliknij przełącznik, aby błyskawicznie wyłączyć brakujący składnik lub danie
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="space-y-2.5">
                                        <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                                            {getLocalizedText(cat.name, currentLocale)}
                                        </div>

                                        <div className="space-y-2">
                                            {(cat.products || []).map((product) => {
                                                const branchAvail = (product.branch_availabilities || [])
                                                    .find((ba: any) => ba.branch_id === selectedBranch.id);
                                                const isInStock = branchAvail ? branchAvail.is_in_stock : true;

                                                return (
                                                    <div
                                                        key={product.id}
                                                        className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex items-center justify-between"
                                                    >
                                                        <div className="min-w-0 pr-3">
                                                            <div className="text-xs font-bold text-white truncate">
                                                                {getLocalizedText(product.name, currentLocale)}
                                                            </div>
                                                            <div className="text-[11px] text-neutral-400">
                                                                Cena bazowa: {formatPrice(Number(product.base_price) || 0)}
                                                            </div>
                                                        </div>

                                                        <button
                                                            type="button"
                                                            disabled={togglingProductId === product.id}
                                                            onClick={() => handleToggleStock(product.id, isInStock)}
                                                            className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
                                                                isInStock
                                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                                                    : 'bg-red-500/20 text-red-400 border border-red-500/40'
                                                            }`}
                                                        >
                                                            {isInStock ? '✓ Dostępne' : '✕ Wyprzedane'}
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Branch Delivery & Operational Settings */}
                    <div className="lg:col-span-5 space-y-6">
                        <form onSubmit={handleSaveSettings} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                            <h3 className="text-base font-black text-white pb-3 border-b border-neutral-800">
                                Parametry Operacyjne Filii
                            </h3>

                            <div>
                                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                    Nazwa lokalu *
                                </label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                    Adres lokalu *
                                </label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                    Telefon kontaktowy *
                                </label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                        Zasięg dostawy (km) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={data.delivery_radius_km}
                                        onChange={(e) => setData('delivery_radius_km', Number(e.target.value))}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                        Min. zamówienie (zł) *
                                    </label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={data.min_order_amount}
                                        onChange={(e) => setData('min_order_amount', Number(e.target.value))}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none font-bold"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                        Koszt dostawy (zł) *
                                    </label>
                                    <input
                                        type="number"
                                        step="0.5"
                                        value={data.delivery_fee}
                                        onChange={(e) => setData('delivery_fee', Number(e.target.value))}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none font-bold"
                                    />
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                        Próg darmowej dostawy (zł)
                                    </label>
                                    <input
                                        type="number"
                                        step="1"
                                        value={data.free_delivery_threshold || ''}
                                        onChange={(e) => setData('free_delivery_threshold', Number(e.target.value))}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none font-bold"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Zapisywanie...' : 'Zapisz Ustawienia Filii'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
