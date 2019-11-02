import React, { FunctionComponent } from 'react';
import Product from '../../interfaces/Product.interface'
import ListItem from '../list-item/list-item.component';

export const ProductList: FunctionComponent<Props> = ({ products }) => (
    <ul className='product-list'>
        {
            products.map(product => (
                <ListItem key={product.number} product={product}/>
            ))
        }
    </ul>
);

interface Props {
    products: Product[];
}

export default ProductList