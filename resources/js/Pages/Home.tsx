import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppLayout } from '../Layouts/AppLayout';
import { Branch, Category, Product, PageProps } from '../types';
import { ProductCard } from '../Components/ProductCard';
import { ProductCustomizerModal } from '../Components/ProductCustomizerModal';
import { 
    Flame, 
    Search, 
    Sparkles, 
    MapPin, 
    Calendar, 
    Clock, 
    ShieldCheck, 
    ArrowRight, 
    Leaf, 
    Utensils, 
    Phone
} from 'lucide-react';
import { getLocalizedText, Locale } from '../lib/i18n';
import { useCartStore } from '../stores/cartStore';
import { useLocationStore } from '../stores/locationStore';

interface HomeProps extends PageProps {
    branches: Branch[];
    selectedBranch: Branch | null;
    categories: Category[];
}

export default function Home({ branches, selectedBranch, categories, locale = 'pl' }: HomeProps) {
    const currentLocale = (locale as Locale) || 'pl';
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategorySlug, setActiveCategorySlug] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
    const [filterVegeOnly, setFilterVegeOnly] = useState(false);

    const { setOrderType, setCartOpen } = useCartStore();
    const { setLocationModalOpen } = useLocationStore();

    // Filter categories & products based on search & filters
    const filteredCategories = useMemo(() => {
        return categories.map((cat) => {
            const prods = (cat.products || []).filter((p) => {
                const name = getLocalizedText(p.name, currentLocale).toLowerCase();
                const desc = getLocalizedText(p.description, currentLocale).toLowerCase();
                const query = searchQuery.toLowerCase().trim();

                const matchesQuery = !query || name.includes(query) || desc.includes(query);
                const matchesSpicy = !filterSpicyOnly || p.spiciness_level > 0;
                const matchesVege = !filterVegeOnly || p.is_vegetarian;

                return matchesQuery && matchesSpicy && matchesVege;
            });

            return {
                ...cat,
                filteredProducts: prods,
            };
        }).filter((cat) => {
            if (activeCategorySlug !== 'all' && cat.slug !== activeCategorySlug) {
                return false;
            }
            return (cat.filteredProducts || []).length > 0;
        });
    }, [categories, activeCategorySlug, searchQuery, filterSpicyOnly, filterVegeOnly, currentLocale]);

    return (
        <AppLayout branches={branches} selectedBranch={selectedBranch}>
            <Head title="Aladen Spicy Kebab — Autentyczny Kebab, Dania z Grilla i Rezerwacje" />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-neutral-950 py-12 lg:py-20 border-b border-neutral-800">
                {/* Background glowing effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-red-600/20 via-amber-600/20 to-transparent rounded-full blur-3xl pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        {/* Left column: Headings & actions */}
                        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 border border-red-500/30 text-amber-400 font-bold text-xs">
                                <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
                                <span>100% Soczyste Mięso • Sosy Mega Ostry Reaper & Czosnek</span>
                            </div>

                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                                PRAWDZIWY KEBAB <br />
                                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                                    PEŁEN CHARAKTERU & OGNIA
                                </span>
                            </h1>

                            <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
                                Wybierz ulubiony rozmiar ciasta, kompozycję soczystego mięsa, autorskie sosy i dodatki. Dostarczamy gorące prosto z rusztu w Będzinie, Sosnowcu, Katowicach i okolicach!
                            </p>

                            {/* CTAs */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                                <button
                                    onClick={() => {
                                        setOrderType('delivery');
                                        const el = document.getElementById('menu-section');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                >
                                    <span>Zamów z Dostawą</span>
                                    <ArrowRight className="w-4 h-4" />
                                </button>

                                <Link
                                    href={route('reservations.create')}
                                    className="px-6 py-3.5 rounded-2xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 hover:text-white font-bold text-sm transition-all flex items-center gap-2"
                                >
                                    <Calendar className="w-4 h-4 text-amber-400" />
                                    <span>Rezerwuj Stolik</span>
                                </Link>

                                <button
                                    onClick={() => setLocationModalOpen(true)}
                                    className="px-4 py-3.5 rounded-2xl bg-neutral-900/60 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-1.5"
                                >
                                    <MapPin className="w-4 h-4 text-neutral-400" />
                                    <span>Filie ({branches.length})</span>
                                </button>
                            </div>

                            {/* Badges / Guarantees */}
                            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-neutral-800/80 max-w-lg mx-auto lg:mx-0 text-left">
                                <div className="space-y-0.5">
                                    <div className="text-base font-black text-amber-400">~35 min</div>
                                    <div className="text-[11px] text-neutral-400">Szybka dostawa</div>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-base font-black text-amber-400">55 cm</div>
                                    <div className="text-[11px] text-neutral-400">Special Mega Gigant</div>
                                </div>
                                <div className="space-y-0.5">
                                    <div className="text-base font-black text-amber-400">5 Filii</div>
                                    <div className="text-[11px] text-neutral-400">Śląsk & Zagłębie</div>
                                </div>
                            </div>
                        </div>

                        {/* Right column: Featured Dish Showcase Card */}
                        <div className="lg:col-span-5 relative">
                            <div className="relative rounded-3xl overflow-hidden border border-neutral-800 bg-neutral-900/80 p-3 shadow-2xl group">
                                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden">
                                    <img
                                        src="https://images.unsplash.com/photo-1561651823-34feb02250e4?auto=format&fit=crop&w=1000&q=80"
                                        alt="Aladen Kebab"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

                                    <div className="absolute bottom-4 left-4 right-4 text-white">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="px-2.5 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-black uppercase">
                                                Polecamy
                                            </span>
                                            <span className="text-xs text-amber-300 font-bold">
                                                Rollo Kebab Klasyczny (Super 45cm)
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-300">
                                            Chrupiący lawasz, soczysta wołowina i autorski sos ostry Reaper.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Menu & Catalog Section */}
            <section id="menu-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search & Filter Header Bar */}
                <div className="space-y-4 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white">
                                Menu & Zamówienia Online
                            </h2>
                            <p className="text-xs text-neutral-400 mt-1">
                                {selectedBranch ? (
                                    <span>
                                        Zamawiasz z: <strong className="text-amber-400">{selectedBranch.name}</strong> ({selectedBranch.address}, {selectedBranch.city})
                                    </span>
                                ) : (
                                    'Wybierz filię, aby rozpocząć'
                                )}
                            </p>
                        </div>

                        {/* Search Input */}
                        <div className="relative w-full md:w-72">
                            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Szukaj w menu..."
                                className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                                >
                                    ✕
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                                filterSpicyOnly
                                    ? 'bg-red-600 border-red-500 text-white shadow-md shadow-red-600/30'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                        >
                            <Flame className="w-3.5 h-3.5" />
                            <span>Tylko Pikantne 🔥</span>
                        </button>

                        <button
                            onClick={() => setFilterVegeOnly(!filterVegeOnly)}
                            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                                filterVegeOnly
                                    ? 'bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-600/30'
                                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                            }`}
                        >
                            <Leaf className="w-3.5 h-3.5" />
                            <span>Tylko Wegetariańskie 🌱</span>
                        </button>
                    </div>

                    {/* Category Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none border-b border-neutral-800">
                        <button
                            onClick={() => setActiveCategorySlug('all')}
                            className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                                activeCategorySlug === 'all'
                                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                    : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                            }`}
                        >
                            Wszystkie ({categories.reduce((s, c) => s + (c.products?.length || 0), 0)})
                        </button>

                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategorySlug(cat.slug)}
                                className={`px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                                    activeCategorySlug === cat.slug
                                        ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                                        : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                                }`}
                            >
                                <span>{getLocalizedText(cat.name, currentLocale)}</span>
                                <span className="text-[10px] opacity-70">
                                    ({cat.products?.length || 0})
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Categories & Product Grids */}
                {filteredCategories.length === 0 ? (
                    <div className="py-20 text-center space-y-3">
                        <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mx-auto text-neutral-600">
                            <Utensils className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-white">Brak dań spełniających kryteria</h3>
                        <p className="text-xs text-neutral-400">Spróbuj zmienić słowo wyszukiwania lub filtry.</p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {filteredCategories.map((cat) => (
                            <div key={cat.id} className="space-y-4">
                                <div className="flex items-center justify-between pb-2 border-b border-neutral-800/80">
                                    <div>
                                        <h3 className="text-xl font-black text-white flex items-center gap-2">
                                            <span>{getLocalizedText(cat.name, currentLocale)}</span>
                                        </h3>
                                        {cat.description && (
                                            <p className="text-xs text-neutral-400 mt-0.5">
                                                {getLocalizedText(cat.description, currentLocale)}
                                            </p>
                                        )}
                                    </div>
                                    <span className="text-xs font-bold text-neutral-500">
                                        {(cat.filteredProducts || []).length} pozycji
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {(cat.filteredProducts || []).map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onSelect={(p) => setSelectedProduct(p)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Table Reservation & Location Promo Section */}
            <section className="bg-neutral-900/50 border-t border-neutral-800 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Table Booking Card */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-4 relative overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-white">Rezerwacja Stolika</h3>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                Planujesz spotkanie ze znajomymi lub uroczystość rodzinną? Zarezerwuj stolik online w dowolnej z naszych 5 filii. Potwierdzenie otrzymasz błyskawicznie!
                            </p>
                            <Link
                                href={route('reservations.create')}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs transition-colors shadow-lg shadow-amber-500/20"
                            >
                                <span>Przejdź do rezerwacji</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        {/* Direct Delivery Card */}
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 space-y-4 relative overflow-hidden">
                            <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-400 flex items-center justify-center">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-black text-white">Zasięg Naszych Kuchni</h3>
                            <p className="text-xs text-neutral-400 leading-relaxed">
                                Posiadamy 5 nowoczesnych kuchni (Będzin, Sosnowiec, Dąbrowa Górnicza, Katowice, Czeladź). Sprawdź najbliższą filię i ciesz się gorącym posiłkiem w kilkadziesiąt minut!
                            </p>
                            <button
                                onClick={() => setLocationModalOpen(true)}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs transition-colors"
                            >
                                <span>Wybierz lub wykryj filię</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customizer Drawer / Modal */}
            <ProductCustomizerModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </AppLayout>
    );
}
