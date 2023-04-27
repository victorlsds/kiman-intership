import React from 'react';
import styles from './styles.scss';
import DetailsRow from 'components/common/details/details-row';
import DetailsContainer from 'components/common/details/details-container';
import PageTitle from 'components/common/page-title';
import { Col } from 'react-flexbox-grid';

const TitleRow = props => (
  <div>
    <DetailsContainer className={`${styles.titleRow} ${props.border ? styles.titleRowBorder : ''} ${props.className ? props.className : ''}`}>
      <DetailsRow>
        <Col xs={props.colSize}><PageTitle title={props.title} divider={props.divider} /></Col>
        {props.children}
      </DetailsRow>
    </DetailsContainer>
  </div>
);

export default TitleRow;
