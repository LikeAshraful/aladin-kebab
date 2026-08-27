import React, { useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { 
    X, 
    ShoppingBag, 
    Trash2, 
    Plus, 
    Minus, 
    ArrowRight, 
    MapPin, 
    Phone, 
    User, 
    CreditCard, 
    Sparkles, 
    AlertCircle, 
    ShieldCheck,
    CheckCircle2,
    Lock
} from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { formatPrice, getLocalizedText, Locale, translations } from '../lib/i18n';
import { PageProps, Branch } from '../types';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
    branches: Branch[];
    selectedBranch: Branch | null;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ branches, selectedBranch }) => {
    const { locale = 'pl' } = usePage<PageProps>().props;
    const currentLocale = (locale as Locale) || 'pl';
    const t = translations[currentLocale] || translations.pl;

    const {
        items,
        isCartOpen,
        setCartOpen,
        updateQuantity,
        removeItem,
        clearCart,
        orderType,
        setOrderType,
        deliveryAddress,
        setDeliveryAddress,
        customerInfo,
        setCustomerInfo,
        tableNumber,
        setTableNumber,
        customerNotes,
        setCustomerNotes,
        paymentMethod,
        setPaymentMethod,
        getSubtotal,
        getDeliveryFee,
        getTotal,
        getItemCount,
    } = useCartStore();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isBlikModalOpen, setIsBlikModalOpen] = useState(false);
    const [blikCode, setBlikCode] = useState('');
    const [blikStatus, setBlikStatus] = useState<'idle' | 'waiting' | 'confirmed'>('idle');

    if (!isCartOpen) return null;

    const subtotal = getSubtotal();
    const deliveryFee = getDeliveryFee();
    const total = getTotal();
    const itemCount = getItemCount();

    // Check minimum order amount for delivery
    const minOrderAmount = selectedBranch?.min_order_amount || 35.0;
    const isUnderMinOrder = orderType === 'delivery' && subtotal < minOrderAmount;
    const minOrderDiff = Math.max(0, minOrderAmount - subtotal);

    // Free delivery progress threshold
    const freeDeliveryThreshold = selectedBranch?.free_delivery_threshold || 75.0;
    const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
    const freeDeliveryDiff = Math.max(0, freeDeliveryThreshold - subtotal);

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!customerInfo.name.trim()) {
            errors.name = t.errorName;
        }
        if (!customerInfo.phone.trim() || customerInfo.phone.length < 8) {
            errors.phone = t.errorPhone;
        }

        if (orderType === 'delivery') {
            if (!deliveryAddress.street.trim()) {
                errors.street = t.errorStreet;
            }
            if (!deliveryAddress.building_number.trim()) {
                errors.building = t.errorBuilding;
            }
            if (!deliveryAddress.city.trim()) {
                errors.city = t.errorCity;
            }
            if (isUnderMinOrder) {
                errors.minOrder = t.errorMinOrder.replace('{amount}', minOrderAmount.toFixed(2));
            }
        }

        if (orderType === 'dine_in' && !tableNumber.trim()) {
            errors.table = t.errorTable;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleCheckoutSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) return;
        if (!selectedBranch) return;
        if (!validateForm()) return;

        if (paymentMethod === 'blik') {
            setIsBlikModalOpen(true);
            return;
        }

        executeOrderPlacement();
    };

    const executeOrderPlacement = () => {
        setIsSubmitting(true);

        const payload = {
            branch_id: selectedBranch?.id,
            customer_name: customerInfo.name,
            customer_phone: customerInfo.phone,
            customer_email: customerInfo.email || null,
            order_type: orderType,
            delivery_address: orderType === 'delivery' ? deliveryAddress : null,
            table_number: orderType === 'dine_in' ? tableNumber : null,
            payment_method: paymentMethod,
            customer_notes: customerNotes || null,
            items: items.map((item) => ({
                product_id: item.product.id,
                quantity: item.quantity,
                modifiers: item.selectedModifiers,
                item_notes: item.itemNotes || null,
            })),
        };

        router.post('/orders', payload, {
            onSuccess: () => {
                // Trigger celebratory confetti
                try {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                    });
                } catch {
                    // Confetti fallback
                }
                clearCart();
                setCartOpen(false);
                setIsSubmitting(false);
            },
            onError: (errors) => {
                setFormErrors(errors as Record<string, string>);
                setIsSubmitting(false);
                setIsBlikModalOpen(false);
            },
        });
    };

    const handleBlikConfirm = () => {
        if (blikCode.length !== 6) return;
        setBlikStatus('waiting');

        setTimeout(() => {
            setBlikStatus('confirmed');
            setTimeout(() => {
                setIsBlikModalOpen(false);
                executeOrderPlacement();
            }, 800);
        }, 1200);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
            {/* Backdrop */}
            <div
                onClick={() => setCartOpen(false)}
                className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            />

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
                <div className="w-screen max-w-md sm:max-w-lg bg-neutral-900 border-l border-neutral-800 text-white shadow-2xl flex flex-col justify-between">
                    {/* Header */}
                    <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-950/80">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white">{t.yourCart}</h3>
                                <div className="text-xs text-neutral-400">
                                    {selectedBranch ? selectedBranch.name : t.selectBranch}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => setCartOpen(false)}
                            className="p-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        {/* Order Type Toggle in Cart */}
                        <div className="grid grid-cols-3 gap-1 bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800">
                            <button
                                type="button"
                                onClick={() => setOrderType('delivery')}
                                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                                    orderType === 'delivery'
                                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                        : 'text-neutral-400 hover:text-neutral-200'
                                }`}
                            >
                                🛵 {t.delivery}
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderType('collection')}
                                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                                    orderType === 'collection'
                                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                        : 'text-neutral-400 hover:text-neutral-200'
                                }`}
                            >
                                🛍️ {t.collection}
                            </button>
                            <button
                                type="button"
                                onClick={() => setOrderType('dine_in')}
                                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                                    orderType === 'dine_in'
                                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                                        : 'text-neutral-400 hover:text-neutral-200'
                                }`}
                            >
                                🍽️ {t.dineIn}
                            </button>
                        </div>

                        {/* Free Delivery / Minimum Order Progress Bar */}
                        {orderType === 'delivery' && (
                            <div className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-2">
                                <div className="flex items-center justify-between text-xs font-semibold">
                                    <span className="flex items-center gap-1.5 text-amber-400">
                                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                        {freeDeliveryDiff > 0
                                            ? t.freeDeliveryFrom.replace('{threshold}', String(freeDeliveryThreshold)).replace('{diff}', formatPrice(freeDeliveryDiff))
                                            : t.freeDeliveryReached}
                                    </span>
                                    <span className="text-neutral-400">{freeDeliveryProgress}%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-neutral-800 overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-red-500 to-amber-400 transition-all duration-500"
                                        style={{ width: `${freeDeliveryProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Items List */}
                        {items.length === 0 ? (
                            <div className="py-16 text-center space-y-3">
                                <div className="w-16 h-16 rounded-full bg-neutral-800/80 flex items-center justify-center mx-auto text-neutral-500">
                                    <ShoppingBag className="w-8 h-8" />
                                </div>
                                <h4 className="font-bold text-neutral-300">{t.emptyCart}</h4>
                                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                                    {t.emptyCartSub}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    <span>{t.selectedItems.replace('{count}', String(itemCount))}</span>
                                    <button
                                        type="button"
                                        onClick={clearCart}
                                        className="text-red-400 hover:text-red-300 normal-case font-medium text-xs flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>{t.clear}</span>
                                    </button>
                                </div>

                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3.5 rounded-2xl bg-neutral-800/70 border border-neutral-700/60 space-y-2.5"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <h5 className="text-sm font-bold text-white truncate">
                                                    {getLocalizedText(item.product.name, currentLocale)}
                                                </h5>
                                                <div className="text-xs font-black text-amber-400 mt-0.5">
                                                    {formatPrice(item.totalPrice)}
                                                </div>
                                            </div>

                                            {/* Quantity + / - */}
                                            <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-xl p-0.5 shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-6 text-center text-xs font-bold text-white">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-7 h-7 rounded-lg flex items-center justify-center text-neutral-400 hover:bg-neutral-800 hover:text-white"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Modifiers tags */}
                                        {item.selectedModifiers.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {item.selectedModifiers.map((mod, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-0.5 rounded-md bg-neutral-900/90 border border-neutral-700/80 text-[10px] text-neutral-300 font-medium"
                                                    >
                                                        {mod.option_name}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {item.itemNotes && (
                                            <div className="text-[11px] text-amber-300/80 italic">
                                                * {item.itemNotes}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Customer & Delivery Form */}
                        {items.length > 0 && (
                            <div className="space-y-4 pt-2 border-t border-neutral-800">
                                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                                    {t.orderDetailsHeader}
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                                            {t.fullNameRequired}
                                        </label>
                                        <input
                                            type="text"
                                            value={customerInfo.name}
                                            onChange={(e) => setCustomerInfo({ name: e.target.value })}
                                            placeholder={currentLocale === 'en' ? 'John Doe' : 'Jan Kowalski'}
                                            className="w-full bg-neutral-800/90 border border-neutral-700 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 outline-none"
                                        />
                                        {formErrors.name && (
                                            <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.name}</span>
                                        )}
                                    </div>

                                    <div>
                                        <label className="text-[11px] font-semibold text-neutral-300 block mb-1">
                                            {t.phoneRequired}
                                        </label>
                                        <input
                                            type="tel"
                                            value={customerInfo.phone}
                                            onChange={(e) => setCustomerInfo({ phone: e.target.value })}
                                            placeholder="+48 500 123 456"
                                            className="w-full bg-neutral-800/90 border border-neutral-700 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 focus:ring-2 focus:ring-amber-500 outline-none"
                                        />
                                        {formErrors.phone && (
                                            <span className="text-[10px] text-red-400 mt-0.5 block">{formErrors.phone}</span>
                                        )}
                                    </div>
                                </div>

                                {/* Delivery Address Inputs */}
                                {orderType === 'delivery' && (
                                    <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800 space-y-3">
                                        <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                                            <MapPin className="w-4 h-4" />
                                            <span>{t.deliveryAddress}</span>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-2">
                                                <input
                                                    type="text"
                                                    value={deliveryAddress.street}
                                                    onChange={(e) => setDeliveryAddress({ street: e.target.value })}
                                                    placeholder={t.streetRequired}
                                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-xs text-white placeholder-neutral-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={deliveryAddress.building_number}
                                                    onChange={(e) => setDeliveryAddress({ building_number: e.target.value })}
                                                    placeholder={t.buildingRequired}
                                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-xs text-white placeholder-neutral-500 outline-none"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <input
                                                    type="text"
                                                    value={deliveryAddress.apartment || ''}
                                                    onChange={(e) => setDeliveryAddress({ apartment: e.target.value })}
                                                    placeholder={t.apartmentOptional}
                                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-xs text-white placeholder-neutral-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={deliveryAddress.city}
                                                    onChange={(e) => setDeliveryAddress({ city: e.target.value })}
                                                    placeholder={t.cityRequired}
                                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-xs text-white placeholder-neutral-500 outline-none"
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    value={deliveryAddress.door_code || ''}
                                                    onChange={(e) => setDeliveryAddress({ door_code: e.target.value })}
                                                    placeholder={t.doorCodeOptional}
                                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-xs text-white placeholder-neutral-500 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Dine In Table Number */}
                                {orderType === 'dine_in' && (
                                    <div className="p-3.5 rounded-2xl bg-neutral-950/80 border border-neutral-800">
                                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                                            {t.tableNumberRequired}
                                        </label>
                                        <input
                                            type="text"
                                            value={tableNumber}
                                            onChange={(e) => setTableNumber(e.target.value)}
                                            placeholder={t.tableNumberPlaceholder}
                                            className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2.5 text-xs text-white placeholder-neutral-500 outline-none"
                                        />
                                    </div>
                                )}

                                {/* Payment Method Selector */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-neutral-300 block">
                                        {t.paymentMethod}
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('blik')}
                                            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                                                paymentMethod === 'blik'
                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                                            }`}
                                        >
                                            <span className="w-5 h-5 rounded bg-black text-amber-400 text-[9px] font-black flex items-center justify-center">
                                                BLIK
                                            </span>
                                            <span>{t.blikOnline}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('card_online')}
                                            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                                                paymentMethod === 'card_online'
                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                                            }`}
                                        >
                                            <CreditCard className="w-4 h-4 text-emerald-400" />
                                            <span>{t.cardPayU}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod('cash_on_delivery')}
                                            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                                                paymentMethod === 'cash_on_delivery'
                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                                            }`}
                                        >
                                            <span>{t.cash}</span>
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setPaymentMethod(orderType === 'dine_in' ? 'pay_at_counter' : 'card_on_delivery')}
                                            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
                                                paymentMethod === (orderType === 'dine_in' ? 'pay_at_counter' : 'card_on_delivery')
                                                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                                                    : 'bg-neutral-800 border-neutral-700 text-neutral-300'
                                            }`}
                                        >
                                            <span>{orderType === 'dine_in' ? t.atCounter : t.cardWithCourier}</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Order Notes */}
                                <div>
                                    <label className="text-[11px] font-semibold text-neutral-400 block mb-1">
                                        {t.orderNotesLabel}
                                    </label>
                                    <textarea
                                        value={customerNotes}
                                        onChange={(e) => setCustomerNotes(e.target.value)}
                                        placeholder={t.orderNotesPlaceholder}
                                        rows={2}
                                        className="w-full bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-xs text-white placeholder-neutral-500 outline-none"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Bottom Summary & Checkout Bar */}
                    {items.length > 0 && (
                        <div className="p-5 bg-neutral-950 border-t border-neutral-800 space-y-3 shrink-0">
                            <div className="space-y-1.5 text-xs text-neutral-400">
                                <div className="flex justify-between">
                                    <span>{t.subtotal}:</span>
                                    <span className="text-white font-semibold">{formatPrice(subtotal)}</span>
                                </div>
                                {orderType === 'delivery' && (
                                    <div className="flex justify-between">
                                        <span>{t.deliveryFee}:</span>
                                        <span className="text-white font-semibold">
                                            {deliveryFee === 0 ? (
                                                <span className="text-emerald-400 font-bold">{t.free}</span>
                                            ) : (
                                                formatPrice(deliveryFee)
                                            )}
                                        </span>
                                    </div>
                                )}
                                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-neutral-800">
                                    <span>{t.total}:</span>
                                    <span className="text-amber-400 text-lg">{formatPrice(total)}</span>
                                </div>
                            </div>

                            {/* Minimum Order Warning */}
                            {isUnderMinOrder && (
                                <div className="p-2.5 rounded-xl bg-red-950/80 border border-red-800 text-[11px] text-red-200 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                    <span>{t.minOrderWarning.replace('{min}', String(minOrderAmount)).replace('{diff}', formatPrice(minOrderDiff))}</span>
                                </div>
                            )}

                            {/* Checkout Button */}
                            <button
                                type="button"
                                disabled={isSubmitting || isUnderMinOrder}
                                onClick={handleCheckoutSubmit}
                                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-base flex items-center justify-between shadow-xl shadow-red-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="flex items-center gap-2">
                                    <Lock className="w-4 h-4 text-amber-200" />
                                    <span>{isSubmitting ? t.processing : t.placeOrderBtn}</span>
                                </span>
                                <span className="flex items-center gap-1">
                                    <span>{formatPrice(total)}</span>
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Interactive BLIK Modal */}
            {isBlikModalOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
                    <div className="w-full max-w-sm bg-neutral-900 border border-neutral-700 rounded-3xl p-6 shadow-2xl text-center space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black text-xl flex items-center justify-center mx-auto shadow-lg">
                            BLIK
                        </div>

                        <div>
                            <h4 className="text-lg font-black text-white">{t.blikModalTitle}</h4>
                            <p className="text-xs text-neutral-400 mt-1">
                                {t.blikModalDesc}
                            </p>
                        </div>

                        {blikStatus === 'idle' && (
                            <div className="space-y-4">
                                <input
                                    type="text"
                                    maxLength={6}
                                    value={blikCode}
                                    onChange={(e) => setBlikCode(e.target.value.replace(/\D/g, ''))}
                                    placeholder="• • •   • • •"
                                    className="w-full text-center tracking-[0.5em] text-2xl font-black bg-neutral-800 border-2 border-amber-500/60 rounded-2xl py-3 text-white focus:border-amber-400 outline-none"
                                />

                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsBlikModalOpen(false)}
                                        className="flex-1 py-3 rounded-xl bg-neutral-800 text-neutral-300 font-bold text-xs hover:bg-neutral-700"
                                    >
                                        {t.blikCancel}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={blikCode.length !== 6}
                                        onClick={handleBlikConfirm}
                                        className="flex-1 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-xs disabled:opacity-40 transition-colors shadow-lg"
                                    >
                                        {t.blikPayBtn.replace('{amount}', formatPrice(total))}
                                    </button>
                                </div>
                            </div>
                        )}

                        {blikStatus === 'waiting' && (
                            <div className="py-6 space-y-3">
                                <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" />
                                <div className="text-sm font-bold text-amber-400">{t.blikWaiting}</div>
                                <div className="text-xs text-neutral-400">
                                    {t.blikWaitingSub}
                                </div>
                            </div>
                        )}

                        {blikStatus === 'confirmed' && (
                            <div className="py-6 space-y-3">
                                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                                <div className="text-base font-black text-emerald-400">{t.blikConfirmed}</div>
                                <div className="text-xs text-neutral-400">{t.blikSaving}</div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
