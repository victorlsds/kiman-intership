import React, { Component } from 'react';

class Page extends Component {
  state = {
    status: 'N/A',
    page: null,
    width: 0,
    height: 0
  };

  componentDidMount() {
    const { pdf } = this.props;
    this._update(pdf);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.pdf !== nextProps.pdf || this.state.status !== nextState.status;
  }

  componentDidUpdate(nextProps) {
    this._update(nextProps.pdf);
  }

  setCanvasRef = canvas => {
    this.canvas = canvas;
  };

  _update = pdf => {
    if (pdf) {
      this._loadPage(pdf);
    }
  };

  _loadPage(pdf) {
    if (this.state.status === 'rendering' || this.state.page !== null) return;

    pdf.getPage(this.props.index).then(page => {
      this.setState({ status: 'rendering' });
      this._renderPage(page);
    });
  }

  _renderPage(page) {
    const { scale } = this.props;
    const viewport = page.getViewport(scale);
    const { width, height } = viewport;
    const canvas = this.canvas;
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    page.render({
      canvasContext: context,
      viewport
    });

    this.setState({
      status: 'rendered', page, width, height
    });
  }

  render() {
    const { width, height, status } = this.state;

    return (
      <div className={`pdf-page ${status}`} style={{ width, height }}>
        <canvas ref={this.setCanvasRef} />
      </div>
    );
  }
}

export { Page };
