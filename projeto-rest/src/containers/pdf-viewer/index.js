import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'components/common/button';
import { Icon } from 'components/common/icon';
import { Modal } from 'components/common/modal';
import { PDFViewer } from 'components/common/pdf-viewer';
import { Grid, Row, Col } from 'react-flexbox-grid';
import PDF from 'react-pdf-js';
import { hidePdf } from '_redux/modules/pdfviewer';
import { store } from '_redux/store';
import { downloadfile } from 'services/utils';

class PdfViewer extends Component {
    state = {};

    componentWillUnmount = () => {
        store.dispatch(hidePdf());
    }

    closeModal = () => {
        store.dispatch(hidePdf());
    }

    downloadPdf = () => {
        downloadfile(this.props.pdfviewer.pdf.data, this.props.pdfviewer.pdf.filename);
    }

    onDocumentComplete = (pages) => {
        this.setState({ page: 1, pages });
    }

    handlePrevious = () => {
        this.setState({ page: this.state.page - 1 });
    }

    handleNext = () => {
        this.setState({ page: this.state.page + 1 });
    }

    renderMenuPdfViewer = (page, pages, pdf) => {
        let previousButton = <Button onClick={this.handlePrevious} title="Pagina anterior"><Icon type="left-circle" /></Button>;
        if (page === 1) {
            previousButton = <Button title="Pagina anterior" disabled><Icon type="left-circle" theme="filled" /></Button>;
        }

        let nextButton = <Button onClick={this.handleNext} title="Proxima pagina"><Icon type="right-circle" /></Button>;
        if (page === pages) {
            nextButton = <Button title="Proxima pagina" disabled><Icon type="right-circle" /></Button>;
        }

        return (
            <Grid fluid style={{ width: '100%' }}>
                <Row>
                    <Col lg={2}>
                        {previousButton}
                        {nextButton}
                    </Col>
                    <Col lg={9}></Col>
                    <Col lg={1}>
                        { pdf ? <Button onClick={this.downloadPdf} title="Baixar relatório" type="primary"><Icon type="download" /></Button> : null}
                    </Col>
                </Row>
            </Grid>
        );
    }

    render() {
        let menuPdfViewer = null;
        if (this.state.pages) {
            menuPdfViewer = this.renderMenuPdfViewer(this.state.page, this.state.pages, this.props.pdfviewer.pdf);
        }

        let url = this.props.pdfviewer.pdf ? URL.createObjectURL(this.props.pdfviewer.pdf.data) : '';

        return (
            <div key={'pdfviewer_' + (this.props.pdfviewer.pdf ? this.props.pdfviewer.pdf.filename : '')}>
                <Modal
                    visible={this.props.pdfviewer.visible}
                    title={'Prévia do relatório'}
                    mask
                    footer={null}
                    width='92%'
                    maskClosable
                    closable
                    wrapClassName="vertical-center-modal"
                    zIndex={2000}
                    onCancel={this.closeModal}
                >
                    {menuPdfViewer}
                    <PDF
                        file={url}
                        onDocumentComplete={this.onDocumentComplete}
                        page={this.state.page}
                    />
                    {menuPdfViewer}
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pdfviewer: state.pdfviewer
    };
};

const mapDispatchToProps = {
    hidePdf
};

export default connect(mapStateToProps, mapDispatchToProps)(PdfViewer);
