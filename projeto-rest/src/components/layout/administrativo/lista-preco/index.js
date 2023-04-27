import React, { Fragment } from 'react';
import { Button } from 'components/common/button';
import InputNumber from 'components/common/input-number';
import TableOfContents from 'components/common/table-of-contents';
import CustomModal from 'components/common/modal-component';

const ListaPrecoLayout = props => {
  const { toogleModal, modalVisible, clienteLista, atualizarProduto, enviarLista } = { ...props };
  const { produtos } = { ...clienteLista };
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: '',
      key: 'actionChange',
      render: (text, record) => {
        return (<div className="action-buttons">
          <span>
            <InputNumber value={record.preco}
              onChange={record.actionChange}
              onBlur={record.actionBlur}
            />
          </span>
        </div>)
      }
    }
  ];

  const data = produtos && produtos.map(produto => ({
    key: `KEY_PRODUTO_${produto.id}`,
    id: produto.id,
    descricao: produto.descricao,
    preco: produto.preco,
    actionChange: (valor) => { atualizarProduto({ id: produto.id, descricao: produto.descricao, preco: valor }) },
    actionBlur: () => enviarLista()
  }))

  return (
    <Fragment>
      <CustomModal
        customKey={`KEY_LISTAPRECO_${modalVisible}`}
        customVisible={modalVisible}
        customTitle={"Edição de preços"}
        custonOnCancel={toogleModal}
        customWidth={1000}
      >
        <TableOfContents
          columns={columns} data={data}
        />
        <Button onClick={toogleModal}>Cancelar</Button>
      </CustomModal>
    </Fragment>
  )
}

export default ListaPrecoLayout;