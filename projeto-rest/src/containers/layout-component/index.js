import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Link, Switch, Redirect } from 'react-router-dom';

import { Icon } from 'components/common/icon';
import { Layout } from 'components/common/layout';
import Breadcrumb from 'components/common/breadcrumb';

import PrivateRoute from 'components/layout/private-route';
import SideBar from 'components/layout/side-bar';

import Message from '../message';
import Loading from '../loading';
import PdfViewer from '../pdf-viewer';

import styles from './styles.scss';

import { RELATORIO_GERENCIAL, RELATORIO_GERENCIAL_DETALHE, CONSULTA_USUARIO, CADASTRO_USUARIO } from 'utils/URLS'

const { Header, Sider, Content } = Layout;

class LayoutComponent extends PureComponent {

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
    const {
      logout, authenticated, location, certificado, topContent, content
    } = this.props;

    return (
        <Layout className={styles.layout}>
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
            certificado={certificado}
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
        </Layout>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutComponent);
