import React, { PureComponent } from 'react';
import { Switch } from 'react-router-dom';

import HomeComponent from './component';

import styles from './styles.scss';
import PrivateRoute from 'layout/private-route';

import { Icon } from 'components/common/icon';
import { Layout } from 'components/common/layout';

import SideBar from 'components/layout/side-bar';

import Message from '../message';
import Loading from '../loading';
import PdfViewer from '../pdf-viewer';

class HomeRoutes extends PureComponent {
  state = {
    collapsed: false,
    mouseCollapsed: false,
    breakpoint: false,
    isUserMenuOpen: false
  }

  toggleCollapsed = (collapsed, mouseCollapsed) => {
    if (mouseCollapsed && this.state.isUserMenuOpen) {
      // não teremos a função de hover quando o isUserMenuOpen estiver aberto
      return;
    }
    this.setState({
      collapsed: collapsed,
      mouseCollapsed: mouseCollapsed
    });
  }

  toggleBreakpoint = (breakpoint) => {
    this.setState({
      breakpoint: breakpoint
    });
  }

  changeUserMenuOpen = () => {
    this.setState({ isUserMenuOpen: !this.state.isUserMenuOpen });
  }

  render() {
    const { Header, Sider, Content } = Layout;

    const {
      logout, location
    } = this.props;

    const content = <Switch>
      <PrivateRoute exact path="/home" component={HomeComponent} />
    </Switch>;

    return (<Layout className={styles.layout}>
      <Message></Message>
      <Loading></Loading>
      <PdfViewer></PdfViewer>
      <SideBar
        collapsed={this.state.collapsed}
        mouseCollapsed={this.state.mouseCollapsed}
        breakpoint={this.state.breakpoint}
        toggleCollapsed={this.toggleCollapsed}
        toggleBreakpoint={this.toggleBreakpoint}
        logout={logout}
        location={location}
        isUserMenuOpen={this.state.isUserMenuOpen}
        changeUserMenuOpen={this.changeUserMenuOpen} />
      <div
        style={{ left: (this.state.collapsed ? (this.state.breakpoint ? '0px' : '80px') : '250px') }}
        className={styles.trigger}
        onClick={() => this.toggleCollapsed(!this.state.collapsed, false)}
      >
        <div>
          <Icon type={this.state.breakpoint ? (this.state.collapsed ? 'bars' : 'bars') : (this.state.collapsed ? 'menu-unfold' : 'menu-fold')}
          />
        </div>
      </div>
      <Layout>
        <Content
          className={styles.content}
        >
          {content}
        </Content>
      </Layout>
    </Layout>);
  }
}

export default HomeRoutes;
