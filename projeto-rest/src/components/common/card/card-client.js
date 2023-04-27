import React, { PureComponent } from 'react';
import styles from './card-client.scss';
import { Link } from 'react-router-dom';
import typography from '../../../sass/global/typography.scss';

import { Icon } from 'components/common/icon';
import { cpfMask, dateMask } from 'utils/mask';

import { Col } from 'react-flexbox-grid';

export default class CardClient extends PureComponent {
  render() {
    const {
      tipoCertificado, nome, numDocumento, dataNascimento,
      codCertificado, codPessoa, descricaoStatus, tipoProduto,
      inicioVigencia, codSubCategoriaProduto, descricaoCategoriaProduto,
      descricaoProduto, nomeCorretorPrincipal, dataFimDiferimento,
      descricaoSubStatus, codCorretorPrincipal, numProposta,
      tipoCertificadoEmpresarial, codStatus, fimVigencia, dataEmissao
    } = this.props.certificado;

    const cardIcon = tipoProduto && tipoProduto === 'INDIVIDUAL' ? 'user' : 'team';
    const type = tipoProduto === 'INDIVIDUAL' ? tipoCertificado : `${tipoProduto} - ${tipoCertificadoEmpresarial}`;

    return this.props.certificadosStatusSelecionado && this.props.certificadosStatusSelecionado != codStatus ? null : (
      <Col xs={12} sm={12} md={6} key={codCertificado}>
        <div className={styles.cardClientContainer}>
          <div className={styles.cardIcon}><Icon type={cardIcon} /></div>
          <div className={styles.cardClient}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardHeaderTitle}>{nome}</h3>
              <div className={styles.cardHeaderInfo}>
                <span className={typography.textBold}>CPF: {cpfMask(numDocumento)}</span>
                <span className={typography.textBold}>{dateMask(dataNascimento)}</span>
              </div>
            </div>
            <div className={styles.cardRow}>
              <span>Certificado: {codCertificado}</span>
              <span className={`${typography.textBlue} ${typography.textBold}`}>Tipo: {type}</span>
            </div>
            <div className={`${styles.cardRow} ${styles.cardRowSpaceBetween}`}>
              <span className={styles.cardRowItem}>{codSubCategoriaProduto} - {descricaoCategoriaProduto}</span>
              <span className={styles.cardRowItem}>{descricaoProduto}</span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardRowItem}>
                <span className={styles.cardRowItem}>Proposta: {numProposta}</span>
              </span>
              <span className={styles.cardRowItem}>
                <span
                  className={`${typography.textGreen} ${typography.textBold}`}
                >
                  {descricaoStatus}:
              </span> {descricaoSubStatus}
              </span>
            </div>
            <div className={styles.cardRow}>
              <span className={styles.cardRowItem}>Início da Vigência: {dateMask(inicioVigencia)}</span>
              {
                fimVigencia ?
                  <span className={styles.cardRowItem}>Fim da Vigência: {dateMask(fimVigencia)}</span>
                  :
                  <span className={styles.cardRowItem}>Data Prevista de Aposentadoria: {dateMask(dataFimDiferimento)}</span>
              }
              <span className={styles.cardRowItem}>
                Corretor Principal: {codCorretorPrincipal} - {nomeCorretorPrincipal}
              </span>
              <span className={styles.cardRowItem}>Data Emissão: {dateMask(dataEmissao)}</span>
            </div>

            <Link
              onClick={() => this.props.changeCertificado(this.props.certificado)}
              to={`detalhes/${codPessoa}/${numDocumento}/${codCertificado}`}
              className={styles.cardLink}
            >Ver Detalhes
          </Link>
          </div>
        </div>
      </Col>
    );
  }
}
