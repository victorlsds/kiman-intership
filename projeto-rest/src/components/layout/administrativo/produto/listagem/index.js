import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import { Button } from 'components/common/button';
import DetailsItem from 'components/common/details/details-item';
import { Icon } from 'components/common/icon';
import CustomModal from 'components/common/modal-component';
import TableOfContents from 'components/common/table-of-contents';
import CustomContent from 'components/common/custom-content';

const ProdutoListagemLayout = ({
  produtos,
  produtoCriar,
  defineDescricaoProdutoCriar,
  criarProduto,
  toogleModalRemove,
  removerProduto,
  carregarProduto,
  modalRemoveVisible,
}) => {
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Descricao',
      dataIndex: 'descricao',
      key: 'descricao',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.descricao.localeCompare(b.descricao)
    },
    {
      title: '',
      key: 'actionEdit',
      render: (text, record) => (
        <div className="action-buttons">
          <span>
            <Link to={`/administrativo/produto/${record.id}`}>
              <Button onClick={() => carregarProduto(record.id)}>
                <Icon type="edit" />
              </Button>
            </Link>
          </span>
        </div>
      )
    },
    {
      title: '',
      key: 'actionRemove',
      render: (text, record) => (
        <div className="action-buttons">
          <span>
            <Button onClick={() => toogleModalRemove(record)}>
              <Icon type="delete" />
            </Button>
          </span>
        </div>
      )
    }
  ];

  const data = produtos.map(produto => ({
    key: `KEY_PRODUCT_${produto.id}`,
    id: produto.id,
    descricao: produto.descricao,
    actionEdit: () => carregarProduto(produto.id),
    actionRemove: () => toogleModalRemove(produto)
  }));

  return (
    <div className={styles.aportes}>
      <CustomContent
        CustomTitle={"Produto"}
        inputLabel={"Descrição"}
        inputPlaceholder={"Descrição do produto"}
        obj={produtoCriar}
        value={produtoCriar.descricao}
        funcOnChange={defineDescricaoProdutoCriar}
        funcSave={criarProduto}
      />
      <TableOfContents columns={columns} data={data} />
      <CustomModal
        customKey={`KEY_MODAL_REMOVE_${modalRemoveVisible}`}
        customVisible={modalRemoveVisible}
        customTitle="Confirmação"
        customWidth={375}
        custonOnCancel={() => toogleModalRemove()}
      >
        <DetailsItem label="Voce realmente quer remover esse produto?" />
        <Button onClick={() => removerProduto()}>Sim</Button>
        <Button onClick={() => toogleModalRemove()}>Não</Button>
      </CustomModal>
    </div>
  );
};

export default ProdutoListagemLayout;
