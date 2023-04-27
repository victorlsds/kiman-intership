import React from 'react';
import styles from './style.scss';
import { CLIENTE } from 'utils/URLS';
import CustomContent from 'components/common/custom-content';

const ClienteEditarLayout = props => {
  const {
    clienteEditar, defineDescricaoCliente, salvarCliente
  } = { ...props };

  return (
    <div className={styles.aportes}>
      <CustomContent
        title={"Cliente"}
        labelTitle={"Id: "}
        labelContent={clienteEditar.id}
        inputLabel={"Nome"}
        inputPlaceholder={"Nome do cliente"}
        obj={clienteEditar}
        value={clienteEditar.nome}
        funcOnChange={defineDescricaoCliente}
        funcSave={salvarCliente}
        link={CLIENTE}
      />
    </div>
  );
};

export default ClienteEditarLayout;
