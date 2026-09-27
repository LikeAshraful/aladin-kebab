import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import { AdminLayout } from '../../../Layouts/AdminLayout';
import { PageProps } from '../../../types';
import { translations, Locale } from '../../../lib/i18n';
import {
    Globe,
    UtensilsCrossed,
    Truck,
    Printer,
    Bell,
    Shield,
    Save,
    CheckCircle2,
    AlertCircle,
    Info,
    Store,
    Clock,
    Percent,
    Flame,
    Receipt,
    Sparkles,
    Volume2
} from 'lucide-react';

interface SettingItem {
    id: number;
    key: string;
    value: any;
    type: string;
    description?: string;
}

interface SettingsIndexProps extends PageProps {
    settings: Record<string, Record<string, SettingItem>>;
    timezones: Record<string, string>;
    availableLocales: Record<string, string>;
}

export default function SettingsIndex({
    settings,
    timezones,
    availableLocales,
    locale = 'pl',
}: SettingsIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    const [activeTab, setActiveTab] = useState<'general' | 'ordering' | 'delivery' | 'receipt' | 'notifications'>('general');
    const [saving, setSaving] = useState(false);

    // Form states initialized from backend settings
    const [generalForm, setGeneralForm] = useState({
        app_name: settings.general?.app_name?.value ?? 'Aladen Spicy Kebab',
        app_tagline: settings.general?.app_tagline?.value ?? 'Autentyczny Kebab i Dania z Grilla',
        app_default_locale: settings.general?.app_default_locale?.value ?? 'pl',
        contact_email: settings.general?.contact_email?.value ?? 'kontakt@aladenkebab.pl',
        contact_phone: settings.general?.contact_phone?.value ?? '+48 32 765 43 21',
        currency_symbol: settings.general?.currency_symbol?.value ?? 'zł',
        currency_code: settings.general?.currency_code?.value ?? 'PLN',
        timezone: settings.general?.timezone?.value ?? 'Europe/Warsaw',
    });

    const [orderingForm, setOrderingForm] = useState({
        enable_online_ordering: settings.ordering?.enable_online_ordering?.value ?? true,
        enable_table_reservations: settings.ordering?.enable_table_reservations?.value ?? true,
        default_prep_time_minutes: settings.ordering?.default_prep_time_minutes?.value ?? 20,
        tax_rate_percent: settings.ordering?.tax_rate_percent?.value ?? 8.0,
        auto_confirm_orders: settings.ordering?.auto_confirm_orders?.value ?? false,
    });

    const [deliveryForm, setDeliveryForm] = useState({
        min_order_amount: settings.delivery?.min_order_amount?.value ?? 35.0,
        free_delivery_threshold: settings.delivery?.free_delivery_threshold?.value ?? 75.0,
        base_delivery_fee: settings.delivery?.base_delivery_fee?.value ?? 6.0,
        max_delivery_radius_km: settings.delivery?.max_delivery_radius_km?.value ?? 12.0,
    });

    const [receiptForm, setReceiptForm] = useState({
        receipt_header: settings.receipt?.receipt_header?.value ?? 'ALADEN SPICY KEBAB - KEBAB & GRILL',
        receipt_footer: settings.receipt?.receipt_footer?.value ?? "Dziękujemy za zamówienie!\nSmacznego i zapraszamy ponownie.",
    });

    const [notificationsForm, setNotificationsForm] = useState({
        kds_sound_enabled: settings.notifications?.kds_sound_enabled?.value ?? true,
        kds_refresh_interval_seconds: settings.notifications?.kds_refresh_interval_seconds?.value ?? 15,
        alert_email: settings.notifications?.alert_email?.value ?? 'admin@aladenkebab.pl',
    });

    const handleSubmit = (group: 'general' | 'ordering' | 'delivery' | 'receipt' | 'notifications') => {
        setSaving(true);
        let payload: any = { group };

        if (group === 'general') payload = { ...payload, ...generalForm };
        if (group === 'ordering') payload = { ...payload, ...orderingForm };
        if (group === 'delivery') payload = { ...payload, ...deliveryForm };
        if (group === 'receipt') payload = { ...payload, ...receiptForm };
        if (group === 'notifications') payload = { ...payload, ...notificationsForm };

        router.patch(route('admin.settings.update'), payload, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    };

    const tabs = [
        { id: 'general', name: t.tabGeneral, icon: Globe },
        { id: 'ordering', name: t.tabOrdering, icon: UtensilsCrossed },
        { id: 'delivery', name: t.tabDelivery, icon: Truck },
        { id: 'receipt', name: t.tabReceipt, icon: Printer },
        { id: 'notifications', name: t.tabNotifications, icon: Bell },
    ] as const;

    return (
        <AdminLayout title={t.settingsTitle}>
            <Head title={`${t.settingsTitle} — Aladen Kebab`} />

            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 border border-neutral-800 p-6 sm:p-8 shadow-2xl">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                                    <Shield className="w-3.5 h-3.5" />
                                    {t.superAdminOnlyBadge}
                                </span>
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-red-600/10 border border-red-500/30 text-red-400 text-xs font-bold">
                                    <Flame className="w-3.5 h-3.5" />
                                    Aladen HQ Core
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                                {t.settingsTitle}
                            </h2>
                            <p className="text-sm text-neutral-400 mt-1 max-w-2xl">
                                {t.settingsSubtitle}
                            </p>
                        </div>

                        {/* Top Quick Action */}
                        <button
                            onClick={() => handleSubmit(activeTab)}
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white text-sm font-bold shadow-lg shadow-red-600/25 transition-all disabled:opacity-50"
                        >
                            <Save className="w-4 h-4" />
                            <span>{saving ? t.saving : t.saveSettings}</span>
                        </button>
                    </div>

                    <div className="absolute right-0 top-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
                        <CheckCircle2 className="w-5 h-5 shrink-0" />
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-neutral-800">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                                    isActive
                                        ? 'bg-neutral-800 text-amber-400 border border-amber-500/40 shadow-lg shadow-black/40'
                                        : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900 border border-transparent'
                                }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-neutral-500'}`} />
                                <span>{tab.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab 1: General & Localization */}
                {activeTab === 'general' && (
                    <div className="space-y-6">
                        {/* Language Switch Notice Card */}
                        <div className="p-5 rounded-3xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-4">
                            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <h4 className="text-sm font-bold text-amber-400">{t.languageSwitchHeader}</h4>
                                <p className="text-xs text-neutral-300 leading-relaxed">
                                    {t.languageSwitchNotice}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* App Name */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.appNameLabel}
                                </label>
                                <input
                                    type="text"
                                    value={generalForm.app_name}
                                    onChange={(e) => setGeneralForm({ ...generalForm, app_name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                />
                            </div>

                            {/* App Tagline */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.appTaglineLabel}
                                </label>
                                <input
                                    type="text"
                                    value={generalForm.app_tagline}
                                    onChange={(e) => setGeneralForm({ ...generalForm, app_tagline: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                />
                            </div>

                            {/* System Default Language */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-3">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.appDefaultLocaleLabel}
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {Object.entries(availableLocales).map(([code, name]) => {
                                        const isSelected = generalForm.app_default_locale === code;
                                        return (
                                            <button
                                                type="button"
                                                key={code}
                                                onClick={() => setGeneralForm({ ...generalForm, app_default_locale: code })}
                                                className={`p-3 rounded-2xl border text-left transition-all ${
                                                    isSelected
                                                        ? 'bg-amber-500/15 border-amber-500 text-white'
                                                        : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                                                }`}
                                            >
                                                <div className="text-xs font-black uppercase text-amber-400">{code}</div>
                                                <div className="text-sm font-bold text-white mt-0.5">{name}</div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Timezone */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.timezoneLabel}
                                </label>
                                <select
                                    value={generalForm.timezone}
                                    onChange={(e) => setGeneralForm({ ...generalForm, timezone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                >
                                    {Object.entries(timezones).map(([tz, label]) => (
                                        <option key={tz} value={tz}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Contact Email */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.contactEmailLabel}
                                </label>
                                <input
                                    type="email"
                                    value={generalForm.contact_email}
                                    onChange={(e) => setGeneralForm({ ...generalForm, contact_email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                />
                            </div>

                            {/* Contact Phone */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.contactPhoneLabel}
                                </label>
                                <input
                                    type="text"
                                    value={generalForm.contact_phone}
                                    onChange={(e) => setGeneralForm({ ...generalForm, contact_phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-colors"
                                />
                            </div>

                            {/* Currency Symbol & Code */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2 md:col-span-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                                            {t.currencySymbolLabel}
                                        </label>
                                        <input
                                            type="text"
                                            value={generalForm.currency_symbol}
                                            onChange={(e) => setGeneralForm({ ...generalForm, currency_symbol: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                                            {t.currencyCodeLabel}
                                        </label>
                                        <input
                                            type="text"
                                            value={generalForm.currency_code}
                                            onChange={(e) => setGeneralForm({ ...generalForm, currency_code: e.target.value })}
                                            className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Ordering & Kitchen */}
                {activeTab === 'ordering' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6">
                            {/* Online Ordering Master Toggle */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2.5">
                                        <h4 className="text-base font-bold text-white">{t.enableOnlineOrderingLabel}</h4>
                                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            orderingForm.enable_online_ordering
                                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                        }`}>
                                            {orderingForm.enable_online_ordering ? 'ONLINE / AKTYWNE' : 'PAUSED / WSTRZYMANE'}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-400 max-w-2xl">
                                        {t.enableOnlineOrderingDesc}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOrderingForm({ ...orderingForm, enable_online_ordering: !orderingForm.enable_online_ordering })}
                                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        orderingForm.enable_online_ordering ? 'bg-emerald-500' : 'bg-neutral-700'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                            orderingForm.enable_online_ordering ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Table Reservations Toggle */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-white">{t.enableTableReservationsLabel}</h4>
                                    <p className="text-xs text-neutral-400 max-w-2xl">
                                        {t.enableTableReservationsDesc}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOrderingForm({ ...orderingForm, enable_table_reservations: !orderingForm.enable_table_reservations })}
                                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        orderingForm.enable_table_reservations ? 'bg-amber-500' : 'bg-neutral-700'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                            orderingForm.enable_table_reservations ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            {/* Auto-Confirm Orders */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h4 className="text-base font-bold text-white">{t.autoConfirmOrdersLabel}</h4>
                                    <p className="text-xs text-neutral-400 max-w-2xl">
                                        {t.autoConfirmOrdersDesc}
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setOrderingForm({ ...orderingForm, auto_confirm_orders: !orderingForm.auto_confirm_orders })}
                                    className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                        orderingForm.auto_confirm_orders ? 'bg-amber-500' : 'bg-neutral-700'
                                    }`}
                                >
                                    <span
                                        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                            orderingForm.auto_confirm_orders ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                    />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {/* Default Prep Time */}
                                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                        {t.defaultPrepTimeLabel}
                                    </label>
                                    <p className="text-[11px] text-neutral-400">{t.defaultPrepTimeDesc}</p>
                                    <div className="relative mt-2">
                                        <input
                                            type="number"
                                            min="1"
                                            max="180"
                                            value={orderingForm.default_prep_time_minutes}
                                            onChange={(e) => setOrderingForm({ ...orderingForm, default_prep_time_minutes: parseInt(e.target.value) || 20 })}
                                            className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                        />
                                        <span className="absolute right-4 top-3 text-xs text-neutral-400 font-bold">min</span>
                                    </div>
                                </div>

                                {/* VAT Tax Rate */}
                                <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                    <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                        {t.taxRateLabel}
                                    </label>
                                    <p className="text-[11px] text-neutral-400">{t.taxRateDesc}</p>
                                    <div className="relative mt-2">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="100"
                                            value={orderingForm.tax_rate_percent}
                                            onChange={(e) => setOrderingForm({ ...orderingForm, tax_rate_percent: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                        />
                                        <span className="absolute right-4 top-3 text-xs text-neutral-400 font-bold">%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 3: Delivery & Pricing */}
                {activeTab === 'delivery' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {/* Minimum Order Amount */}
                        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                {t.minOrderAmountLabel}
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                min="0"
                                value={deliveryForm.min_order_amount}
                                onChange={(e) => setDeliveryForm({ ...deliveryForm, min_order_amount: parseFloat(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                        </div>

                        {/* Free Delivery Threshold */}
                        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                {t.freeDeliveryThresholdLabel}
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                min="0"
                                value={deliveryForm.free_delivery_threshold}
                                onChange={(e) => setDeliveryForm({ ...deliveryForm, free_delivery_threshold: parseFloat(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                        </div>

                        {/* Base Delivery Fee */}
                        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                {t.baseDeliveryFeeLabel}
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                min="0"
                                value={deliveryForm.base_delivery_fee}
                                onChange={(e) => setDeliveryForm({ ...deliveryForm, base_delivery_fee: parseFloat(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                        </div>

                        {/* Max Delivery Radius */}
                        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                            <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                {t.maxDeliveryRadiusLabel}
                            </label>
                            <input
                                type="number"
                                step="0.5"
                                min="0.5"
                                max="100"
                                value={deliveryForm.max_delivery_radius_km}
                                onChange={(e) => setDeliveryForm({ ...deliveryForm, max_delivery_radius_km: parseFloat(e.target.value) || 0 })}
                                className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                            />
                        </div>
                    </div>
                )}

                {/* Tab 4: Receipt & POS Printer */}
                {activeTab === 'receipt' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <div className="lg:col-span-7 space-y-6">
                            {/* Receipt Header Text */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.receiptHeaderLabel}
                                </label>
                                <p className="text-[11px] text-neutral-400">{t.receiptHeaderDesc}</p>
                                <textarea
                                    rows={3}
                                    value={receiptForm.receipt_header}
                                    onChange={(e) => setReceiptForm({ ...receiptForm, receipt_header: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none font-mono"
                                />
                            </div>

                            {/* Receipt Footer Text */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.receiptFooterLabel}
                                </label>
                                <p className="text-[11px] text-neutral-400">{t.receiptFooterDesc}</p>
                                <textarea
                                    rows={3}
                                    value={receiptForm.receipt_footer}
                                    onChange={(e) => setReceiptForm({ ...receiptForm, receipt_footer: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none font-mono"
                                />
                            </div>
                        </div>

                        {/* Live Thermal Receipt Simulator */}
                        <div className="lg:col-span-5">
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-4">
                                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                                    <Receipt className="w-4 h-4" />
                                    <span>Podgląd Wydruku POS (80mm)</span>
                                </div>

                                <div className="p-5 rounded-2xl bg-white text-black font-mono text-xs shadow-inner border border-neutral-300 space-y-3">
                                    <div className="text-center font-bold whitespace-pre-line border-b border-dashed border-black pb-2">
                                        {receiptForm.receipt_header || 'ALADEN SPICY KEBAB'}
                                    </div>
                                    <div className="text-[10px] space-y-0.5">
                                        <div>NR: #ASK-2026-0891</div>
                                        <div>DATA: 2026-09-27 19:45</div>
                                        <div>TYP: DOSTAWA (DELIVERY)</div>
                                    </div>
                                    <div className="border-t border-b border-dashed border-black py-2 space-y-1 text-[11px]">
                                        <div className="flex justify-between">
                                            <span>1x Rollo Kebab Mega</span>
                                            <span className="font-bold">31.00 zł</span>
                                        </div>
                                        <div className="text-[9px] text-neutral-600 pl-2">
                                            + Wołowina, Reaper 🔥, Jalapeño
                                        </div>
                                        <div className="flex justify-between">
                                            <span>1x Ayran Turecki</span>
                                            <span className="font-bold">6.00 zł</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between font-bold text-xs pt-1">
                                        <span>SUMA CAŁKOWITA:</span>
                                        <span>37.00 zł</span>
                                    </div>
                                    <div className="text-center text-[10px] pt-2 border-t border-dashed border-black whitespace-pre-line text-neutral-800">
                                        {receiptForm.receipt_footer || 'Dziękujemy! Smacznego!'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 5: Notifications & KDS */}
                {activeTab === 'notifications' && (
                    <div className="space-y-6">
                        {/* KDS Audio Chime Alert */}
                        <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <Volume2 className="w-4 h-4 text-amber-400" />
                                    <h4 className="text-base font-bold text-white">{t.kdsSoundLabel}</h4>
                                </div>
                                <p className="text-xs text-neutral-400 max-w-2xl">
                                    {t.kdsSoundDesc}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setNotificationsForm({ ...notificationsForm, kds_sound_enabled: !notificationsForm.kds_sound_enabled })}
                                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                    notificationsForm.kds_sound_enabled ? 'bg-amber-500' : 'bg-neutral-700'
                                }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                        notificationsForm.kds_sound_enabled ? 'translate-x-6' : 'translate-x-0'
                                    }`}
                                />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/* KDS Refresh Interval */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.kdsRefreshIntervalLabel}
                                </label>
                                <p className="text-[11px] text-neutral-400">{t.kdsRefreshIntervalDesc}</p>
                                <div className="relative mt-2">
                                    <input
                                        type="number"
                                        min="5"
                                        max="120"
                                        value={notificationsForm.kds_refresh_interval_seconds}
                                        onChange={(e) => setNotificationsForm({ ...notificationsForm, kds_refresh_interval_seconds: parseInt(e.target.value) || 15 })}
                                        className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                    />
                                    <span className="absolute right-4 top-3 text-xs text-neutral-400 font-bold">sek</span>
                                </div>
                            </div>

                            {/* Alert Email */}
                            <div className="p-6 rounded-3xl bg-neutral-900 border border-neutral-800 space-y-2">
                                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                                    {t.alertEmailLabel}
                                </label>
                                <p className="text-[11px] text-neutral-400">{t.alertEmailDesc}</p>
                                <input
                                    type="email"
                                    value={notificationsForm.alert_email}
                                    onChange={(e) => setNotificationsForm({ ...notificationsForm, alert_email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-2xl bg-neutral-950 border border-neutral-800 text-white text-sm focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Bottom Save Action Bar */}
                <div className="p-6 rounded-3xl bg-neutral-900/80 backdrop-blur-md border border-neutral-800 flex items-center justify-between">
                    <span className="text-xs text-neutral-400">
                        {t.superAdminOnlyBadge} • Aladen Spicy Kebab Core Engine
                    </span>

                    <button
                        onClick={() => handleSubmit(activeTab)}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white text-sm font-bold shadow-lg shadow-red-600/25 transition-all disabled:opacity-50"
                    >
                        <Save className="w-4 h-4" />
                        <span>{saving ? t.saving : t.saveSettings}</span>
                    </button>
                </div>
            </div>
        </AdminLayout>
    );
}
