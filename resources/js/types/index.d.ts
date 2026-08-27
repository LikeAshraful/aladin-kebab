export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    branch_id?: number | null;
    branch?: Branch;
    preferred_language?: string;
    roles?: string[];
    is_super_admin?: boolean;
    is_branch_manager?: boolean;
    is_kitchen_staff?: boolean;
    is_staff?: boolean;
    email_verified_at?: string;
}

export interface Branch {
    id: number;
    name: string;
    slug: string;
    address: string;
    city: string;
    postal_code: string;
    lat: number;
    lng: number;
    phone: string;
    email?: string | null;
    is_active: boolean;
    opening_hours: Record<string, { open: string; close: string; is_closed?: boolean }>;
    delivery_radius_km: number;
    min_order_amount: number;
    delivery_fee: number;
    free_delivery_threshold?: number | null;
    estimated_prep_time_minutes: number;
    estimated_delivery_time_minutes: number;
    dine_in_capacity: number;
}

export interface Category {
    id: number;
    name: Record<string, string> | string;
    description?: Record<string, string> | string | null;
    slug: string;
    image_path?: string | null;
    icon?: string | null;
    sort_order: number;
    is_active: boolean;
    products?: Product[];
}

export interface ModifierOption {
    id: number;
    modifier_group_id: number;
    name: Record<string, string> | string;
    price_modifier: number;
    is_default: boolean;
    is_available: boolean;
    sort_order: number;
}

export interface ModifierGroup {
    id: number;
    name: Record<string, string> | string;
    selection_type: 'single' | 'multiple';
    is_required: boolean;
    min_selection: number;
    max_selection: number;
    sort_order: number;
    options: ModifierOption[];
}

export interface Product {
    id: number;
    category_id: number;
    name: Record<string, string> | string;
    description?: Record<string, string> | string | null;
    slug: string;
    base_price: number;
    image_url?: string | null;
    badge?: string | null;
    spiciness_level: number;
    is_vegetarian: boolean;
    is_available: boolean;
    is_in_stock_at_branch?: boolean;
    sort_order: number;
    category?: Category;
    modifier_groups?: ModifierGroup[];
}

export interface SelectedModifier {
    group_name: string;
    option_name: string;
    price_modifier: number;
}

export interface OrderItem {
    id?: number;
    product_id: number;
    product_name: Record<string, string> | string;
    unit_price: number;
    quantity: number;
    total_price: number;
    selected_modifiers: SelectedModifier[];
    item_notes?: string | null;
    product?: Product;
}

export interface DeliveryAddress {
    street: string;
    building_number: string;
    apartment?: string;
    city: string;
    postal_code: string;
    door_code?: string;
    notes?: string;
    lat?: number;
    lng?: number;
}

export interface Order {
    id: number;
    order_number: string;
    branch_id: number;
    branch?: Branch;
    user_id?: number | null;
    user?: User;
    customer_name: string;
    customer_phone: string;
    customer_email?: string | null;
    order_type: 'delivery' | 'collection' | 'dine_in';
    delivery_address?: DeliveryAddress | null;
    table_number?: string | null;
    subtotal: number;
    delivery_fee: number;
    discount_amount: number;
    total_amount: number;
    payment_method: 'blik' | 'card_online' | 'cash_on_delivery' | 'card_on_delivery' | 'pay_at_counter';
    payment_status: 'pending' | 'paid' | 'failed' | 'refunded';
    order_status: 'pending' | 'in_kitchen' | 'ready' | 'out_for_delivery' | 'delivered' | 'completed' | 'cancelled';
    scheduled_at?: string | null;
    customer_notes?: string | null;
    kitchen_notes?: string | null;
    estimated_ready_at?: string | null;
    completed_at?: string | null;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
}

export interface Reservation {
    id: number;
    reservation_code: string;
    branch_id: number;
    branch?: Branch;
    user_id?: number | null;
    user?: User;
    customer_name: string;
    customer_phone: string;
    customer_email?: string | null;
    guests_count: number;
    reservation_date: string;
    reservation_time: string;
    seating_preference: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
    notes?: string | null;
    table_assigned?: string | null;
    created_at: string;
    updated_at: string;
}

export interface CartItem {
    id: string; // unique UUID for cart row
    product: Product;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    selectedModifiers: SelectedModifier[];
    itemNotes?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User | null;
    };
    branches?: Branch[];
    flash?: {
        success?: string | null;
        error?: string | null;
        info?: string | null;
    };
    locale?: string;
};
