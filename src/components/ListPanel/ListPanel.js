import React from 'react';
import PropTypes from 'prop-types';
import './ListPanel.css';

function ListPanel({ webcams, onListItemClick }) {
  return (
    <ul className="list-panel">
      {webcams.map(({ name, source }) => (
        <li
          className="list-panel-item"
          key={name}
        >
          <button
            className="list-panel-button"
            type="button"
            onClick={() => onListItemClick(source)}
          >
            {name}
          </button>
        </li>
      ))}
    </ul>
  );
}

ListPanel.propTypes = {
  webcams: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    source: PropTypes.string,
  })).isRequired,
  onListItemClick: PropTypes.func.isRequired,
};

export default ListPanel;
