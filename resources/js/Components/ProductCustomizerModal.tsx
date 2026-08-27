import React, { useState, useEffect } from 'react';
import { X, Flame, Plus, Minus, Check, AlertCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { Product, ModifierGroup, ModifierOption, SelectedModifier } from '../types';
import { useCartStore } from '../stores/cartStore';
import { getLocalizedText, formatPrice, Locale } from '../lib/i18n';
import { usePage } from '@inertiajs/react';
import { PageProps } from '../types';

interface ProductCustomizerModalProps {
    product: Product | null;
    onClose: () => void;
}

export const ProductCustomizerModal: React.FC<ProductCustomizerModalProps> = ({ product, onClose }) => {
    const { locale = 'pl' } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const { addItem } = useCartStore();

    const [quantity, setQuantity] = useState(1);
    const [selectedOptionIds, setSelectedOptionIds] = useState<Record<number, number[]>>({});
    const [itemNotes, setItemNotes] = useState('');
    const [validationError, setValidationError] = useState<string | null>(null);

    // Initialize default selections when product changes
    useEffect(() => {
        if (!product) return;

        setQuantity(1);
        setItemNotes('');
        setValidationError(null);

        const initialSelections: Record<number, number[]> = {};

        if (product.modifier_groups) {
            product.modifier_groups.forEach((group) => {
                const defaultOpts = group.options
                    .filter((opt) => opt.is_default && opt.is_available)
                    .map((opt) => opt.id);

                if (defaultOpts.length > 0) {
                    initialSelections[group.id] = defaultOpts;
                } else if (group.is_required && group.options.length > 0) {
                    const firstAvail = group.options.find((o) => o.is_available);
                    if (firstAvail) {
                        initialSelections[group.id] = [firstAvail.id];
                    }
                } else {
                    initialSelections[group.id] = [];
                }
            });
        }

        setSelectedOptionIds(initialSelections);
    }, [product]);

    if (!product) return null;

    const modifierGroups = product.modifier_groups || [];

    // Toggle single/multiple option
    const handleOptionToggle = (group: ModifierGroup, option: ModifierOption) => {
        if (!option.is_available) return;

        setSelectedOptionIds((prev) => {
            const currentSelected = prev[group.id] || [];

            if (group.selection_type === 'single') {
                return {
                    ...prev,
                    [group.id]: [option.id],
                };
            } else {
                // Multiple selection
                if (currentSelected.includes(option.id)) {
                    return {
                        ...prev,
                        [group.id]: currentSelected.filter((id) => id !== option.id),
                    };
                } else {
                    if (group.max_selection && currentSelected.length >= group.max_selection) {
                        return prev; // Reached max selection limit
                    }
                    return {
                        ...prev,
                        [group.id]: [...currentSelected, option.id],
                    };
                }
            }
        });
    };

    // Calculate current unit price with selected options
    let currentUnitPrice = Number(product.base_price) || 0;
    const flatSelectedModifiers: SelectedModifier[] = [];

    modifierGroups.forEach((group) => {
        const selectedIds = selectedOptionIds[group.id] || [];
        group.options.forEach((opt) => {
            if (selectedIds.includes(opt.id)) {
                const modPrice = Number(opt.price_modifier) || 0;
                currentUnitPrice += modPrice;

                flatSelectedModifiers.push({
                    group_name: getLocalizedText(group.name, currentLocale),
                    option_name: getLocalizedText(opt.name, currentLocale) + (modPrice > 0 ? ` (+${formatPrice(modPrice)})` : ''),
                    price_modifier: modPrice,
                });
            }
        });
    });

    const calculatedTotal = Math.round(currentUnitPrice * quantity * 100) / 100;

    const handleAddToCart = () => {
        // Validate required groups
        for (const group of modifierGroups) {
            const selected = selectedOptionIds[group.id] || [];
            if (group.is_required && selected.length < (group.min_selection || 1)) {
                setValidationError(`Proszę dokonać wyboru w sekcji: "${getLocalizedText(group.name, currentLocale)}"`);
                return;
            }
        }

        addItem(product, quantity, flatSelectedModifiers, itemNotes.trim() || undefined);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
            <div className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-3xl shadow-2xl overflow-hidden text-white my-8 max-h-[90vh] flex flex-col">
                {/* Header with image */}
                <div className="relative h-48 sm:h-56 bg-neutral-950 shrink-0 overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={getLocalizedText(product.name, currentLocale)}
                            className="w-full h-full object-cover object-center"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                            <Flame className="w-16 h-16 text-amber-500/40" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />

                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Product Badges */}
                    <div className="absolute bottom-4 left-6 right-6">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            {product.badge && (
                                <span className="px-2.5 py-0.5 rounded-md bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md">
                                    {product.badge}
                                </span>
                            )}
                            {product.spiciness_level > 0 && (
                                <span className="px-2 py-0.5 rounded-md bg-red-950/80 border border-red-500 text-red-400 font-bold text-xs flex items-center gap-1">
                                    <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                                    {product.spiciness_level === 1 ? 'Łagodne' : product.spiciness_level === 2 ? 'Pikantne 🔥' : 'Mega Ogień 🔥🔥'}
                                </span>
                            )}
                            {product.is_vegetarian && (
                                <span className="px-2 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-500 text-emerald-400 font-bold text-xs">
                                    Wegetariańskie 🌱
                                </span>
                            )}
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                            {getLocalizedText(product.name, currentLocale)}
                        </h2>
                    </div>
                </div>

                {/* Scrollable Content Body */}
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                    {product.description && (
                        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-800/40 p-3.5 rounded-2xl border border-neutral-800">
                            {getLocalizedText(product.description, currentLocale)}
                        </p>
                    )}

                    {/* Validation Error Alert */}
                    {validationError && (
                        <div className="p-3.5 rounded-2xl bg-red-950/80 border border-red-800 text-xs font-semibold text-red-200 flex items-center gap-2 animate-bounce">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span>{validationError}</span>
                        </div>
                    )}

                    {/* Dynamic Modifier Groups */}
                    {modifierGroups.map((group) => {
                        const selectedInGroup = selectedOptionIds[group.id] || [];
                        const isSingle = group.selection_type === 'single';

                        return (
                            <div key={group.id} className="space-y-3 bg-neutral-800/60 p-4 rounded-2xl border border-neutral-700/60">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm text-white">
                                            {getLocalizedText(group.name, currentLocale)}
                                        </span>
                                        {group.is_required && (
                                            <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/30">
                                                Wymagane
                                            </span>
                                        )}
                                    </div>
                                    <span className="text-[11px] text-neutral-400">
                                        {isSingle
                                            ? 'Wybierz 1 opcję'
                                            : `Wybierz max. ${group.max_selection || 'dowolnie'}`}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {group.options.map((option) => {
                                        const isSelected = selectedInGroup.includes(option.id);
                                        const priceMod = Number(option.price_modifier) || 0;

                                        return (
                                            <button
                                                type="button"
                                                key={option.id}
                                                disabled={!option.is_available}
                                                onClick={() => handleOptionToggle(group, option)}
                                                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                                                    !option.is_available
                                                        ? 'opacity-40 cursor-not-allowed bg-neutral-900 border-neutral-800'
                                                        : isSelected
                                                        ? 'bg-amber-500/15 border-amber-500 text-white shadow-md shadow-amber-500/10'
                                                        : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-700/80 text-neutral-300'
                                                }`}
                                            >
                                                <div className="min-w-0 flex-1 pr-2">
                                                    <div className="text-xs sm:text-sm font-semibold truncate">
                                                        {getLocalizedText(option.name, currentLocale)}
                                                    </div>
                                                    {priceMod > 0 ? (
                                                        <div className="text-[11px] font-bold text-amber-400">
                                                            +{formatPrice(priceMod)}
                                                        </div>
                                                    ) : (
                                                        <div className="text-[10px] text-neutral-400">w cenie</div>
                                                    )}
                                                </div>

                                                <div
                                                    className={`w-5 h-5 rounded-${isSingle ? 'full' : 'md'} flex items-center justify-center shrink-0 border ${
                                                        isSelected
                                                            ? 'bg-amber-500 border-amber-400 text-black'
                                                            : 'border-neutral-600 bg-neutral-800'
                                                    }`}
                                                >
                                                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}

                    {/* Special Instructions Note */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-300">
                            Uwagi specjalne do tego dania (np. bez cebuli, sos osobno):
                        </label>
                        <textarea
                            value={itemNotes}
                            onChange={(e) => setItemNotes(e.target.value)}
                            placeholder="Wpisz ewentualne instrukcje dla kucharza..."
                            rows={2}
                            className="w-full bg-neutral-800/80 border border-neutral-700 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Sticky Modal Bottom Action Bar */}
                <div className="p-4 sm:p-6 bg-neutral-950 border-t border-neutral-800 shrink-0 flex items-center justify-between gap-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center bg-neutral-800 border border-neutral-700 rounded-2xl p-1 shrink-0">
                        <button
                            type="button"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-sm text-white">{quantity}</span>
                        <button
                            type="button"
                            onClick={() => setQuantity((q) => q + 1)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-neutral-300 hover:bg-neutral-700 hover:text-white transition-colors"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Add to cart submit button */}
                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-between shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                        <span className="flex items-center gap-2">
                            <ShoppingBag className="w-5 h-5" />
                            <span>Dodaj do zamówienia</span>
                        </span>
                        <span className="font-black tracking-wide text-yellow-200">
                            {formatPrice(calculatedTotal)}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};
