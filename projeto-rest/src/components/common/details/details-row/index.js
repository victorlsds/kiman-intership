import React from 'react';
import styles from './styles.scss';

const DetailsRow = props => (
  <div className={`${styles.detailsRow} ${props.border ? styles.detailsRowBorder : ''} ${props.className ? props.className : ''}`}>
    {props.children}
  </div>
);

export default DetailsRow;
