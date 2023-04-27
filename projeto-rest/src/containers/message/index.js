import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'components/common/modal';
import { hideMessage, SUCCESS, ERROR } from '_redux/modules/message';

class Message extends Component {

    info = (config) => {
        Modal.info(config);
    }

    success = (config) => {
        Modal.success(config);
    }

    error = (config) => {
        Modal.error(config);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.message.visible) {
            let config = {
                title: nextProps.message.message,
                content: '',
                onOk: nextProps.hideMessage,
            }
            switch (nextProps.message.messageType) {
                case SUCCESS:
                    this.success(config)
                    break;
                case ERROR:
                    this.error(config)
                    break;
                default:
                    this.info(config)
            }
        }
    }

    render() {
        return (
            <div key={'message_' + this.props.message.messageType}></div>
        )
    }
}

const mapStateToProps = state => {
    return {
        message: state.message
    };
};

const mapDispatchToProps = {
    hideMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
