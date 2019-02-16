import React, { Component } from 'react';
import ListPanelContainer from '../ListPanel/ListPanelContainer';
import WebcamView from '../WebcamView/WebcamView';
import ToggleListPanel from '../ToggleListPanel/ToggleListPanel';
import ControlPanel from '../ControlPanel/ControlPanel';

class WebCamHandler extends Component {
  constructor(props) {
    super(props);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.onPositionChange = this.onPositionChange.bind(this);
    this.afterPositionChange = this.afterPositionChange.bind(this);
    this.state = {
      activeSource: '',
      position: {},
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { position } = this.state;
    if (Object.keys(position).length && !Object.keys(nextState.position).length) {
      return false;
    }

    return true;
  }

  onListItemClick(source) {
    this.setState({
      activeSource: source,
    });
  }

  onPositionChange(position) {
    this.setState({
      position,
    });
  }

  afterPositionChange() {
    this.setState({
      position: {},
    });
  }

  render() {
    const { activeSource, position } = this.state;
    return (
      <>
        <WebcamView
          activeSource={activeSource}
          position={position}
          afterPositionChange={this.afterPositionChange}
        />
        <ToggleListPanel>
          {[
            {
              label: 'Cameras',
              content: <ListPanelContainer onListItemClick={this.onListItemClick} />,
            },
            {
              label: 'Control',
              content: <ControlPanel onPositionChange={this.onPositionChange} />,
            },
          ]}
        </ToggleListPanel>
      </>
    );
  }
}

export default WebCamHandler;
