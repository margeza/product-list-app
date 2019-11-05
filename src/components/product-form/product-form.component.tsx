import React from 'react';
import FormInput from "../../components/form-input/form-input.component";
import Product from '../../interfaces/Product.interface';

const ProductForm: React.FunctionComponent<ProductFormProps> = ({handleChange, handleSubmit, addNewImage, product}) => (
    <div className='card content'>
        <h3>Edit product details</h3>
        <form onSubmit={e => handleSubmit(e)}>
            <FormInput
                handleChange={handleChange}
                label="Name"
                name="name"
                placeholder="Name"
                defaultValue={product.name || ''}
            />
            <FormInput
                handleChange={handleChange}
                label="Number"
                name="number"
                placeholder="Number"
                defaultValue={product.number || ''}
            />
            <FormInput
                handleChange={handleChange}
                label="Description"
                name="description"
                placeholder="Description"
                defaultValue={product.description || ''}
            />
            
            {
                JSON.parse(product.images).map((img: Image, index: number) => (
                    <div key={index} className='image-container'>
                        <FormInput
                            handleChange={handleChange}
                            label="Image name"
                            name="name"
                            placeholder="Image name"
                            defaultValue={img.name || ''}
                            index={index}
                        />
                        <FormInput
                            handleChange={handleChange}
                            label="Image url"
                            name="url"
                            placeholder="Image url"
                            defaultValue={img.url || ''}
                            index={index}
                        />
                    </div> 
                ))
            }
            <div className='d-flex justify-content-end'>
                <button 
                    className="add-button btn btn-secondary"
                    onClick={e => addNewImage(e)}
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
);

interface ProductFormProps {
    handleChange(event: React.FormEvent<HTMLInputElement>, index?: number): void;
    handleSubmit(event: React.FormEvent<HTMLFormElement>): void;
    addNewImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
    product: Product;
}

interface Image {url: string, name: string}

export default ProductForm;