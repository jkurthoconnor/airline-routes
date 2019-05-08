import React, { Component } from 'react';
import data from './data.js'; // how to import directly as in const?

const { routes, airlines, airports, getAirlineById, getAirportByCode } = data;

class Table extends Component {
  render() {
    const routeRows = routes.map( (route, idx) => (
      <tr key={idx}>
        <td>{getAirlineById(route.airline)}</td>
        <td>{getAirportByCode(route.src)}</td>
        <td>{getAirportByCode(route.dest)}</td>
      </tr>
    ));

    return (
          <table>
            <tbody>
              {routeRows}
            </tbody>
          </table>
    );
  }
}

export default Table;
