import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'components/common/dropdown';
import { FontAwesomeIcon } from 'components/common/font-awesome-icon';
import history from 'utils/history';
import styles from './styles.scss';

const { SubMenu } = Menu;

const ContextMenu = ({ state, collapsed, location, menuItems, data, certificado, removeCertificados, setaItemMenu }) => {
  const statusClass = location.pathname === '/atendimento/busca' ? 'is-blocked' : '';  // quando unificar os modulos, isso deve ser modificado

  let selectedContext = null;
  let selectedKey = null;
  menuItems.map((menu, indexMenu) => {
    const dataContext = data[menu.context];
    if (dataContext) {
      dataContext.forEach((item, index) => {
        if (location.pathname.includes(item.to)) {
          selectedKey = index + '';
          selectedContext = menu.context;
        }
      });
    }
  });

  const createItemMenu = (item, indexItem, menu, indexMenu, removeCertificados) => {
    let itemTo = item.to;
    if (item.needArgument) {
      itemTo = itemTo
        + `${'/atendimento/detalhes' === item.to ? '/' + certificado.codPessoa + '/' + certificado.numDocumento : ''}`
        + `/${certificado ? certificado.codCertificado : ''}`;
    }
    return <Menu.Item
      key={`KEY_MENU_` + menu.context + `_ITEM_` + indexItem + item.label}
      disabled={item.needArgument && !certificado.codCertificado}
      className={
        (item.needArgument && certificado.codCertificado) ? (
          selectedContext == menu.context && selectedKey == indexItem
            ? styles.layoutMenuItemSelected : styles.layoutMenuItem
        ) : null
      }
      onClick={() => {
        if(setaItemMenu){
          setaItemMenu(menu, item);
        }
        if (item.resetArgument) {
          removeCertificados();
        }
        history.push(itemTo);
      }}
      // o antd esta disparando um erro por não ter essa propriedade definida, coloquei isso apenas para evitar sujar o log
      onItemHover={() => { }}
    >
      <FontAwesomeIcon icon={item.iconType} className={styles.layoutMenuItemSvg} />
      <span className="nav-text">{item.label}</span>
    </Menu.Item>;
  }

  const createSubMenu = (menu, indexMenu, contextData, removeCertificados) => {
    return menu.isActive ?
      <SubMenu
        key={`KEY_MENU_` + menu.context}
        disabled={!menu.clickable}
        title={<span><FontAwesomeIcon icon={menu.iconType} className={styles.layoutSubMenuSvg} /><span>{!collapsed ? menu.label : null}</span></span>}
      >
        {
          menu.clickable && contextData ?
            contextData.map((item, indexItem) => {
              return createItemMenu(item, indexItem, menu, indexMenu, removeCertificados);
            })
            : null
        }
      </SubMenu>
      : null
  }

  return (
    <Menu
      className={collapsed ? styles.layoutMenu : styles.layoutMenuOverflow}
      mode="inline"
      selectedKeys={[selectedKey]}
      defaultOpenKeys={['KEY_MENU_' + selectedContext]}
    >
      {
        menuItems.map((menu, indexMenu) => {
          if ((!ATENDIMENTO && !RELATORIO && !USUARIO)
            || (menu.context == 'atendimento' && ATENDIMENTO)
            || (menu.context == 'relatorio_gerencial' && RELATORIO)
            || (menu.context == 'usuario' && USUARIO)) {
            const contextData = data[menu.context];
            return createSubMenu(menu, indexMenu, contextData, removeCertificados);
          } else {
            return null;
          }
        })
      }
    </Menu>
  );
};

ContextMenu.propTypes = {
  location: PropTypes.object.isRequired
};

export default ContextMenu;
