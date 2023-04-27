import React from 'react';
import styles from './styles.scss';
import { PRODUTO } from 'utils/URLS';
import CustomContent from 'components/common/custom-content';

const ProdutoEditarLayout = props => {
  const {
    produto, defineDescricaoProduto, salvarProduto
  } = { ...props };

  return (
    <div className={styles.aportes}>
      <CustomContent 
        CustomTitle={"Produto"}
        labelTitle={"Id: "} 
        labelContent={produto.id}
        inputLabel={"Descrição"} 
        inputPlaceholder={"Descrição do produto"} 
        obj={produto} 
        value={produto.descricao} 
        funcOnChange={defineDescricaoProduto} 
        funcSave={salvarProduto}
        link={PRODUTO}
      />
    </div>
  );};

export default ProdutoEditarLayout;
