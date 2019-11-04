import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getProductById, updateProductData } from '../../firebase/firebase.utils'
import Product from '../../interfaces/Product.interface';
import ProductInfo from '../../components/product-info/product-info.component';
import { Link } from 'react-router-dom';
import './product-details.component.scss';

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
        // if (prod){
        //     console.log(prod.img[0]);
        //     console.log(JSON.parse(JSON.stringify(prod.img)));
        //     console.log(JSON.parse(prod.img)[0].name);
        //     const imag = JSON.parse(prod.img);
        //     imag.push({url: 'lalala', name: 'lalala'});
        //     console.log(imag);
        //     console.log(JSON.stringify(imag));

        // } 
        this.setState({
            product: prod,
        });
    }

    handleSubmit(e:React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        const product = this.state.product;
        if (product !== null) {
            updateProductData(product)
            .then(() => this.setState({ forEdit: false}));
        }
    }

    setImageValue(e: any, id: number, type: string): void {
        if (this.state.product !== null) {
            const images = JSON.parse(this.state.product.images);
            const newImagesList = images.map((img: Image, index: number) => {
                if(index === id) {
                    if (type === 'name'){
                        return {...img, name: e.target.value};
                    } else {
                        return {...img, url: e.target.value};
                    }
                } else {
                    return {...img};
                }
            });
            const product = this.state.product;
            this.setState({product: {...product, images: JSON.stringify(newImagesList)}, });
        }

    }

    addNewImage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
        e.preventDefault();
        const product = this.state.product;
        if (product !== null) {
            const images = JSON.parse(product.images);
            images.push({url: '',  name: ''});
            this.setState({product: {...product, images: JSON.stringify(images)}, });
        }
    }

    render() {
        const {product, forEdit} = this.state;
        if (product !== null) {
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
                    
                    { forEdit && 
                        <div className='card content'>
                            <h3>Edit produkt details</h3>
                            <form onSubmit={e => this.handleSubmit(e)}>
                                <div className='form-group'>
                                    <label>Name:</label>
                                    <input 
                                        required
                                        id='name'
                                        type="text"
                                        placeholder="Name"
                                        defaultValue={product.name || ''}
                                        onChange={e => this.setState({product: {...product, name: e.target.value},})}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Number:</label>
                                    <input 
                                        required
                                        type="text"
                                        placeholder="Number"
                                        defaultValue={product.number || ''}
                                        onChange={e => this.setState({product: {...product, number: e.target.value},})}
                                    />
                                </div>
                                <div className='form-group'>
                                    <label>Description:</label>
                                    <input 
                                        required
                                        type="text"
                                        placeholder="Description"
                                        defaultValue={product.description || ''}
                                        onChange={e => this.setState({product: {...product, description: e.target.value},})}
                                    />
                                </div>
                                
                                {
                                    JSON.parse(product.images).map((img: Image, index: number) => (
                                        <div key={index} className='image-container'>
                                            <div className='form-group'>
                                                <label>Image name:</label>
                                                <input 
                                                    required
                                                    type="text"
                                                    placeholder="Image name"
                                                    defaultValue={img.name || ''}
                                                    onChange={e => this.setImageValue(e, index, 'name')}
                                                />
                                            </div>
                                            <div className='form-group'>
                                                <label>Image url:</label>
                                                <input 
                                                    required
                                                    type="text"
                                                    placeholder="Image url"
                                                    defaultValue={img.url || ''}
                                                    onChange={e => this.setImageValue(e, index, 'url')}
                                                />
                                            </div>
                                        </div> 
                                    ))
                                }
                                <div className='d-flex justify-content-end'>
                                    <button 
                                        className="add-button btn btn-secondary"
                                        onClick={e => this.addNewImage(e)}
                                    >+</button>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button 
                                        type='submit' 
                                        className="submit-button btn btn-primary"
                                    >Save</button>
                                </div>
                            </form>
                        </div>
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