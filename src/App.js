import React, { Component } from 'react';
import Table from './Table.js';
import './App.css';
import data from './data.js';

const { routes, airlines, airports } = data;

class App extends Component {
  state = {
    selectedRoutes: routes,
    currentAirline: "",
  };

  formatValue = (property, value) => {
    // return a string;
  };

  // debug: table does not update with change in parent state
  // and changes to props, but not 'received' on other end?
  selectAirline = e => {
    const airlineCode = Number(e.target.value);

    this.setState({
      currentAirline: airlineCode,
      selectedRoutes: [...routes].filter( route => {
        return route.airline === airlineCode;
      }),
    });

  };

  render() {
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
            <select 
              onChange={this.selectAirline}
              value={this.state.currentAirline || ""}
            >
              <option value="">Select Airline</option>
              { airlines.map( airline => (
                <option
                  key={airline.id}
                  value={airline.id}>
                  {airline.name}
                </option>
                )) }
            </select>
          <Table
            className="routes-table"
            columns={columns}
            rows={this.state.selectedRoutes}
            format={this.formatValue}
            perPage="25"
          />
        </section>
      </div>
    );
  }
}

export default App;
