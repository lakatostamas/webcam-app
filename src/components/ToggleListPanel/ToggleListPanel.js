import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ToggleListPanel.css';

class ToggleListPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePanel: 0,
    };
    this.setActivePanel = this.setActivePanel.bind(this);
  }

  setActivePanel(activePanel) {
    this.setState({
      activePanel,
    });
  }

  render() {
    const { children } = this.props;
    const { activePanel } = this.state;

    return (
      <div className="panel-container">
        <ol className="panel-tabs">
          {children.map(({ label }, idx) => (
            <button
              className="panel-tab-button"
              type="button"
              onClick={() => this.setActivePanel(idx)}
              key={label}
            >
              {label}
            </button>
          ))}
        </ol>
        <div className="panel-content">
          {children[activePanel].content}
        </div>
      </div>
    );
  }
}

ToggleListPanel.propTypes = {
  children: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    content: PropTypes.element,

  })).isRequired,
};

export default ToggleListPanel;
