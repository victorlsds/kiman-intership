import React from 'react';
import DetailsItem from 'components/common/details/details-item';
import { Input } from 'components/common/input';

const InputForm = props => {
  const {
    label,
    value,
    valueDefault = '',
    placeholder,
    action,
  } = { ...props };

  return (
    <div>
      <label>{label}</label>
      <Input placeholder={placeholder}
        value={value ? value : valueDefault}
        onChange={action} />
    </div>
  );

};

export default InputForm;