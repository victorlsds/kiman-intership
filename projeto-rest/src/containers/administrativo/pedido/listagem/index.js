import React, { Component } from 'react';
import { connect } from 'react-redux';
import PedidoListagemLayout from 'layout/administrativo/pedido/listagem';
import { carregarPedidos } from '_redux/modules/administrativo/pedido';

class PedidoListagem extends Component {
    state = {
        idCliente: '',
        dataPedido: '',
        dataEntrega: '',
        pedido: {},
        modalVisible: false
    }

    toogleModal = () => {
        this.setState(state => ({
            modalVisible: !state.modalVisible
        }))
    }

    selecionarPedido = pedido => {
        this.setState({
            pedido
        });
        this.toogleModal();
    }

    componentDidMount = () => {
        this.props.carregarPedidos();

    }

    filtrarPedidos = () => {
        let params = Object.keys(this.state).reduce((params, campo) => {
            let param = '';
            if (this.state[campo]) {
                param = `${campo}=${this.state[campo]}&`;
            }

            return `${params}${param}`;
        }, '?');
        this.props.carregarPedidos(params);
    }

    handleChange = element => {
        this.setState({
            ...this.state,
            [element.target.name]: element.target.value
        });
    }

    render() {
        console.log(this.props, this.state)
        return (
            <PedidoListagemLayout
                {...this.props}
                {...this.state}
                handleChange={this.handleChange}
                filtrarPedidos={this.filtrarPedidos}
                toogleModal={this.toogleModal}
                selecionarPedido={this.selecionarPedido}
            />
        )
    }
}

const mapStateToProps = state => {
    const { pedido: { pedidos } } = state.administrativo;
    return {
        pedidos
    };
};

const mapDispatchToProps = {
    carregarPedidos
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoListagem);