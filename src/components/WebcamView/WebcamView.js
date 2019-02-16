import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class WebcamView extends Component {
  constructor(props) {
    super(props);
    this.view = createRef();
    this.cameraView = window.WebCam.getCameraNode();
    this.lastActiveSource = '';
  }

  componentDidMount() {
    this.view.current.appendChild(this.cameraView);
  }

  componentDidUpdate() {
    const { activeSource } = this.props;

    if (activeSource === this.lastActiveSource) {
      return;
    }

    window.WebCam.setSource(activeSource);
    this.lastActiveSource = activeSource;
  }

  render() {
    return (
      <div ref={this.view} />
    );
  }
}

WebcamView.defaultProps = {
  activeSource: '',
};

WebcamView.propTypes = {
  activeSource: PropTypes.string,
};

export default WebcamView;
