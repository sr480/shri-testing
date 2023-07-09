import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { cn } from '@bem-react/classname';
import { Product, ProductVariant } from '../../common/types';
import { addToCart } from '../store';
import { CartBadge } from './CartBadge';
import { Image } from './Image';
import { ProductVariantSelector } from './ProductVariantSelector';

const bem = cn('ProductDetails');

export interface ProductDetailsProps {
    product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
    const [variant, setVariant] = useState<ProductVariant>(product.variants?.[0]);
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(addToCart(product, variant));
    }, [dispatch, product, variant]);

    const btnSizeClass = process.env.BUG_ID !== '9' ? 'btn-lg' : 'btn-sm';

    return (
        <div className={bem(null, ['row'])}>
            <div className="col-12 col-sm-5 col-lg-4">
                <Image />
            </div>
            <div className="col-12 col-sm-7 col-lg-6">
                <h1 className={bem("Name")}>{product.name}</h1>
                <p className={bem("Description")}>{product.description}</p>
                <p className={bem("Price", ['fs-3'])}>${product.price}</p>
                <p>
                    <ProductVariantSelector variants={product.variants} onSelect={setVariant}></ProductVariantSelector>
                </p>
                <p>
                    <button className={bem("AddToCart", ['btn', 'btn-primary', btnSizeClass])} onClick={onClick}>Add to Cart</button>
                    <CartBadge id={product.id} variantId={variant.id} />
                </p>
                <dl>
                    <dt>Color</dt>
                    <dd className={bem("Color", ['text-capitalize'])}>{product.color}</dd>
                    <dt>Material</dt>
                    <dd className={bem("Material", ['text-capitalize'])}>{product.material}</dd>
                </dl>
            </div>
        </div>
    );
}
