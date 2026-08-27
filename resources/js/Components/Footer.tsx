import React from 'react';
import { Flame, Phone, MapPin, Clock, ShieldCheck, Heart } from 'lucide-react';
import { Branch, PageProps } from '../types';
import { usePage } from '@inertiajs/react';
import { translations, Locale } from '../lib/i18n';

interface FooterProps {
    branches?: Branch[];
}

export const Footer: React.FC<FooterProps> = ({ branches = [] }) => {
    const { locale = 'pl' } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    return (
        <footer className="bg-neutral-950 border-t border-neutral-800 text-neutral-400 text-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand column */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center">
                                <Flame className="w-6 h-6 text-white fill-white" />
                            </div>
                            <span className="text-xl font-black tracking-tight text-white">
                                ALADEN <span className="text-amber-400">KEBAB</span>
                            </span>
                        </div>
                        <p className="text-xs leading-relaxed text-neutral-400">
                            {t.footerAbout}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-amber-400 font-semibold">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <span>{t.footerMeatQuality}</span>
                        </div>
                    </div>

                    {/* Branches list */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.ourBranches}</h4>
                        <div className="space-y-2 text-xs">
                            {branches.map((b) => (
                                <div key={b.id} className="p-2 rounded-lg bg-neutral-900/60 border border-neutral-800/80">
                                    <div className="font-semibold text-neutral-200">{b.name}</div>
                                    <div className="text-neutral-400 flex items-center gap-1 mt-0.5">
                                        <MapPin className="w-3 h-3 text-amber-400" />
                                        {b.address}, {b.city}
                                    </div>
                                    <div className="text-neutral-400 flex items-center gap-1 mt-0.5">
                                        <Phone className="w-3 h-3 text-amber-400" />
                                        {b.phone}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Opening hours & delivery */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.openingHoursDelivery}</h4>
                        <div className="space-y-2 text-xs">
                            <div className="flex justify-between py-1 border-b border-neutral-800">
                                <span>{t.monThu}</span>
                                <span className="text-neutral-200 font-medium">10:00 - 23:00</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-neutral-800">
                                <span>{t.friday}</span>
                                <span className="text-amber-400 font-medium">10:00 - 01:00</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-neutral-800">
                                <span>{t.saturday}</span>
                                <span className="text-amber-400 font-medium">11:00 - 02:00</span>
                            </div>
                            <div className="flex justify-between py-1 border-b border-neutral-800">
                                <span>{t.sunday}</span>
                                <span className="text-neutral-200 font-medium">11:00 - 23:00</span>
                            </div>
                        </div>
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-300">
                            {t.footerDeliveryNotice}
                        </div>
                    </div>

                    {/* Quick links & info */}
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t.paymentsInfo}</h4>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            {t.paymentsDesc}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-2">
                            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-bold text-neutral-300">
                                BLIK
                            </span>
                            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-bold text-neutral-300">
                                Visa / Mastercard
                            </span>
                            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-bold text-neutral-300">
                                Apple Pay
                            </span>
                            <span className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-[11px] font-bold text-neutral-300">
                                {t.cashPayment}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
                    <div>
                        © {new Date().getFullYear()} {t.brandName}. {t.allRightsReserved}
                    </div>
                    <div className="flex items-center gap-1 text-neutral-400">
                        <span>{t.madeWith}</span>
                        <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                        <span>{t.forSpicyLovers}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
