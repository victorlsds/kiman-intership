import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProdutoListagemLayout from 'layout/administrativo/produto/listagem';
import { carregarProdutos, carregarProduto, criarProduto, removerProduto } from '_redux/modules/administrativo/produto';
import history from 'utils/history';
import { PRODUTO_EDIT } from 'utils/URLS';

class ProdutoListagem extends Component {
  state = {
    produtoCriar: {},
    produtoRemover: {},
    modalRemoveVisible: false
  };

  componentDidMount() {
    this.props.carregarProdutos();
  }

  defineDescricaoProdutoCriar = (descricao) => {
    this.setState({ produtoCriar: { descricao } });
  };

  criarProduto = () => {
    this.props.criarProduto(this.state.produtoCriar);
    this.defineDescricaoProdutoCriar(null);
  };

  toogleModalRemove = (produtoRemover = {}) => {
    this.setState(({ modalRemoveVisible }) => ({
      modalRemoveVisible: !modalRemoveVisible,
      produtoRemover: modalRemoveVisible ? {} : produtoRemover,
    }));
  };

  removerProduto = () => {
    this.props.removerProduto(this.state.produtoRemover.id);
    this.toogleModalRemove();
  };

  carregarProduto = (id) => {
    this.props.carregarProduto(id);
    history.push(PRODUTO_EDIT(id));
  };

  render() {
    const { produtos } = this.props;
    const { produtoCriar, produtoRemover, modalRemoveVisible } = this.state;
    return (
      <ProdutoListagemLayout
        produtos={produtos}
        produtoCriar={produtoCriar}
        produtoRemover={produtoRemover}
        modalRemoveVisible={modalRemoveVisible}
        defineDescricaoProdutoCriar={this.defineDescricaoProdutoCriar}
        criarProduto={this.criarProduto}
        toogleModalRemove={this.toogleModalRemove}
        removerProduto={this.removerProduto}
        carregarProduto={this.carregarProduto}
      />
    );
  }
}

const mapStateToProps = ({ administrativo: { produto: { produtos } } }) => ({ produtos });
const mapDispatchToProps = { carregarProdutos, carregarProduto, criarProduto, removerProduto };

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoListagem);
