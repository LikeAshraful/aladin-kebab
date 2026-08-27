import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AdminLayout } from '../../../Layouts/AdminLayout';
import { Category, ModifierGroup, Product, ModifierOption, PageProps } from '../../../types';
import { BookOpen, Flame, Plus, Edit2, Save, X, Sparkles } from 'lucide-react';
import { formatPrice, getLocalizedText } from '../../../lib/i18n';

interface MenuIndexProps extends PageProps {
    categories: Category[];
    modifierGroups: ModifierGroup[];
}

export default function MenuIndex({ categories, modifierGroups }: MenuIndexProps) {
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [productForm, setProductForm] = useState({
        base_price: 0,
        is_available: true,
        badge: '',
        spiciness_level: 0,
    });

    const [editingOption, setEditingOption] = useState<ModifierOption | null>(null);
    const [optionPrice, setOptionPrice] = useState(0);

    const handleStartEditProduct = (prod: Product) => {
        setEditingProduct(prod);
        setProductForm({
            base_price: Number(prod.base_price) || 0,
            is_available: prod.is_available,
            badge: prod.badge || '',
            spiciness_level: prod.spiciness_level,
        });
    };

    const handleSaveProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        router.patch(route('admin.menu.product.update', { product: editingProduct.id }), productForm, {
            preserveScroll: true,
            onSuccess: () => setEditingProduct(null),
        });
    };

    const handleSaveOption = (optionId: number) => {
        router.patch(route('admin.menu.option.update', { option: optionId }), {
            price_modifier: optionPrice,
            is_available: true,
        }, {
            preserveScroll: true,
            onSuccess: () => setEditingOption(null),
        });
    };

    return (
        <AdminLayout title="Zarządzanie Menu & Cennikiem">
            <Head title="Menu & Cennik — Aladen Kebab" />

            <div className="space-y-8">
                {/* Categories & Products */}
                <div className="space-y-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                                <div>
                                    <h3 className="text-base font-black text-white flex items-center gap-2">
                                        <span>{getLocalizedText(cat.name, 'pl')}</span>
                                        <span className="text-xs text-amber-400 font-mono">
                                            ({(cat.products || []).length} dań)
                                        </span>
                                    </h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {(cat.products || []).map((product) => (
                                    <div
                                        key={product.id}
                                        className="p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-3"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <div className="text-xs font-bold text-white truncate">
                                                {getLocalizedText(product.name, 'pl')}
                                            </div>
                                            <div className="text-xs font-black text-amber-400 mt-0.5">
                                                {formatPrice(Number(product.base_price) || 0)}
                                            </div>
                                            {product.badge && (
                                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-600/30 text-red-300 font-bold uppercase mt-1 inline-block">
                                                    {product.badge}
                                                </span>
                                            )}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleStartEditProduct(product)}
                                            className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white"
                                            title="Edytuj cenę i parametry"
                                        >
                                            <Edit2 className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modifier Groups & Addons Catalog */}
                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-6">
                    <h3 className="text-base font-black text-white pb-3 border-b border-neutral-800">
                        Grupy Modyfikatorów & Dodatków (Cennik Dodatków)
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {modifierGroups.map((group) => (
                            <div key={group.id} className="p-5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="font-bold text-sm text-amber-400">
                                        {getLocalizedText(group.name, 'pl')}
                                    </div>
                                    <span className="text-[10px] text-neutral-400 uppercase font-bold">
                                        {group.selection_type === 'single' ? 'Pojedynczy' : 'Wielokrotny'}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {group.options.map((opt) => (
                                        <div
                                            key={opt.id}
                                            className="p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between text-xs"
                                        >
                                            <span className="text-neutral-200">
                                                {getLocalizedText(opt.name, 'pl')}
                                            </span>

                                            {editingOption?.id === opt.id ? (
                                                <div className="flex items-center gap-1">
                                                    <input
                                                        type="number"
                                                        step="0.5"
                                                        value={optionPrice}
                                                        onChange={(e) => setOptionPrice(Number(e.target.value))}
                                                        className="w-16 bg-neutral-800 border border-neutral-700 rounded p-1 text-xs text-white"
                                                    />
                                                    <button
                                                        onClick={() => handleSaveOption(opt.id)}
                                                        className="p-1 rounded bg-amber-500 text-black font-bold"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingOption(null)}
                                                        className="p-1 rounded bg-neutral-800 text-neutral-400"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setEditingOption(opt);
                                                        setOptionPrice(Number(opt.price_modifier) || 0);
                                                    }}
                                                    className="font-black text-amber-400 hover:underline"
                                                >
                                                    {opt.price_modifier > 0 ? `+${formatPrice(Number(opt.price_modifier))}` : '0.00 zł'}
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Edit Product Modal */}
            {editingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
                    <form
                        onSubmit={handleSaveProduct}
                        className="relative w-full max-w-md bg-neutral-900 border border-neutral-700 rounded-3xl p-6 shadow-2xl space-y-4 text-white"
                    >
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                            <h4 className="font-bold text-sm">
                                Edycja: {getLocalizedText(editingProduct.name, 'pl')}
                            </h4>
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="text-neutral-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Cena bazowa (zł) *
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                value={productForm.base_price}
                                onChange={(e) => setProductForm({ ...productForm, base_price: Number(e.target.value) })}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white font-bold outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Etykieta / Badge (np. Bestseller, Nowość, Ostre)
                            </label>
                            <input
                                type="text"
                                value={productForm.badge}
                                onChange={(e) => setProductForm({ ...productForm, badge: e.target.value })}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                Poziom ostrości (0 - Brak, 1 - Łagodne, 2 - Pikantne, 3 - Mega Ogień)
                            </label>
                            <select
                                value={productForm.spiciness_level}
                                onChange={(e) => setProductForm({ ...productForm, spiciness_level: Number(e.target.value) })}
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white outline-none"
                            >
                                <option value={0}>0 — Brak</option>
                                <option value={1}>1 — Łagodne</option>
                                <option value={2}>2 — Pikantne 🔥</option>
                                <option value={3}>3 — Mega Ogień Reaper 🔥🔥</option>
                            </select>
                        </div>

                        <div className="pt-3 flex gap-2">
                            <button
                                type="button"
                                onClick={() => setEditingProduct(null)}
                                className="flex-1 py-2.5 rounded-xl bg-neutral-800 text-xs font-bold text-neutral-300"
                            >
                                Anuluj
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-2.5 rounded-xl bg-amber-500 text-black font-black text-xs shadow-lg"
                            >
                                Zapisz zmiany
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}
