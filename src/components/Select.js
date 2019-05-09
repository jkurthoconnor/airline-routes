import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  static propTypes = {
    airlines: PropTypes.arrayOf(PropTypes.object),
    airports: PropTypes.arrayOf(PropTypes.object),
    selectAirline: PropTypes.func,
    selectAirport: PropTypes.func,
    clear: PropTypes.func,
    currentAirport: PropTypes.string,
    currentAirline: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  handleAirlineSelection = e => {
    this.props.selectAirline(e);
  };

  handleAirportSelection = e => {
    this.props.selectAirport(e);
  };

  render() {
    return (
      <div>
        <select 
          onChange={this.handleAirlineSelection}
          value={this.props.currentAirline}
        >
          <option value="">Select Airline</option>
          { this.props.airlines.map( airline => (
            <option
              key={airline.id}
              value={airline.id}>
              {airline.name}
            </option>
            )) }
        </select>
        <select 
          onChange={this.handleAirportSelection}
          value={this.props.currentAirport}
        >
          <option value="">Select Airport</option>
          { this.props.airports.map( airport => (
            <option
              key={airport.code}
              value={airport.code}>
              {airport.name}
            </option>
            )) }
        </select>
        <button
          onClick={this.props.clear}
          value="Reset"
        >
          Reset
        </button>
      </div>
    );
  }
}

export default Select;
