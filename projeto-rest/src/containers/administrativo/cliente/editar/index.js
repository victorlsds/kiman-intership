import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClienteEditarLayout from 'layout/administrativo/cliente/editar';
import { salvarCliente } from '_redux/modules/administrativo/cliente';

class ClienteEditar extends Component {

  state = {
    clienteEditar: {}
  }

  componentWillReceiveProps(props) {
    this.setState({ clienteEditar: props.cliente });
  }

  defineDescricaoCliente = (nome) => {
    let clienteEditar = this.state.clienteEditar;
    clienteEditar.nome = nome;
    this.setState({ clienteEditar });
  }

  salvarCliente = () => {
    this.props.salvarCliente(this.state.clienteEditar.id, { nome: this.state.clienteEditar.nome });
    this.defineDescricaoCliente(null);
  }

  render() {
    return (
      <ClienteEditarLayout
        {...this.props}
        {...this.state}
        defineDescricaoCliente={this.defineDescricaoCliente}
        salvarCliente={this.salvarCliente}
      />
    );
  }
}

const mapStateToProps = state => {
  const { cliente } = state.administrativo;
  return {
    cliente: cliente.cliente
  };
};

const mapDispatchToProps = {
  salvarCliente
};

export default connect(mapStateToProps, mapDispatchToProps)(ClienteEditar);
