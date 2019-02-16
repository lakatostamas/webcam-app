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

  onMouseDown(ev) {
    ev.preventDefault();
    const { pageX, pageY, touches } = ev;
    this.setState({
      startPosition: {
        x: pageX !== undefined ? pageX : touches[0].clientX,
        y: pageY !== undefined ? pageY : touches[0].clientY,
      },
    });
  }

  onMouseUp(ev) {
    ev.preventDefault();
    const { pageX, pageY, changedTouches } = ev;
    const { startPosition } = this.state;
    const { onPositionChange } = this.props;

    onPositionChange({
      x: startPosition.x - (pageX !== undefined ? pageX : changedTouches[0].clientX),
      y: startPosition.y - (pageY !== undefined ? pageY : changedTouches[0].clientY),
    });
  }

  render() {
    return (
      <>
        <h2 className="control-title">Click in cirlce and drag</h2>
        <svg
          height="230px"
          width="300px"
          className="control-circle"
        >
          <circle
            cx="150"
            cy="120"
            r="100"
            stroke="#000"
            strokeWidth="3"
            fill="#fff"
            onMouseDown={this.onMouseDown}
            onMouseUp={this.onMouseUp}
            onTouchStart={this.onMouseDown}
            onTouchEnd={this.onMouseUp}
          />
        </svg>
      </>
    );
  }
}

ControlPanel.propTypes = {
  onPositionChange: PropTypes.func.isRequired,
};

export default ControlPanel;
