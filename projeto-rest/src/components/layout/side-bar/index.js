import React, { PureComponent } from 'react';
import styles from './styles.scss';

import { Layout } from 'components/common/layout';
import Logo from './components/logo';
import ContextMenu from './components/context-menu';
import { menuItems } from './context-menu-list';
import { data } from './context-menu-data';
import { setaItemMenu } from '_redux/modules/menu';
import { connect } from 'react-redux';

const { Header, Sider, Content } = Layout;

const mouseCollapsedMilliseconds = 666;
const mouseCollapsedMillisecondsDelay = 10;
let mouseCollapsedStore = false;

class SideBar extends PureComponent {
  state = {
    selected: []
  }

  render() {
    const {
      collapsed,
      breakpoint,
      mouseCollapsed,
      toggleBreakpoint,
      toggleCollapsed,
      isUserMenuOpen,
      changeUserMenuOpen } = this.props;
    return (
      <Sider
        // Basic
        className={styles.sider}
        trigger={null}
        width={250}
        // Codigo para fechamento manual
        collapsible
        collapsed={collapsed}
        // Codigo responsivo
        breakpoint={"xs"}
        collapsedWidth={breakpoint ? "0" : "80"}
        onBreakpoint={(breakpoint) => {
          toggleBreakpoint(breakpoint);
        }}
        onCollapse={(collapsed, type) => {
          toggleCollapsed(!this.props.collapsed, false);
        }}
        // onClick={() => collapsed ? toggleCollapsed(false, false) : null}
        // onMouseEnter={() => {
        //   mouseCollapsedStore = new Date().getTime();
        //   if (!breakpoint && collapsed) {
        //     setTimeout(function () {
        //       const atual = new Date().getTime();
        //       if (atual < (mouseCollapsedStore + mouseCollapsedMilliseconds + mouseCollapsedMillisecondsDelay)
        //         && atual > (mouseCollapsedStore + mouseCollapsedMilliseconds - mouseCollapsedMillisecondsDelay)) {
        //         toggleCollapsed(false, true);
        //       }
        //     }, mouseCollapsedMilliseconds);
        //   }
        // }}
        onMouseLeave={() => {
          mouseCollapsedStore = 0;
          if (!breakpoint && !collapsed && mouseCollapsed) {
            toggleCollapsed(true, false);
          }
        }}
      >
        <Logo collapsed={collapsed} />
        <ContextMenu
          state={this.state}
          collapsed={collapsed}
          location={this.props.location}
          menuItems={menuItems}
          data={data}
          setaItemMenu={this.props.setaItemMenu} />
      </Sider>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = {
  setaItemMenu
};

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

