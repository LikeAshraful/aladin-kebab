import { create } from 'zustand';
import { Branch, CartItem, DeliveryAddress, Product, SelectedModifier } from '../types';

interface CartState {
    items: CartItem[];
    orderType: 'delivery' | 'collection' | 'dine_in';
    selectedBranch: Branch | null;
    deliveryAddress: DeliveryAddress;
    customerInfo: {
        name: string;
        phone: string;
        email: string;
    };
    tableNumber: string;
    customerNotes: string;
    paymentMethod: 'blik' | 'card_online' | 'cash_on_delivery' | 'card_on_delivery' | 'pay_at_counter';
    isCartOpen: boolean;
    isCheckoutModalOpen: boolean;

    // Actions
    addItem: (product: Product, quantity: number, selectedModifiers: SelectedModifier[], itemNotes?: string) => void;
    updateQuantity: (itemId: string, delta: number) => void;
    removeItem: (itemId: string) => void;
    clearCart: () => void;
    setOrderType: (type: 'delivery' | 'collection' | 'dine_in') => void;
    setSelectedBranch: (branch: Branch) => void;
    setDeliveryAddress: (address: Partial<DeliveryAddress>) => void;
    setCustomerInfo: (info: Partial<{ name: string; phone: string; email: string }>) => void;
    setTableNumber: (table: string) => void;
    setCustomerNotes: (notes: string) => void;
    setPaymentMethod: (method: 'blik' | 'card_online' | 'cash_on_delivery' | 'card_on_delivery' | 'pay_at_counter') => void;
    setCartOpen: (open: boolean) => void;
    setCheckoutModalOpen: (open: boolean) => void;

    // Computed Helpers
    getSubtotal: () => number;
    getDeliveryFee: () => number;
    getTotal: () => number;
    getItemCount: () => number;
}

const STORAGE_KEY = 'aladen_kebab_cart_v1';

const getInitialState = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                items: parsed.items || [],
                orderType: parsed.orderType || 'delivery',
                deliveryAddress: parsed.deliveryAddress || {
                    street: '',
                    building_number: '',
                    apartment: '',
                    city: 'Będzin',
                    postal_code: '42-500',
                    door_code: '',
                    notes: '',
                },
                customerInfo: parsed.customerInfo || {
                    name: '',
                    phone: '',
                    email: '',
                },
                tableNumber: parsed.tableNumber || '',
                customerNotes: parsed.customerNotes || '',
                paymentMethod: parsed.paymentMethod || 'blik',
            };
        }
    } catch {
        // Fallback on storage errors
    }

    return {
        items: [],
        orderType: 'delivery' as const,
        deliveryAddress: {
            street: '',
            building_number: '',
            apartment: '',
            city: 'Będzin',
            postal_code: '42-500',
            door_code: '',
            notes: '',
        },
        customerInfo: {
            name: '',
            phone: '',
            email: '',
        },
        tableNumber: '',
        customerNotes: '',
        paymentMethod: 'blik' as const,
    };
};

const initial = getInitialState();

export const useCartStore = create<CartState>((set, get) => {
    const save = (state: Partial<CartState>) => {
        try {
            const current = get();
            const toSave = {
                items: state.items ?? current.items,
                orderType: state.orderType ?? current.orderType,
                deliveryAddress: state.deliveryAddress ?? current.deliveryAddress,
                customerInfo: state.customerInfo ?? current.customerInfo,
                tableNumber: state.tableNumber ?? current.tableNumber,
                customerNotes: state.customerNotes ?? current.customerNotes,
                paymentMethod: state.paymentMethod ?? current.paymentMethod,
            };
            localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
        } catch {
            // Ignore storage errors
        }
    };

    return {
        items: initial.items,
        orderType: initial.orderType,
        selectedBranch: null,
        deliveryAddress: initial.deliveryAddress,
        customerInfo: initial.customerInfo,
        tableNumber: initial.tableNumber,
        customerNotes: initial.customerNotes,
        paymentMethod: initial.paymentMethod,
        isCartOpen: false,
        isCheckoutModalOpen: false,

        addItem: (product, quantity, selectedModifiers, itemNotes) => {
            const unitPrice =
                (Number(product.base_price) || 0) +
                selectedModifiers.reduce((sum, mod) => sum + (Number(mod.price_modifier) || 0), 0);
            const totalPrice = Math.round(unitPrice * quantity * 100) / 100;

            const newItem: CartItem = {
                id: `${product.id}-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
                product,
                quantity,
                unitPrice,
                totalPrice,
                selectedModifiers,
                itemNotes,
            };

            set((state) => {
                const updatedItems = [...state.items, newItem];
                save({ items: updatedItems });
                return { items: updatedItems, isCartOpen: true };
            });
        },

        updateQuantity: (itemId, delta) => {
            set((state) => {
                const updated = state.items
                    .map((item) => {
                        if (item.id === itemId) {
                            const newQty = item.quantity + delta;
                            if (newQty <= 0) return null;
                            return {
                                ...item,
                                quantity: newQty,
                                totalPrice: Math.round(item.unitPrice * newQty * 100) / 100,
                            };
                        }
                        return item;
                    })
                    .filter(Boolean) as CartItem[];

                save({ items: updated });
                return { items: updated };
            });
        },

        removeItem: (itemId) => {
            set((state) => {
                const updated = state.items.filter((item) => item.id !== itemId);
                save({ items: updated });
                return { items: updated };
            });
        },

        clearCart: () => {
            set(() => {
                save({ items: [] });
                return { items: [] };
            });
        },

        setOrderType: (orderType) => {
            set(() => {
                save({ orderType });
                return { orderType };
            });
        },

        setSelectedBranch: (selectedBranch) => {
            set({ selectedBranch });
        },

        setDeliveryAddress: (address) => {
            set((state) => {
                const updated = { ...state.deliveryAddress, ...address };
                save({ deliveryAddress: updated });
                return { deliveryAddress: updated };
            });
        },

        setCustomerInfo: (info) => {
            set((state) => {
                const updated = { ...state.customerInfo, ...info };
                save({ customerInfo: updated });
                return { customerInfo: updated };
            });
        },

        setTableNumber: (tableNumber) => {
            set(() => {
                save({ tableNumber });
                return { tableNumber };
            });
        },

        setCustomerNotes: (customerNotes) => {
            set(() => {
                save({ customerNotes });
                return { customerNotes };
            });
        },

        setPaymentMethod: (paymentMethod) => {
            set(() => {
                save({ paymentMethod });
                return { paymentMethod };
            });
        },

        setCartOpen: (isCartOpen) => set({ isCartOpen }),

        setCheckoutModalOpen: (isCheckoutModalOpen) => set({ isCheckoutModalOpen }),

        getSubtotal: () => {
            const { items } = get();
            return items.reduce((sum, i) => sum + i.totalPrice, 0);
        },

        getDeliveryFee: () => {
            const { orderType, selectedBranch, getSubtotal } = get();
            if (orderType !== 'delivery' || !selectedBranch) return 0;
            const subtotal = getSubtotal();
            if (selectedBranch.free_delivery_threshold && subtotal >= selectedBranch.free_delivery_threshold) {
                return 0;
            }
            return Number(selectedBranch.delivery_fee) || 0;
        },

        getTotal: () => {
            const { getSubtotal, getDeliveryFee } = get();
            return Math.round((getSubtotal() + getDeliveryFee()) * 100) / 100;
        },

        getItemCount: () => {
            const { items } = get();
            return items.reduce((sum, i) => sum + i.quantity, 0);
        },
    };
});
