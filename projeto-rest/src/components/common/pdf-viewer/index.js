import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
// import { Document, Page } from 'react-pdf'

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true
};


class PDFViewer extends Component {
  state = {
    file: '',
    numPages: null
  }

  componentWillMount() {
    this.setState({ file: this.props.pdf });
  }

  onFileChange = event => {
    this.setState({
      file: event.target.files[0]
    });
  }

  onDocumentLoadSuccess = ({ numPages }) =>
    this.setState({
      numPages
    })

  render() {
    const { file, numPages } = this.state;

    return (
      <Document
        file={{ data: file }}
        onLoadSuccess={this.onDocumentLoadSuccess}
        options={options}
      >
        {
          Array.from(
            new Array(numPages),
            (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
              />
            )
          )
        }
      </Document>
    );
  }
}

export { PDFViewer };
