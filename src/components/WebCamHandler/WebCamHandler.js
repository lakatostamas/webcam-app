import React, { Component } from 'react';
import ListPanelContainer from '../ListPanel/ListPanelContainer';
import WebcamView from '../WebcamView/WebcamView';
import ToggleListPanel from '../ToggleListPanel/ToggleListPanel';

class WebCamHandler extends Component {
  constructor(props) {
    super(props);
    this.onListItemClick = this.onListItemClick.bind(this);
    this.state = {
      activeSource: '',
    };
  }

  onListItemClick(source) {
    this.setState({
      activeSource: source,
    });
  }

  render() {
    const { activeSource } = this.state;
    console.log(activeSource);
    return (
      <>
        <WebcamView activeSource={activeSource} />
        <ToggleListPanel>
          {[
            {
              label: 'Cameras',
              content: <ListPanelContainer onListItemClick={this.onListItemClick} />,
            },
            {
              label: 'Control',
              content: <div>control</div>,
            },
          ]}
        </ToggleListPanel>
      </>
    );
  }
}

export default WebCamHandler;
