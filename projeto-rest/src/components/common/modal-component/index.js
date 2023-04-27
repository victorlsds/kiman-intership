import React from 'react';
import { Modal } from 'components/common/modal';
// import DetailsItem from 'components/common/details/details-item';
// import { Button } from 'components/common/button';

const CustomModal = ({ customKey, customVisible, customTitle, custonOnCancel, customWidth, children }) => {
    const modalProps = {
        key: customKey,
        visible: customVisible,
        title: customTitle,
        mask: true,
        width: customWidth,
        maskClosable: true,
        footer: null,
        closable: true,
        onCancel: custonOnCancel,
    };

    return (
        <Modal {...modalProps}>{children}</Modal>
    );
};

export default CustomModal;
