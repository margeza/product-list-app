import React from 'react';
import './form-input.component.scss'

const FormInput: React.FunctionComponent<FormInputProps> = ({handleChange, label, name, placeholder, defaultValue, index}) => (
    <div className='form-group'>
        <label>{label}:</label>
        <input
            required
            onChange={e => handleChange(e, index)}
            name={name}
            type="text"
            placeholder={placeholder}
            defaultValue={defaultValue}
        />
    </div>
);

interface FormInputProps {
    handleChange(event: React.FormEvent<HTMLInputElement>, index?: number): void;
    label: string;
    name: string;
    placeholder: string;
    defaultValue: string;
    index?: number;
}

export default FormInput;