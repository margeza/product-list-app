import React from 'react';
import Product from '../../interfaces/Product.interface';
import { Link } from 'react-router-dom';

export const ListItem: React.FunctionComponent<ListItemProps> = ({ product }) => (
    <li className='list-item'>
        <Link to={`/details/${product.id}`}>
            <h1 className='name'>{product.name}</h1>
            <p className='number'>{product.number}</p>
        </Link>
    </li>
);

interface ListItemProps {
    product: Product;
}

export default ListItem;