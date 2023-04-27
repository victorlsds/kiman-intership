import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import { carregarProdutos } from '_redux/modules/administrativo/produto';
import { enviarClienteLista } from '_redux/modules/administrativo/cliente';
import ListaPrecoLayout from 'layout/administrativo/lista-preco';

const ListaPrecoContainer = ({ produtos, carregarProdutos, enviarClienteLista }) => {
  const [clienteLista, setClienteLista] = useState({});

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);



  const atualizarLista = (lista, elemento) => {
    const index = lista.findIndex(el => el.id === elemento.id);
    if (index === -1) {
      return lista;
    }
    const itemAlterado = { ...lista[index], preco: elemento.preco };
    return [...lista.slice(0, index), itemAlterado, ...lista.slice(index + 1)];
  };
  
  const atualizarProduto = (produto) => {
    const novosProdutos = atualizarLista(clienteLista.produtos, produto);
    setClienteLista((prevClienteLista) => ({ ...prevClienteLista, produtos: novosProdutos }));
  };
  

  const enviarLista = () => {
    let cliente = { id: clienteLista.id, nome: clienteLista.nome };
    let produtosPreenchidos = clienteLista.produtos.filter(produto => produto.preco !== 0);
    cliente.produtos = produtosPreenchidos;
    enviarClienteLista(cliente.id, cliente);
  }

  return (
    <ListaPrecoLayout
      clienteLista={clienteLista}
      produtos={produtos}
      atualizarProduto={atualizarProduto}
      enviarLista={enviarLista}
    />
  )
}

const mapStateToProps = state => {
  const { produto: { produtos } } = state.administrativo;
  return {
    produtos
  }
}

const mapDispatchToProps = {
  carregarProdutos,
  enviarClienteLista
}

export default connect(mapStateToProps, mapDispatchToProps)(ListaPrecoContainer);
