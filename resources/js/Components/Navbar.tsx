import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { 
    Flame, 
    MapPin, 
    ShoppingBag, 
    Calendar, 
    User as UserIcon, 
    ChevronDown, 
    Clock, 
    Sparkles, 
    ShieldCheck, 
    Menu as MenuIcon, 
    X,
    LayoutDashboard,
    UtensilsCrossed,
    Globe
} from 'lucide-react';
import { PageProps, Branch } from '../types';
import { useCartStore } from '../stores/cartStore';
import { useLocationStore } from '../stores/locationStore';
import { translations, Locale, formatPrice } from '../lib/i18n';

interface NavbarProps {
    branches: Branch[];
    selectedBranch: Branch | null;
}

export const Navbar: React.FC<NavbarProps> = ({ branches, selectedBranch }) => {
    const { auth, locale = 'pl' } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    const { getItemCount, getTotal, setCartOpen, orderType, setOrderType } = useCartStore();
    const { setLocationModalOpen } = useLocationStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

    const itemCount = getItemCount();
    const totalAmount = getTotal();

    const switchLocale = (newLocale: string) => {
        router.post(`/locale/${newLocale}`, {}, { preserveScroll: true });
    };

    const handleSelectBranch = (branch: Branch) => {
        setBranchDropdownOpen(false);
        router.post(`/branches/${branch.id}/select`, {}, { preserveScroll: true });
    };

    return (
        <header className="sticky top-0 z-40 bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800 text-white shadow-xl">
            {/* Top Bar for announcement / quick switch */}
            <div className="bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs font-semibold py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
                <Flame className="w-3.5 h-3.5 animate-bounce text-yellow-300" />
                <span>{t.topAnnouncement}</span>
                <span className="hidden md:inline-block bg-black/20 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                    {t.freeDeliveryFromBanner}
                </span>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-18 py-2">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-6">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30 group-hover:scale-105 transition-transform">
                                <Flame className="w-6 h-6 text-white fill-white" />
                            </div>
                            <div>
                                <span className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                                    ALADEN <span className="text-amber-400">KEBAB</span>
                                </span>
                                <span className="hidden sm:block text-[10px] text-neutral-400 font-medium tracking-wider uppercase">
                                    {t.taglineSub}
                                </span>
                            </div>
                        </Link>

                        {/* Branch Selector Pill */}
                        <div className="relative hidden lg:block">
                            <button
                                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                                className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/60 text-sm font-medium text-neutral-200 hover:text-white transition-all shadow-inner"
                            >
                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <MapPin className="w-4 h-4 text-amber-400" />
                                <span className="max-w-[160px] truncate font-semibold">
                                    {selectedBranch ? selectedBranch.name.replace('Aladen Spicy Kebab - ', '') : t.selectBranch}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${branchDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Branch Dropdown */}
                            {branchDropdownOpen && (
                                <div className="absolute left-0 mt-2 w-80 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                                    <div className="p-2 border-b border-neutral-800 mb-1 flex items-center justify-between">
                                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                            {t.chooseBranchTitle}
                                        </span>
                                        <button
                                            onClick={() => {
                                                setBranchDropdownOpen(false);
                                                setLocationModalOpen(true);
                                            }}
                                            className="text-xs text-amber-400 hover:text-amber-300 font-medium underline"
                                        >
                                            {t.detectGps}
                                        </button>
                                    </div>
                                    <div className="space-y-1 max-h-64 overflow-y-auto">
                                        {branches.map((b) => (
                                            <button
                                                key={b.id}
                                                onClick={() => handleSelectBranch(b)}
                                                className={`w-full text-left px-3 py-2.5 rounded-xl flex items-start gap-3 transition-colors ${
                                                    selectedBranch?.id === b.id
                                                        ? 'bg-amber-500/15 border border-amber-500/40 text-white'
                                                        : 'hover:bg-neutral-800 text-neutral-300'
                                                }`}
                                            >
                                                <MapPin className={`w-4 h-4 mt-0.5 shrink-0 ${selectedBranch?.id === b.id ? 'text-amber-400' : 'text-neutral-500'}`} />
                                                <div className="min-w-0 flex-1">
                                                    <div className="text-sm font-semibold truncate">{b.name}</div>
                                                    <div className="text-xs text-neutral-400">{b.address}, {b.city}</div>
                                                    <div className="text-[10px] text-amber-400/90 mt-0.5 font-medium">
                                                        {t.minDelivery.replace('{amount}', String(b.min_order_amount))} • {t.estTime.replace('{time}', String(b.estimated_delivery_time_minutes))}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Center: Order Type Toggle Buttons */}
                    <div className="hidden md:flex items-center bg-neutral-950 p-1 rounded-xl border border-neutral-800">
                        <button
                            onClick={() => setOrderType('delivery')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                orderType === 'delivery'
                                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                    : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                        >
                            🛵 {t.delivery}
                        </button>
                        <button
                            onClick={() => setOrderType('collection')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                orderType === 'collection'
                                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                    : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                        >
                            🛍️ {t.collection}
                        </button>
                        <button
                            onClick={() => setOrderType('dine_in')}
                            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                orderType === 'dine_in'
                                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                    : 'text-neutral-400 hover:text-neutral-200'
                            }`}
                        >
                            🍽️ {t.dineIn}
                        </button>
                    </div>

                    {/* Right side navigation and actions */}
                    <div className="flex items-center gap-3">
                        {/* Table Reservation Link */}
                        <Link
                            href={route('reservations.create')}
                            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-amber-400 transition-all"
                        >
                            <Calendar className="w-4 h-4 text-amber-400" />
                            <span>{t.bookTable}</span>
                        </Link>

                        {/* Language Switcher */}
                        <div className="flex items-center bg-neutral-800/70 rounded-lg p-0.5 border border-neutral-700 text-[11px] font-bold">
                            <button
                                onClick={() => switchLocale('pl')}
                                className={`px-2 py-1 rounded transition-colors ${currentLocale === 'pl' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                            >
                                PL
                            </button>
                            <button
                                onClick={() => switchLocale('en')}
                                className={`px-2 py-1 rounded transition-colors ${currentLocale === 'en' ? 'bg-amber-500 text-black' : 'text-neutral-400 hover:text-white'}`}
                            >
                                EN
                            </button>
                        </div>

                        {/* User Account / Auth Dropdown */}
                        {auth.user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white">
                                    <div className="w-6 h-6 rounded-full bg-red-600/30 border border-red-500/50 flex items-center justify-center text-red-400 font-bold text-[10px]">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                    <span className="hidden sm:inline-block max-w-[100px] truncate">{auth.user.name}</span>
                                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
                                </button>
                                
                                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl p-2 hidden group-hover:block hover:block z-50">
                                    <div className="p-2 border-b border-neutral-800 mb-1">
                                        <div className="text-xs font-bold text-white truncate">{auth.user.name}</div>
                                        <div className="text-[10px] text-neutral-400 truncate">{auth.user.email}</div>
                                    </div>

                                    {auth.user.is_staff && (
                                        <>
                                            <Link
                                                href={route('admin.dashboard')}
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-amber-400 hover:bg-amber-500/10 transition-colors"
                                            >
                                                <LayoutDashboard className="w-4 h-4" />
                                                <span>{t.adminPanel}</span>
                                            </Link>
                                            <Link
                                                href={route('admin.kds.index')}
                                                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                                            >
                                                <UtensilsCrossed className="w-4 h-4" />
                                                <span>{t.kdsKitchen}</span>
                                            </Link>
                                            <div className="my-1 border-t border-neutral-800" />
                                        </>
                                    )}

                                    <Link
                                        href={route('orders.my')}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 transition-colors"
                                    >
                                        <ShoppingBag className="w-4 h-4 text-neutral-400" />
                                        <span>{t.myOrders}</span>
                                    </Link>
                                    <Link
                                        href={route('reservations.my')}
                                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-neutral-300 hover:bg-neutral-800 transition-colors"
                                    >
                                        <Calendar className="w-4 h-4 text-neutral-400" />
                                        <span>{t.myReservations}</span>
                                    </Link>
                                    <Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                        className="w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                                    >
                                        <span>{t.logout}</span>
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <Link
                                href={route('login')}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-xs font-semibold text-neutral-200 hover:text-white transition-colors"
                            >
                                <UserIcon className="w-4 h-4 text-amber-400" />
                                <span>{t.login}</span>
                            </Link>
                        )}

                        {/* Cart Trigger Button */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative flex items-center gap-2.5 px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-bold text-sm shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span className="hidden sm:inline font-bold">
                                {totalAmount > 0 ? formatPrice(totalAmount) : t.cart}
                            </span>
                            {itemCount > 0 && (
                                <span className="w-5 h-5 rounded-full bg-white text-red-600 text-xs font-extrabold flex items-center justify-center shadow-md animate-pulse">
                                    {itemCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Menu Hamburger */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden py-4 border-t border-neutral-800 space-y-3 animate-in fade-in">
                        {/* Mobile Branch Selector */}
                        <div className="bg-neutral-800/80 p-3 rounded-xl">
                            <div className="text-xs text-neutral-400 font-semibold mb-1">{t.selectBranch}:</div>
                            <button
                                onClick={() => {
                                    setMobileMenuOpen(false);
                                    setLocationModalOpen(true);
                                }}
                                className="w-full flex items-center justify-between text-sm font-bold text-amber-400"
                            >
                                <span className="flex items-center gap-2 truncate">
                                    <MapPin className="w-4 h-4" />
                                    {selectedBranch ? selectedBranch.name : t.selectBranch}
                                </span>
                                <span className="text-xs underline text-neutral-300">{t.changeBranch}</span>
                            </button>
                        </div>

                        {/* Mobile Order Type Toggle */}
                        <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1 rounded-xl">
                            <button
                                onClick={() => setOrderType('delivery')}
                                className={`py-2 rounded-lg text-xs font-bold ${orderType === 'delivery' ? 'bg-red-600 text-white' : 'text-neutral-400'}`}
                            >
                                🛵 {t.delivery}
                            </button>
                            <button
                                onClick={() => setOrderType('collection')}
                                className={`py-2 rounded-lg text-xs font-bold ${orderType === 'collection' ? 'bg-red-600 text-white' : 'text-neutral-400'}`}
                            >
                                🛍️ {t.collection}
                            </button>
                            <button
                                onClick={() => setOrderType('dine_in')}
                                className={`py-2 rounded-lg text-xs font-bold ${orderType === 'dine_in' ? 'bg-red-600 text-white' : 'text-neutral-400'}`}
                            >
                                🍽️ {t.dineIn}
                            </button>
                        </div>

                        <div className="flex flex-col gap-2 pt-2">
                            <Link
                                href={route('reservations.create')}
                                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-800 text-sm font-semibold text-neutral-200"
                            >
                                <Calendar className="w-4 h-4 text-amber-400" />
                                <span>{t.bookTable}</span>
                            </Link>

                            {auth.user?.is_staff && (
                                <Link
                                    href={route('admin.dashboard')}
                                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/20 text-amber-300 text-sm font-semibold"
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    <span>{t.adminPanel}</span>
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
