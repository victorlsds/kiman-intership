import React, { Fragment } from 'react';
import { Col, Grid, Row } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import { Button } from 'components/common/button';
import DetailsContainer from 'components/common/details/details-container';
import DetailsRow from 'components/common/details/details-row';
import TitleRow from 'components/common/title-row';
import { Input } from 'components/common/input';
import DetailsItem from '../details/details-item';

//SEGUIR COMPOSITE PATTERN ou COMPOUND PATTERN???
export const BackRow = props => {
    const { link } = { ...props }
    return (
        <Fragment>
            {
                link ?
                    <Row between="xs" top="xs">
                        <Col xl={1} lg={1} md={2} sm={3} xs={12}>
                            <br />
                            <Link to={link}>
                                <Button>Voltar</Button>
                            </Link>
                        </Col>
                    </Row> : null
            }
        </Fragment>
    )
}

const RowWithInput = ({ label, placeholder, obj, value, onChange, onSave }) => {
    return (
        <Row between="xs" top="xs">
            <Col xl={11} lg={10} md={10} sm={9} xs={12}>
                <DetailsItem label={label} />
                <Input placeholder={placeholder} value={obj && value ? value : ''} onChange={onChange} />
            </Col>
            <Col xl={1} lg={1} md={2} sm={3} xs={12} style={{ margin: 'auto' }}>
                <Button onClick={onSave}>Salvar</Button>
            </Col>
        </Row>
    );
};

const RowWithLabel = ({ label, content }) => {
    return (
        <Row between="xs" top="xs">
            <Col xl={11} lg={10} md={10} sm={9} xs={12}>
                <label>{label}</label>
                <label>{content}</label>
            </Col>
        </Row>
    );
};

const CustomContent = props => {
    const { CustomTitle } = { ...props };
    return (
        <Fragment>
            <TitleRow title={CustomTitle} colSize={10} border />
            <DetailsContainer>
                <DetailsRow>
                    <Grid fluid style={{ width: '100%' }}>
                        <RowWithLabel label={props.labelTitle} content={props.labelContent} />
                        <RowWithInput
                            label={props.inputLabel}
                            placeholder={props.inputPlaceholder}
                            obj={props.obj}
                            value={props.value}
                            onChange={evt => props.funcOnChange(evt.target.value)}
                            onSave={props.funcSave}
                        />
                        <BackRow {...props} />
                    </Grid>
                </DetailsRow>
            </DetailsContainer>
        </Fragment>
    )
}

export default CustomContent;