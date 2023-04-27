import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ClienteListagemLayout from 'layout/administrativo/cliente/listagem';
import { carregarClientes, carregarCliente, criarCliente, removerCliente, carregarClienteLista } from '_redux/modules/administrativo/cliente';
import history from 'utils/history';
import { CLIENTE_EDIT } from 'utils/URLS';
import ListaPrecoContainer from 'containers/administrativo/lista-preco';

class ClienteListagem extends Component {

  state = {
    clienteCriar: {},
    modalRemoveVisible: false,
    modalListaPrecoVisible: false
  }

  componentDidMount() {
    this.props.carregarClientes();
  }

  componentWillUnmount = () => {
    this.props.carregarClienteLista();
    this.setState({ clienteCriar: {} });
  }

  defineDescricaoClienteCriar = (nome) => {
    this.setState({ clienteCriar: { nome: nome } });
  }

  criarCliente = () => {
    this.props.criarCliente(this.state.clienteCriar);
    this.defineDescricaoClienteCriar(null);
  }

  toogleModalRemove = (clienteParam = {}) => {
    const cliente = this.state.modalRemoveVisible ? {} : clienteParam;
    this.setState((state) => ({
        clienteCriar: cliente,
        modalRemoveVisible : !state.modalRemoveVisible
    }));
}

toogleModalListaPreco = () => {
  this.setState((state) => ({
      modalListaPrecoVisible: !state.modalListaPrecoVisible
  }));
}

  removerCliente = () => {
    this.props.removerCliente(this.state.clienteCriar.id);
    this.toogleModalRemove();
  }

  carregarCliente = (id) => {
    this.props.carregarCliente(id);
    history.push(CLIENTE_EDIT(id));
  }

  carregarListaPreco = id => {
    this.props.carregarClienteLista(id);
    this.toogleModalListaPreco();
  }

  render() {
    return (
      <Fragment>
        <ClienteListagemLayout
          {...this.props}
          {...this.state}
          defineDescricaoClienteCriar={this.defineDescricaoClienteCriar}
          criarCliente={this.criarCliente}
          toogleModalRemove={this.toogleModalRemove}
          removerCliente={this.removerCliente}
          carregarCliente={this.carregarCliente}
          carregarListaPreco={this.carregarListaPreco}
        />
        <ListaPrecoContainer
          {...this.props}
          modalVisible={this.state.modalListaPrecoVisible}
          toogleModal={this.toogleModalListaPreco}
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { cliente: { clientes, cliente } } = state.administrativo;
  return {
    clientes,
    clienteModal: cliente
  };
};

const mapDispatchToProps = {
  carregarClientes,
  carregarCliente,
  criarCliente,
  removerCliente,
  carregarClienteLista
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteListagem);