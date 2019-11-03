import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getProductById, getImagesById, updateProductData, updateProductImages } from '../../firebase/firebase.utils'
import Product from '../../interfaces/Product.interface';
import ProductInfo from '../../components/product-info/product-info.component';
import { Link } from 'react-router-dom';

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
        const productId = this.props.match.params.productId;
        const prod = await getProductById(productId);
        const img = await getImagesById(productId);
        this.setState({
            product: prod,
            images: img,
        });
    }

    handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {product, images} = this.state;
        if (product !== null && images !== null) {
            updateProductData(product)
            .then(() => updateProductImages(product.id, images))
            .then(() => this.setState({ forEdit: false}));
        }
    }

    setImageValue(e: any, id: string, type: string) {
        if (this.state.images !== null) {
            const newImagesList = this.state.images.map(img => {
                if(img.id === id) {
                    if (type === 'name'){
                        return {...img, name: e.target.value};
                    } else {
                        return {...img, url: e.target.value};
                    }
                } else {
                    return {...img};
                }
            });

            this.setState({
                images: newImagesList,
            });
        }

    }

    render() {
        const {product, images, forEdit} = this.state;
        if (product !== null && images !== null) {
            return <div className='product-details'>
                    {!forEdit && 
                        <Link to={`/`}>
                            <button 
                                onClick={() => this.setState({ forEdit: !this.state.forEdit})}>
                                Back to product list
                            </button>
                        </Link>
                    }
                    {!forEdit && 
                        <button 
                            onClick={() => this.setState({ forEdit: !this.state.forEdit})}>
                            { forEdit ? 'Save':'Edit'}
                        </button>
                    }
                    { !forEdit && <ProductInfo product={product} images={images} /> }
                    { forEdit && 
                        <form className='product-form' onSubmit={e => this.handleSubmit(e)}>
                            <input 
                                type="text"
                                placeholder="Name"
                                defaultValue={product.name || ''}
                                onChange={e => this.setState({product: {...product, name: e.target.value}})}
                            />
                            <input 
                                type="text"
                                placeholder="Number"
                                defaultValue={product.number || ''}
                                onChange={e => this.setState({product: {...product, number: e.target.value}})}
                            />
                            <input 
                                type="text"
                                placeholder="Description"
                                defaultValue={product.description || ''}
                                onChange={e => this.setState({product: {...product, description: e.target.value}})}
                            />
                            {
                                images.map(img => (
                                    <div>
                                        <input 
                                            type="text"
                                            placeholder="Image name"
                                            defaultValue={img.name || ''}
                                            onChange={e => this.setImageValue(e, img.id, 'name')}
                                        />
                                        <input 
                                            type="text"
                                            placeholder="Image url"
                                            defaultValue={img.url || ''}
                                            onChange={e => this.setImageValue(e, img.id, 'url')}
                                        />
                                    </div> 
                                ))
                            }
                            <button type='submit'>Save</button>
                        </form>
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
    images: {id: string, url: string, name: string}[] | null;
    forEdit: boolean;
}