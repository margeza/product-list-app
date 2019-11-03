import React from 'react';
import Product from '../../interfaces/Product.interface';
import { Link } from 'react-router-dom';

export const ListItem: React.FunctionComponent<ListItemProps> = ({ product }) => (
    <Link className='list-group-item list-group-item-action' to={`/details/${product.id}`}>
        <h5 className='name'>{product.name}</h5>
    </Link>
);

interface ListItemProps {
    product: Product;
}

export default ListItem;