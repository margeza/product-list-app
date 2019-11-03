import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getProductById, getImagesById } from '../../firebase/firebase.utils'
import Product from '../../interfaces/Product.interface';
import ProductForm from '../../components/product-form/product-form.component';
import ProductInfo from '../../components/product-info/product-info.component';

export default class ProductDetails extends React.Component<IDetailProps, IDetailState> {

    constructor(props: IDetailProps) {
        super(props);

        this.state = {
            product: null,
            images: null,
            forEdit: false,
        }
    }
    async componentWillMount() {
        const prod = await getProductById(this.props.match.params.productId);
        const img = await getImagesById(this.props.match.params.productId);
        this.setState({
            product: prod,
            images: img,
        });
    }

    render() {
        const product = this.state.product;
        const images = this.state.images;
        if (product !== null && images !== null) {
            return <div className='product-details'>
                    <button 
                        onClick={() => this.setState({ forEdit: !this.state.forEdit})}>
                        { this.state.forEdit ? 'Save':'Edit'}
                    </button>
                    { !this.state.forEdit && <ProductInfo product={product} images={images} /> }
                    { this.state.forEdit && <ProductForm /> }
                </div>;
        } else {
            return <h5>Loading...</h5>;
        }
    }
}

interface IDetailProps extends RouteComponentProps<{ productId: string }> {

}

interface IDetailState {
    product: Product| null;
    images: {id: string, url: string, name: string}[] | null;
    forEdit: boolean;
}