import React from 'react';
import Product from '../../interfaces/Product.interface';
import './product-info.component.scss'

export const ProductInfo: React.FunctionComponent<ProductInfoProps> = ({ product, images }) => (
    <div className='product-info mt-1'>
        <h3><b>Name: </b>{product.name}</h3>
        <p><b>Number: </b>{product.number}</p>
        <p><b>Description: </b>{product.description}</p>
        {images.map(img => (
            <div className='card p-2 mb-2'>
                <p><b>Image name: </b>{img.name}</p>
                <img key={img.id} src={img.url} alt={img.name}/>
            </div>
        ))}
    </div>
);

interface ProductInfoProps {
    product: Product;
    images: {id: string, url: string, name: string}[];
}

export default ProductInfo;