import React, { PropsWithChildren } from 'react';
import { Link } from '@inertiajs/react';
import { Flame, ArrowLeft } from 'lucide-react';

interface GuestLayoutProps {
    subtitle?: string;
}

export default function Guest({ children, subtitle = 'Panel Pracownika & Administratora' }: PropsWithChildren<GuestLayoutProps>) {
    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-amber-500 selection:text-black">
            {/* Background glowing ambience */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-red-600/15 via-amber-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Back to store shortcut */}
            <div className="w-full max-w-md mb-4 flex justify-between items-center relative z-10">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white transition-all shadow-md group"
                >
                    <ArrowLeft className="w-4 h-4 text-amber-400 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Wróć do sklepu</span>
                </Link>

                <div className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                    Aladen POS & KDS
                </div>
            </div>

            {/* Main Auth Card */}
            <div className="w-full max-w-md bg-neutral-900/95 border border-neutral-800 shadow-2xl shadow-black/80 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative z-10 space-y-6">
                {/* Brand Header */}
                <div className="flex flex-col items-center text-center">
                    <Link href="/" className="flex flex-col items-center gap-3 group">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 via-orange-500 to-amber-500 flex items-center justify-center shadow-xl shadow-red-600/30 group-hover:scale-105 transition-all duration-300">
                            <Flame className="w-8 h-8 text-white fill-white" />
                        </div>
                        <div>
                            <span className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-1.5">
                                ALADEN <span className="text-amber-400">KEBAB</span>
                            </span>
                            <span className="block text-[11px] text-amber-400/90 font-bold tracking-widest uppercase mt-0.5">
                                {subtitle}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Content */}
                <div>
                    {children}
                </div>
            </div>

            {/* Bottom Copyright */}
            <div className="mt-8 text-center text-xs text-neutral-500 relative z-10">
                © {new Date().getFullYear()} Aladen Spicy Kebab. Wszelkie prawa zastrzeżone.
            </div>
        </div>
    );
}

