import React from 'react';
import { Button } from '../button';

const ButtonDownload = props => {

  const {
    data,
    label,
    className,
    mimeType,
    icon,
    type,
    shape,
    size,
    style
  } = { ...props };

  const onClick = (evt) => {
    /*
      Essa variavel 'evt' contem o evento de clicar no botão, ao acicionar o 'evt.target', 
      voce tem acesso ao botão que disparou o evento.
    */
    data(evt)
      .then(response =>
        response.data
      )
      .then(myBlob => {
        const reader = new FileReader();
        reader.readAsDataURL(myBlob);
        reader.onloadend = () => {
          const base64data = reader.result.replace('data:application/pdf;base64,', '');
          const objectURL = URL.createObjectURL(myBlob);
          window.open(objectURL, '_blank');
        };
      }).catch(error => { });
  };
  return (
    <Button
      type={type}
      onClick={(evt) => onClick(evt)}
      className={className}
      title={props.title}
      icon={icon}
      shape={shape}
      size={size}
      style={style}
    >
      {props.children ? props.children : label}
    </Button>
  );

};

export default ButtonDownload;