import React, { Component, Fragment } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Button } from 'components/common/button';
import { Select, Option } from 'components/common/select';
import { Input } from 'components/common/input';
import { Icon } from 'components/common/icon';
import { inputValidate } from 'utils/validate';
import form from '../form/styles.scss';
import styles from './styles.scss';

const InputGroup = Input.Group;
const TODOS = 'Todos';
const SELECIONE_OPCAO = 'Selecione uma opção';
const BUSCAR = 'Buscar';

class SearchForm extends Component {
  state = {
    params: {
      key: SELECIONE_OPCAO,
      value: ''
    },
    validateType: '',
    inputPlacehoder: BUSCAR,
    inputDisabled: true,
    errorMessage: '',
    conta: {
      banco: '',
      agencia: '',
      conta: ''
    },
    codStatus: TODOS
  }

  searchTypeHandler = (value, option) => {
    switch (value) {
      case 'codBanco/codAgencia/numConta':
        this.setState({
          inputPlacehoder: '', validateType: 'number', errorMessage: 'os dados da Conta', inputDisabled: false
        });
        break;
      case 'codCertificado':
        this.setState({
          inputPlacehoder: 'Digite o número do certificado', validateType: 'number', errorMessage: 'o Número do Certificado', inputDisabled: false
        });
        break;
      case 'codSusepCorretor':
        this.setState({
          inputPlacehoder: 'Digite o código do comissionado', validateType: 'text', errorMessage: 'o Código do Comissionado', inputDisabled: false
        });
        break;
      case 'nome':
        this.setState({
          inputPlacehoder: 'Digite o nome do cliente', validateType: 'text', errorMessage: 'o Nome do Cliente', inputDisabled: false
        });
        break;
      case 'numDocumento':
        this.setState({
          inputPlacehoder: 'Digite o número do documento', validateType: 'number', errorMessage: 'o Número do Documento', inputDisabled: false
        });
        break;
      case 'numProposta':
        this.setState({
          inputPlacehoder: 'Digite o número da proposta', validateType: 'number', errorMessage: 'o Número da Proposta', inputDisabled: false
        });
        break;
      default:
        this.setState({ errorMessage: 'Selecione um tipo de Busca' });
        break;
    }
    this.setState({ params: { ...this.state.params, key: value } });
  }

  searchClick = (e) => {
    e && e.target.blur()
    const filtro = this.getFiltro();
    if (filtro) {
      this.props.searchClick(filtro);
    } else {
      this.props.showInfo(`Preencha o filtro corretamente.`);
    }
  }

  getFiltro = () => {
    const { params, conta } = this.state;
    const codStatus = this.state.codStatus === TODOS ? null : this.state.codStatus;
    let filtro = null;
    if (params.key !== 'codBanco/codAgencia/numConta' && params.value) {
      filtro = { [params.key]: params.value, codStatus: codStatus }
    } else if (conta.agencia && conta.banco && conta.conta) {
      filtro = {
        codAgencia: conta.agencia,
        codBanco: conta.banco,
        numConta: conta.conta,
        codStatus: codStatus
      }
    }
    return filtro;
  }

  cleanSearch = () => {
    this.setState({
      params: { key: SELECIONE_OPCAO, value: '' },
      inputPlacehoder: BUSCAR,
      validateType: '',
      errorMessage: '',
      inputDisabled: true,
      codStatus: TODOS
    });
    this.props.cleanSearch();
  }

  onChangeSearchInput = event => {
    if (inputValidate(event.target.value, this.state.validateType) || event.target.value === '') {
      this.setState({ params: { ...this.state.params, value: event.target.value } });
    }
  }

  onChangeConta = (e, campo) => {
    const { value } = e.target;
    if (inputValidate(value, this.state.validateType) || value === '') {
      this.setState(prevState => ({
        conta: {
          ...prevState.conta,
          [campo]: value
        }
      }));
    }
  }

  onSelectStatus = (valor) => {
    this.state.codStatus = valor;
    this.searchClick();
  }

  render() {
    const { etiqueta, mostraFiltroStatus } = this.props;
    const header = etiqueta.header;
    const {
      params, conta, inputPlacehoder, inputDisabled
    } = this.state;
    return (
      <div className={styles.searchContainer}>
        <Row className={styles.row}>
          <Col md={1} sm={12} className={`${styles.colRight} ${styles.labelSelectBuscar}`} >
            <label forhtml="searchType" className={`${form.selectLabel} ${styles.selectLabel} `}>{header ? header.lstTipoBusca.texto : 'Buscar por:'}</label>
          </Col>
          <Col md={3} sm={12} className={styles.col} >
            <Select value={this.state.params.key} className={form.select} onSelect={this.searchTypeHandler}>
              {header ? header.lstTipoBusca.values.map((option, index) => (<Option key={index} value={option.valor}>{option.texto}</Option>)) : null}
            </Select>
          </Col>
          <Col md={5} sm={12} className={styles.col} >
            {
              params.key === 'codBanco/codAgencia/numConta' ?
                <InputGroup size="medium">
                  <Row>
                    <Col xs={3}>
                      <Input
                        value={conta.banco}
                        onChange={e => this.onChangeConta(e, 'banco')}
                        placeholder="Banco"
                      />
                    </Col>
                    <Col xs={4}>
                      <Input
                        value={conta.agencia}
                        onChange={e => this.onChangeConta(e, 'agencia')}
                        placeholder="Agencia"
                      />
                    </Col>
                    <Col xs={5}>
                      <Input
                        value={conta.conta}
                        onChange={e => this.onChangeConta(e, 'conta')}
                        placeholder="Conta"
                      />
                    </Col>
                  </Row>
                </InputGroup>
                :
                <div className={styles.inputContainer}>
                  <Input
                    type="text"
                    placeholder={inputPlacehoder}
                    value={params.value}
                    disabled={inputDisabled}
                    className={styles.borderRounded}
                    onChange={this.onChangeSearchInput}
                    onPressEnter={this.searchClick}
                  />
                  <Icon type="search" />
                </div>
            }
          </Col>
          <Col md={1} sm={12} className={styles.col}>
            <Button
              type="primary"
              className={`${styles.button} ${styles.buttonDefault} `}
              onClick={this.searchClick}
            >
              {header ? header.btnBuscar.texto : BUSCAR}
            </Button>
          </Col>
          <Col md={1} sm={12} className={styles.col}>
            <Button
              type="primary"
              className={`${styles.button} ${styles.buttonSecondary} `}
              onClick={this.cleanSearch}
            >
              Limpar Busca
            </Button>
          </Col>
          {
            etiqueta.filtro_busca && mostraFiltroStatus ?
              <Col md={1} sm={12} className={styles.colRight} >
                <label forhtml="searchType" className={`${form.selectLabel} ${styles.selectLabel}`}>{'Exibir:'}</label>
              </Col>
              : ''}
          {
            etiqueta.filtro_busca && mostraFiltroStatus ?
              <Col md={3} sm={12} className={styles.col} >
                <Select
                  value={this.state.codStatus}
                  className={form.select} defaultValue={TODOS}
                  onSelect={this.onSelectStatus}>
                  <Option key={`STATUS_KEY_${TODOS}`} value={TODOS}>{TODOS}</Option>
                  {etiqueta.filtro_busca.lstFiltroStatus.values.map(
                    v => <Option key={`STATUS_KEY_${v.valor}`} value={v.valor}>{v.texto}</Option>
                  )}
                </Select>
              </Col>
              : ''}
          <Col md={8} sm={12} ></Col>
        </Row>
      </div>
    );
  }
}

export default SearchForm;
