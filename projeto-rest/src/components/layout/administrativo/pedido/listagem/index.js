import React, { Fragment } from 'react';
import styles from './styles.scss';
import DetailsContainer from 'components/common/details/details-container';
import TitleRow from 'components/common/title-row';
import { dateMask, monetaryMask } from 'utils/mask';
import TableOfContents from 'components/common/table-of-contents';
import IndexPedido from './filtro';

const PedidoListagemLayout = props => {
    const { pedidos, selecionarPedido } = { ...props };

    const columns = [
        {
            title: 'Id do Pedido',
            dataIndex: 'id',
            key: 'id',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.id = b.id
        },
        {
            title: 'Id do Cliente',
            dataIndex: 'idCliente',
            key: 'idCliente'
        },
        {
            title: 'Cliente',
            dataIndex: 'cliente',
            key: 'cliente',
            sorter: (a, b) => a.cliente.nome.localeCompare(b.cliente.nome)
            // sorter: (a, b) => a.cliente.nome === b.cliente.nome ? 0 : a.cliente.nome > b.cliente.nome ? 1 : -1
        },
        {
            title: 'Data do Pedido',
            dataIndex: 'dataPedido',
            key: 'dataPedido',
        },
        {
            title: 'Data de Entrega',
            dataIndex: 'dataEntrega',
            key: 'dataEntrega',
        },
        {
            title: 'Valor total',
            dataIndex: 'valorTotal',
            key: 'valorTotal'
        }
        // {
        //     title: 'Itens',
        //     key: 'itens',
        //     render: (text, record) => (
        //         <div className="action-buttons">
        //             <span>
        //                 <Button onClick={record.actionOpen}>
        //                     <Icon type="tag" />
        //                 </Button>
        //             </span>
        //         </div>
        //     )
        // }
    ];

    const data = pedidos && pedidos.map(pedido => ({
        key: `KEY_PEDIDO_${pedido.id}`,
        id: pedido.id,
        idCliente: pedido.cliente.id,
        cliente: pedido.cliente.nome,
        dataPedido: dateMask(pedido.dataPedido),
        dataEntrega: dateMask(pedido.dataEntrega),
        valorTotal: `R$ ${monetaryMask(pedido.valor)}`,
    }));

    return (
        <Fragment>
            <div className={styles.aportes}>
                <TitleRow title={"Pedido"} border />
                <DetailsContainer>
                    <IndexPedido {...props} />
                    <TableOfContents data={data} columns={columns} />
                </DetailsContainer>
            </div>
        </Fragment>
    )
}

export default PedidoListagemLayout;