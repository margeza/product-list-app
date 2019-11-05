import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getProductById, updateProductData } from '../../firebase/firebase.utils'
import Product from '../../interfaces/Product.interface';
import ProductInfo from '../../components/product-info/product-info.component';
import { Link } from 'react-router-dom';
import './product-details.component.scss';
import ProductForm from '../../components/product-form/product-form.component';


export default class ProductDetails extends React.Component<IDetailProps, IDetailState> {

    constructor(props: IDetailProps) {
        super(props);

        this.state = {
            product: null,
            forEdit: false,
        }
    }

    async componentWillMount() {
        const productId = this.props.match.params.productId;
        const prod = await getProductById(productId);
        this.setState({
            product: prod,
        });
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, id?: number): void => {
        if(id){
            this.handleImageChange(event, id);
        } else {
            const { value, name } = event.target;
            const product = this.state.product;
            if (product) {
                this.setState({product: {...product, [name]: value},});
            }
        }
        
    }

    handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, id: number): void => {
        const { value, name } = event.target;
        if (this.state.product) {
            const images = JSON.parse(this.state.product.images);
            const newImagesList = images.map((img: Image, index: number) => {
                if(index === id) {
                    return {...img, [name]: value};
                } else {
                    return {...img};
                }
            });
            const product = this.state.product;
            this.setState({product: {...product, images: JSON.stringify(newImagesList)}, });
        }
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const product = this.state.product;
        if (product) {
            updateProductData(product)
            .then(() => this.setState({ forEdit: false}));
        }
    }

    addNewImage = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        event.preventDefault();
        const product = this.state.product;
        if (product) {
            const images = JSON.parse(product.images);
            images.push({url: '',  name: ''});
            this.setState({product: {...product, images: JSON.stringify(images)}, });
        }
    }

    render() {
        const {product, forEdit} = this.state;
        if (product) {
            return <div className='product-details'>
                    {!forEdit && 
                        <div className='card content'>
                            <div className='d-flex justify-content-between mb-3'>
                                <Link to={`/`}>
                                    <button
                                        className='btn btn-secondary' 
                                        onClick={() => this.setState({ forEdit: !this.state.forEdit})}>
                                        Back to product list
                                    </button>
                                </Link>
                                <button 
                                    className='button-edit btn btn-primary'
                                    onClick={() => this.setState({ forEdit: !this.state.forEdit})}>
                                    { forEdit ? 'Save':'Edit'}
                                </button>
                            </div>
                            <ProductInfo product={product} />
                        </div>
                    }
                    
                    {forEdit && 
                            <ProductForm 
                                    handleChange={this.handleChange} 
                                    handleSubmit={this.handleSubmit}
                                    addNewImage={this.addNewImage}
                                    product={product}/> 
                    }
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
    forEdit: boolean;
}

interface Image {url: string, name: string}