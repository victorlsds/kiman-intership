import React from 'react';
import styles from './styles.scss';
import { Link } from 'react-router-dom';

import logo from 'img/logo.png';
import logoCollapsed from 'img/logo-collapsed.png';

const Logo = props => {
  return (
    <Link to={`home`}>
      <div key={"KEY_LOGO_" + props.collapsed}>
        <div className={`${styles.logoCliente} ${styles.logo}`}>
          <img
            className={props.collapsed ? styles.logoCollapsed : styles.logo}
            src={props.collapsed ? logoCollapsed : logo}
            alt="Logo" />
        </div>
      </div>
    </Link>
  );
};

export default Logo;
