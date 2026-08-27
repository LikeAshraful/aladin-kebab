import React from 'react';
import { Flame, Plus, Sparkles, Check, AlertCircle } from 'lucide-react';
import { Product, PageProps } from '../types';
import { getLocalizedText, formatPrice, Locale, translations } from '../lib/i18n';
import { usePage } from '@inertiajs/react';

interface ProductCardProps {
    product: Product;
    onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
    const { locale = 'pl' } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    const isAvailable = product.is_available && (product.is_in_stock_at_branch !== false);

    // Get localized badge if standard string
    const getBadgeLabel = (badge: string | null | undefined) => {
        if (!badge) return null;
        if (badge === 'Bestseller') return t.bestseller;
        if (badge === 'Polecamy') return t.recommended;
        if (badge === 'Szef Poleca') return t.chefSpecial;
        if (badge === 'Klasyk') return t.classic;
        if (badge === 'Świeże') return t.fresh;
        if (badge === 'Oryginalny') return t.original;
        if (badge === 'Dla Grupy') return t.forGroup;
        if (badge === 'Ostre 🔥' || badge === 'Ostre') return t.spicyHot;
        if (badge === 'Mega Hot') return t.spicyMega;
        return badge;
    };

    return (
        <div className={`group relative flex flex-col justify-between bg-neutral-900/90 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/50 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-600/10 transition-all duration-300 ${
            !isAvailable ? 'opacity-60 grayscale-[40%]' : ''
        }`}>
            <div>
                {/* Image Section */}
                <div className="relative h-44 sm:h-48 w-full bg-neutral-950 overflow-hidden">
                    {product.image_url ? (
                        <img
                            src={product.image_url}
                            alt={getLocalizedText(product.name, currentLocale)}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-800 to-neutral-900">
                            <Flame className="w-12 h-12 text-amber-500/30" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-80" />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 pointer-events-none">
                        <div className="flex flex-wrap gap-1.5">
                            {product.badge && (
                                <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-red-600 to-amber-500 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                                    {getBadgeLabel(product.badge)}
                                </span>
                            )}
                            {product.is_vegetarian && (
                                <span className="px-2 py-0.5 rounded-lg bg-emerald-950/90 border border-emerald-500/80 text-emerald-400 font-bold text-[10px] shadow-sm">
                                    {t.vegetarian} 🌱
                                </span>
                            )}
                        </div>

                        {product.spiciness_level > 0 && (
                            <div className="px-2 py-0.5 rounded-lg bg-neutral-900/90 border border-red-500/60 text-red-400 font-bold text-[10px] flex items-center gap-1 shadow-sm">
                                <Flame className="w-3 h-3 text-red-500 fill-red-500" />
                                <span>
                                    {product.spiciness_level === 1 ? t.spicyMild : product.spiciness_level === 2 ? t.spicyHot : t.spicyMega}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-5">
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                        {getLocalizedText(product.name, currentLocale)}
                    </h3>

                    <p className="mt-1.5 text-xs text-neutral-400 line-clamp-2 leading-relaxed h-8">
                        {product.description
                            ? getLocalizedText(product.description, currentLocale)
                            : t.productDescFallback}
                    </p>
                </div>
            </div>

            {/* Bottom Price & Action */}
            <div className="p-4 sm:p-5 pt-0 flex items-center justify-between gap-3">
                <div>
                    <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">
                        {t.priceFrom}
                    </span>
                    <span className="text-lg font-black text-amber-400 tracking-tight">
                        {formatPrice(Number(product.base_price) || 0)}
                    </span>
                </div>

                {isAvailable ? (
                    <button
                        type="button"
                        onClick={() => onSelect(product)}
                        className="py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-amber-500 text-neutral-200 hover:text-black font-bold text-xs flex items-center gap-1.5 border border-neutral-700 hover:border-amber-400 transition-all group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-amber-500 group-hover:text-white group-hover:border-transparent shadow-md"
                    >
                        <Plus className="w-4 h-4" />
                        <span>{t.select}</span>
                    </button>
                ) : (
                    <span className="text-xs font-semibold text-neutral-500 py-1.5 px-2.5 bg-neutral-800/80 rounded-lg border border-neutral-800">
                        {t.unavailable}
                    </span>
                )}
            </div>
        </div>
    );
};
