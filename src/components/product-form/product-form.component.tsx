import React from 'react';
import FormInput from "../../components/form-input/form-input.component";
import Product from '../../interfaces/Product.interface';
import './product-form.component.scss';

const ProductForm: React.FunctionComponent<ProductFormProps> = ({handleChange, handleSubmit, addNewImage, removeImage, product}) => (
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
                    <div key={index} className='image-container card pl-2 pr-2 pb-2 mb-2'>
                        <div className='w-100'>
                            <button className="remove-button" onClick={e => removeImage(e, index)}>x</button>
                        </div>
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
    removeImage(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number): void;
    product: Product;
}

interface Image {url: string, name: string}

export default ProductForm;