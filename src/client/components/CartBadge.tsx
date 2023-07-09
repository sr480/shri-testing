import React from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../store';
import { selectIsProductInCart } from '../store.selectors';

export interface CartBadgeProps {
    id: number;
    variantId?: number;
}

const bem = cn('CartBadge');

export const CartBadge: React.FC<CartBadgeProps> = ({ id, variantId }) => {
    const isInCart = useSelector((s: ApplicationState) => selectIsProductInCart(s, id, variantId));
    return isInCart ? <span className={bem(null, ['text-success', 'mx-3'])}>Item in cart</span> : null;
}
