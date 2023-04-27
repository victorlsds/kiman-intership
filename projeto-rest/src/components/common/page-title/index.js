import React from 'react';
import styles from './styles.scss';
import Divider from 'components/common/divider';

const PageTitle = props => (
  <div className={styles.pageTitle}>
    <h3>{props.title}</h3>
    { props.divider ? <Divider className={styles.divider} /> : null }
  </div>
);

export default PageTitle;
