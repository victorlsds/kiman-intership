import React, { Fragment } from 'react';
import { Button } from 'components/common/button';
import { Grid } from 'react-flexbox-grid';
import DetailsRow from 'components/common/details/details-row';
import { Input } from 'components/common/input';
import DetailsItem from 'components/common/details/details-item';
import { DatePicker } from 'components/common/date-picker';

const IndexPedido = props => {
    const { handleChange, filtrarPedidos } = { ...props };
    const changeData = (campo, value) => {
        handleChange({ target: { name: campo, value } });
    }
    return (
        <Fragment>
            <DetailsRow>
                <DetailsItem label={"Filtrar pedidos: "} />
                <DetailsRow>
                    <DetailsItem label={"Insira o id do cliente "} />
                    <Input placeholder={"Id"} onChange={handleChange} name="idCliente" />
                    <Grid fluid style={{ width: '100%' }}>
                        <DetailsItem label={"Insira a data do pedido "} />
                        <DatePicker placeholder={"Data do pedido"} name="dataDePedido" onChange={(date, dateString) => changeData('dataDePedido', dateString)} />
                    </Grid>
                    <Grid fluid style={{ width: '100%' }}>
                        <DetailsItem label={"Insira a data de entrega"} />
                        <DatePicker placeholder={"Data de entrega"} name="dataDeEntrega" onChange={(date, dateString) => changeData('dataDeEntrega', dateString)} />
                    </Grid>
                </DetailsRow>
            </DetailsRow>
            <DetailsRow>
                <DetailsRow>
                    <Button onClick={filtrarPedidos}>
                        Filtrar Pedidos
                    </Button>
                </DetailsRow>
            </DetailsRow>
        </Fragment>
    )
}

export default IndexPedido;