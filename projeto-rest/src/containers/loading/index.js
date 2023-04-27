import React, { Component } from 'react';
import { Spin } from 'components/common/spin';
import { Icon } from 'components/common/icon';
import { Modal } from 'components/common/modal';
import { connect } from 'react-redux';

class Loading extends Component {

    render() {
        const antIcon = <Icon type="loading" style={{ fontSize: 40 }} spin closable="false" />;
        return (
            <Modal
                visible={this.props.visible}
                footer={null}
                width="130px"
                closable={false}
                wrapClassName="vertical-center-modal"
                zIndex={2000}
            >
                <Spin tip="Carregando" indicator={antIcon}></Spin>
            </Modal>
        )
    }
}

const mapStateToProps = state => {
    return {
        visible: state.loading.visible
    };
};

export default connect(mapStateToProps)(Loading);