import React from 'react';
import { FormInputBoxContainer, FormLabel, FormDescription } from './styles';

const FormInputBox = (props) => {

  const {
    title,
    description,
    name,
    type,
    value,
    defaultValue,
    placeholder,
    required,
    onChange
  } = props

  return (
    <FormInputBoxContainer>
      <FormLabel htmlFor={title}>{title}{required && '*'}</FormLabel>
      {type === 'text-area' ? (
        <textarea 
          name={name}
          id={title}
          type={type}
          value={value} 
          placeholder={placeholder} 
          required={required}
          autoComplete={'off'}
          onChange={onChange}
        >
          {value}
        </textarea>
      ) : (
        <input 
          name={name}
          id={title}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder} 
          required={required}
          autoComplete={'off'}
          onChange={onChange}
        />
      )}
      {description && (
        <FormDescription>{description}</FormDescription>
      )}
    </FormInputBoxContainer>
  )
}

export default FormInputBox;
