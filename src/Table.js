import React, { Component } from 'react';
import data from './data.js'; // how to import directly as in const?

const { routes, airlines, airports, getAirlineById, getAirportByCode } = data;

class Table extends Component {
  render() {
    const headers = this.props.columns.map( (column, idx) => (
      <th scope="col" 
        key={idx}>
        {column.name}
      </th>
    ));

    const routeRows = routes.map( (route, idx) => (
      <tr key={idx}>
        <td>{getAirlineById(route.airline)}</td>
        <td>{getAirportByCode(route.src)}</td>
        <td>{getAirportByCode(route.dest)}</td>
      </tr>
    ));

    return (
          <table>
            <thead>
              <tr>
                {headers}
              </tr>
            </thead>
            <tbody>
              {routeRows}
            </tbody>
          </table>
    );
  }
}

export default Table;
