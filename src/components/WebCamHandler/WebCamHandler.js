import React, { Component } from 'react';
import ListPanelContainer from '../ListPanel/ListPanelContainer';
import WebcamView from '../WebcamView/WebcamView';

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
        <ListPanelContainer onListItemClick={this.onListItemClick} />
        <WebcamView activeSource={activeSource} />
      </>
    );
  }
}

export default WebCamHandler;
