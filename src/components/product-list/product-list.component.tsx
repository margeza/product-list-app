import React, { FunctionComponent } from 'react';
import Product from '../../interfaces/Product.interface'
import ListItem from '../list-item/list-item.component';

export const ProductList: FunctionComponent<ProductListProps> = ({ products }) => (
    <div className='product-list list-group'>
        {
            products.map(product => (
                <ListItem key={product.id} product={product}/>
            ))
        }
    </div>
);

interface ProductListProps {
    products: Product[];
}

export default ProductList