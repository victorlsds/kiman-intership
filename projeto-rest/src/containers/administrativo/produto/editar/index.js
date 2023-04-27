import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProdutoEditarLayout from 'layout/administrativo/produto/editar';
import { salvarProduto } from '_redux/modules/administrativo/produto';

class ProdutoEditar extends Component {

  state = {
    produtoEditar: {}
  }

  componentWillReceiveProps(props) {
    this.setState({ produtoEditar: props.produto });
  }

  defineDescricaoProduto = (descricao) => {
    let produtoEditar = this.state.produtoEditar;
    produtoEditar.descricao = descricao;
    this.setState({ produtoEditar });
  }

  salvarProduto = () => {
    this.props.salvarProduto(this.state.produtoEditar.id, { descricao: this.state.produtoEditar.descricao });
    this.defineDescricaoProduto(null);
  }

  render() {
    return (
      <ProdutoEditarLayout
        {...this.props}
        {...this.state}
        defineDescricaoProduto={this.defineDescricaoProduto}
        salvarProduto={this.salvarProduto}
      />
    );
  }
}

const mapStateToProps = state => {
  const { produto } = state.administrativo;
  return {
    produto: produto.produto
  };
};

const mapDispatchToProps = {
  salvarProduto
};

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoEditar);
