import React from 'react';
import styles from './styles.scss';

const DetailsContainer = props => (
  <div className={`${styles.detailsContainer} ${props.className ? props.className : ''}`}>
    {props.children}
  </div>
);

export default DetailsContainer;
