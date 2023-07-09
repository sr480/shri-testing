export interface ProductShortInfo {
    id: number;
    name: string;
    price: number;
}

export interface Product extends ProductShortInfo {
    description: string;
    material: string;
    color: string;
    variants: ProductVariant[]
}

export interface ProductVariant {
    id: number;
    displayText: string;
}

export interface CheckoutFormData {
    name: string;
    phone: string;
    address: string;
}

export interface CartItem {
    id: number;
    name: string;
    price: number;
    count: number;
    variant: ProductVariant
}

export type CartState = Record<string, CartItem>;

export interface Order {
    form: CheckoutFormData;
    cart: CartState;
}

export interface CheckoutResponse {
    id: number;
}
