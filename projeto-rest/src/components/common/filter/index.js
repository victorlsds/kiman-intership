import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid';
import { Button } from 'components/common/button';
import { Select, Option } from 'components/common/select';
import { Icon } from 'components/common/icon';

import form from '../form/styles.scss';
import styles from './styles.scss';

const ORDENACAO_UP = "UP";
const ORDENACAO_DOWN = "DOWN";

const Filter = ({ certificadosStatus, certificadosStatusSelecionado, selecaoCertificadoStatus, certificadosStatusOrdenacao, selecaoOrdenacao }) => (
  <div className={styles.filterContainer}>
    <Row className={styles.row}>
      <Col xs={1} className={styles.col}>
        <label forhtml="searchType" className={`${form.selectLabel} ${styles.selectLabel}`}>{'Exibir:'}</label>
      </Col>
      <Col xs={3} className={styles.col}>
        <Select
          value={certificadosStatusSelecionado}
          className={form.select} defaultValue={'Todos'}
          onSelect={selecaoCertificadoStatus}>
          <Option key={'Todos'} value={''}>{'Todos'}</Option>
          {certificadosStatus.map(cs => (<Option value={cs.codStatus}>{cs.descricaoStatus}</Option>))}
        </Select>
      </Col>
      <Col xs={2} className={styles.col}>
        <label forhtml="searchType" className={`${form.selectLabel} ${styles.selectLabel}`}>{'Ordenar:'}</label>
        <Icon 
          className={certificadosStatusOrdenacao && certificadosStatusOrdenacao == ORDENACAO_UP ? styles.iconSelected : styles.iconDiselected}
          type="up-circle"
          onClick={() => selecaoOrdenacao(certificadosStatusOrdenacao == ORDENACAO_UP ? '' : ORDENACAO_UP)} title="Ordenação ascendente" />
        <Icon 
          className={certificadosStatusOrdenacao && certificadosStatusOrdenacao == ORDENACAO_DOWN ? styles.iconSelected : styles.iconDiselected}
          type="down-circle"
          onClick={() => selecaoOrdenacao(certificadosStatusOrdenacao == ORDENACAO_DOWN ? '' : ORDENACAO_DOWN)} title="Ordenação descendente" />
      </Col>
    </Row>
  </div>
);

export default Filter;
