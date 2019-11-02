import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getProductById, getImagesById } from '../../firebase/firebase.utils'
import Product from '../../interfaces/Product.interface';

export default class ProductDetails extends React.Component<IDetailProps, IDetailState> {

    constructor(props: IDetailProps) {
        super(props);

        this.state = {
            product: null,
            images: null,
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
            return <div>
                    <h3><b>Name: </b>{product.name}</h3>
                    <p><b>Number: </b>{product.number}</p>
                    <p><b>Description: </b>{product.description}</p>
                    {images.map(img => (
                        <img src={img.url} alt={img.name}/>
                    ))}
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
    images: {url: string, name: string}[] | null;
}