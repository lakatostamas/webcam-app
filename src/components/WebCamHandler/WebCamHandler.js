import React, { Component } from 'react';
import ListPanelContainer from '../ListPanel/ListPanelContainer';
import WebcamView from '../WebcamView/WebcamView';
import './WebCamHandler.css'

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
        <div className="panel-container">
          <ListPanelContainer onListItemClick={this.onListItemClick} />
        </div>
      </>
    );
  }
}

export default WebCamHandler;
