import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListPanel from './ListPanel';

class ListPanelContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webcams: [],
      error: '',
    };
  }

  componentDidMount() {
    fetch('http://runningios.com/screamingbox/cameras.json')
      .then(response => response.json())
      .then(webcams => this.setState({
        webcams,
        error: '',
      }))
      .catch(() => {
        // if I would use Kibana or something like that to analyze my app behavior
        // I would report this error
        this.setState({
          error: 'Something went wrong',
          webcams: [],
        });
      });
  }

  render() {
    const { error, webcams } = this.state;
    const { onListItemClick } = this.props;
    if (error) {
      return 'Something went wrong';
    }

    if (!webcams.length) {
      return null;
    }

    return (
      <ListPanel webcams={webcams} onListItemClick={onListItemClick} />
    );
  }
}

ListPanelContainer.propTypes = {
  onListItemClick: PropTypes.func.isRequired,
};

export default ListPanelContainer;
