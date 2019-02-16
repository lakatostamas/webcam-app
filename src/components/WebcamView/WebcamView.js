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
    const { activeSource, position, afterPositionChange } = this.props;

    if (Object.keys(position).length) {
      window.WebCam.move(position.x, position.y);
      afterPositionChange();
    }

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
  position: {},
};

WebcamView.propTypes = {
  activeSource: PropTypes.string,
  position: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  afterPositionChange: PropTypes.func.isRequired,
};

export default WebcamView;
