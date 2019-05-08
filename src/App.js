import React, { Component } from 'react';
import Table from './Table.js';
import './App.css';
import data from './data.js'; // how to import directly as in const?

const { routes, airlines, airports, getAirlineById, getAirportByCode } = data;

class App extends Component {
  formatValue = (property, value) => {
    // return a string;
  };

  render() {
    const rows = ( () => {
      return routes.map( route => {
        return { 
          airline: getAirlineById(route.airline),
          src: getAirportByCode(route.src),
          dest: getAirportByCode(route.dest),
        };
      });
    })();

    const columns = [
      {name: 'Airline', property: 'airline'},
      {name: 'Source Airport', property: 'src'},
      {name: 'Destination Airport', property: 'dest'},
    ];

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
          </p>
          <Table 
            className="routes-table"
            columns={columns}
            rows={rows}
            format={this.formatValue}
            perPage="25"
          />
        </section>
      </div>
    );
  }
}

export default App;
