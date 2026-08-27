import React, { PropsWithChildren, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    Flame, 
    LayoutDashboard, 
    UtensilsCrossed, 
    ShoppingBag, 
    Calendar, 
    Store, 
    BookOpen, 
    ArrowLeft, 
    LogOut, 
    Menu, 
    X,
    Bell,
    Shield,
    MapPin
} from 'lucide-react';
import { PageProps } from '../types';

interface AdminLayoutProps {
    title?: string;
}

export const AdminLayout: React.FC<PropsWithChildren<AdminLayoutProps>> = ({ children, title = 'Panel Administracyjny' }) => {
    const { auth } = usePage<PageProps>().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const user = auth.user;

    const navItems = [
        {
            name: 'Pulpit / Analityka',
            href: route('admin.dashboard'),
            active: route().current('admin.dashboard'),
            icon: LayoutDashboard,
        },
        {
            name: 'System Kuchni (KDS)',
            href: route('admin.kds.index'),
            active: route().current('admin.kds.*'),
            icon: UtensilsCrossed,
            badge: 'Live',
        },
        {
            name: 'Zamówienia & POS',
            href: route('admin.orders.index'),
            active: route().current('admin.orders.*'),
            icon: ShoppingBag,
        },
        {
            name: 'Rezerwacje Stolików',
            href: route('admin.reservations.index'),
            active: route().current('admin.reservations.*'),
            icon: Calendar,
        },
        {
            name: 'Magazyn Filii & Stany',
            href: route('admin.branches.stock'),
            active: route().current('admin.branches.*'),
            icon: Store,
        },
        {
            name: 'Zarządzanie Menu',
            href: route('admin.menu.index'),
            active: route().current('admin.menu.*'),
            icon: BookOpen,
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex font-sans selection:bg-amber-500 selection:text-black">
            {/* Mobile Sidebar Backdrop */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm lg:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-neutral-900 border-r border-neutral-800 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div>
                    {/* Brand Header */}
                    <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-red-600/30">
                                <Flame className="w-6 h-6 text-white fill-white" />
                            </div>
                            <div>
                                <div className="text-base font-black text-white">ALADEN POS & KDS</div>
                                <div className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider">
                                    {user?.is_super_admin ? 'Master Admin' : user?.branch ? user.branch.name : 'Branch Staff'}
                                </div>
                            </div>
                        </Link>

                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white lg:hidden"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="p-4 space-y-1.5">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                                        item.active
                                            ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-600/20'
                                            : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-4 h-4" />
                                        <span>{item.name}</span>
                                    </div>
                                    {item.badge && (
                                        <span className="px-1.5 py-0.5 rounded-md bg-emerald-500 text-black text-[9px] font-black uppercase tracking-wider animate-pulse">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom User Area & Logout */}
                <div className="p-4 border-t border-neutral-800 space-y-3">
                    <Link
                        href="/"
                        className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-amber-400" />
                        <span>Wróć do sklepu klienta</span>
                    </Link>

                    <div className="flex items-center justify-between p-3 rounded-2xl bg-neutral-950 border border-neutral-800/80">
                        <div className="min-w-0 flex-1 pr-2">
                            <div className="text-xs font-bold text-white truncate">{user?.name}</div>
                            <div className="text-[10px] text-neutral-400 truncate">{user?.email}</div>
                        </div>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="p-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                            title="Wyloguj"
                        >
                            <LogOut className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Area */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-72">
                {/* Admin Top Header */}
                <header className="sticky top-0 z-30 h-16 bg-neutral-900/90 backdrop-blur-md border-b border-neutral-800 px-4 sm:px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white lg:hidden"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-base sm:text-lg font-black text-white">{title}</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-800 border border-neutral-700 text-xs text-neutral-300 font-semibold">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>{user?.branch ? user.branch.name : 'Wszystkie Filie'}</span>
                        </div>

                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="System Live Reverb / Active" />
                    </div>
                </header>

                {/* Page Content Container */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
