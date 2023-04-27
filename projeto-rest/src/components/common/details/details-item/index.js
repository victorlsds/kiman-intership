import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.scss';

const DetailsItem = props => {
  const detailsItemStyle = {
    textAlign: 'center'
  };

  const textAlignClass = () => {
    switch (props.textAlign) {
      case 'center':
        return styles.textAlignCenter;
        break;

      case 'left':
        return styles.textAlignLeft;
        break;

      case 'right':
        return styles.textAlignRight;
        break;

      default:
        break;
    }
  };

  return (
    <div className={props.blockItem ? styles.detailsItemBlock : styles.detailsItem}>
      <div className={`${styles.detailsItemLabel} ${textAlignClass()} ${props.className}`}>{props.label}</div>
      <div className={`${styles.detailsItemValue} ${textAlignClass()} ${props.className}`}>{props.value}</div>
    </div>
  );
};

DetailsItem.Proptypes = {
  textAlign: PropTypes.oneOf(['center', 'left', 'right'])
};

export default DetailsItem;
