import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ControlPanel.css';

class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.state = {
      startPosition: {},
    };
  }

  onMouseDown({ pageX, pageY }) {
    this.setState({
      startPosition: {
        x: pageX,
        y: pageY,
      },
    });
  }

  onMouseUp({ pageX, pageY }) {
    const { startPosition } = this.state;
    const { onPositionChange } = this.props;

    onPositionChange({
      x: startPosition.x - pageX,
      y: startPosition.y - pageY,
    });
  }

  render() {
    return (
      <>
        <h2 className="control-title">Click in cirlce and drag</h2>
        <svg
          height="230px"
          width="300px"
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          className="control-circle"
        >
          <circle cx="150" cy="120" r="100" stroke="black" strokeWidth="3" fill="#fff" />
        </svg>
      </>
    );
  }
}

ControlPanel.propTypes = {
  onPositionChange: PropTypes.func.isRequired,
};

export default ControlPanel;
