import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import { Button } from 'components/common/button';
import DetailsItem from 'components/common/details/details-item';
import { Icon } from 'components/common/icon';
import CustomContent from 'components/common/custom-content';
import TableOfContents from 'components/common/table-of-contents';
import CustomModal from 'components/common/modal-component';

const ClienteListagemLayout = props => {
  const {
    clientes, clienteCriar, defineDescricaoClienteCriar, criarCliente, toogleModalRemove, removerCliente, carregarCliente, carregarListaPreco, modalListaPrecoVisible
  } = { ...props };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Razão Social',
      dataIndex: 'nome',
      key: 'nome',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.nome - b.nome
    },
    {
      title: 'Editar preços',
      key: 'actionOpen',
      render: (text, record) => (
        <div className="action-buttons">
          <span>
            <Button onClick={record.actionOpen}>
              <Icon type="tag" />
            </Button>
          </span>
        </div>
      )
    },
    {
      title: '',
      key: 'actionEdit',
      render: (text, record) => (
        <div className="action-buttons">
          <span>
            <Link to={`/administrativo/cliente/${record.id}`}>
              <Button onClick={record.actionEdit}>
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
            <Button onClick={record.actionRemove}>
              <Icon type="delete" />
            </Button>
          </span>
        </div>
      )
    }
  ];

  const data = clientes.map(cliente => ({
    key: `KEY_CLIENT_${cliente.id}`,
    id: cliente.id,
    nome: cliente.nome,
    actionEdit: () => carregarCliente(cliente.id),
    actionRemove: () => toogleModalRemove(cliente),
    actionOpen: () => carregarListaPreco(cliente.id)
  }));

  return (
    <div className={styles.aportes}>
      {/* {console.log('nome', modalListaPrecoVisible)} */}
      <CustomContent
        CustomTitle={"Cliente"}
        inputLabel={"Nome"}
        inputPlaceholder={"Nome do cliente"}
        obj={clienteCriar}
        value={clienteCriar.nome}
        funcOnChange={defineDescricaoClienteCriar}
        funcSave={criarCliente}
      />
      <TableOfContents columns={columns} data={data} />
      <CustomModal
        customKey={`KEY_MODAL_REMOVE_${props.modalRemoveVisible}`}
        customVisible={props.modalRemoveVisible}
        customTitle={"Confirmação"}
        customWidth={375}
        custonOnCancel={toogleModalRemove}
      >
        <DetailsItem label="Voce realmente quer remover esse cliente?" />
        <Button onClick={removerCliente}>Sim</Button>
        <Button onClick={toogleModalRemove}>Não</Button>
      </CustomModal>
    </div>
  );
};

export default ClienteListagemLayout;
