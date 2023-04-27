import React from 'react';
import { Input } from '../input';
import { monetaryMask, adicionarCaracteresEsquerda } from '../../../utils/mask';

const InputNumber = props => {

    const {
      id,
      placeholder,
      value,
      onBlur,
      onChange,
      onClick,
      disabled
    } = { ...props };
    
    const onBlurInComponent = () => {
        if(onBlur){
            onBlur(evt);
        }
    };

    const onChangeInComponent = (evt) => {
        evt.target.value = setValue(evt.target.value);
        evt.target.valueNumber = evt.target.value.replace(/[^0-9,]/g, '').replace(',', '.');
        if(onChange){
            onChange(evt);
        }
    };

    const onClickInComponent = (evt) => {
        if(onClick){
            onClick(evt);
        }
    };

    const setValue = (value) => {
        if(value){
            value = value.replace(/[^0-9]/g, '');
            value = adicionarCaracteresEsquerda(value, 3);
            value = value.substring(0, value.length - 2) + "." + value.substring(value.length - 2, value.length);
            value = Number(value);
        }
        return monetaryMask(value);
    }

    return (
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        value={setValue(value ? Number(value).toFixed(2) : '')}
        onBlur={event => onBlurInComponent(event)}
        onChange={event => onChangeInComponent(event)}
        onClick={event => onClickInComponent(event)}
        disabled={disabled}
        />
    );
  
  };
  
  export default InputNumber;