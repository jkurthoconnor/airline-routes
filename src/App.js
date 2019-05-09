import React, { Component } from 'react';
import Table from './components/Table.js';
import './App.css';
import data from './data.js';

const { routes, airlines, airports } = data;

class App extends Component {
  state = {
    currentAirline: '',
    currentAirport: ''
  };

  // debug: table does not rerender with changes to parent state
  // and to props
  selectAirline = e => {
    this.setState({
      currentAirline: Number(e.target.value),
    });
  };

  selectAirport = e => {
    this.setState({
      currentAirport: e.target.value,
    });
  };

  // setRoutes does change props when airline is selected
  // but Table component does not rerender
  clearSelections = () => {
    this.setState({
      currentAirline: '',
      currentAirport: '',
    });
  };

  setRoutes = () => {
    const airline = this.state.currentAirline;
    const airport = this.state.currentAirport;

    if (airline && airport) {
      return routes.filter( route => {
        return route.airline === airline &&
               (route.src === airport || route.dest === airport);
      });
    } else if (airline || airport) {
      return routes.filter( route => {
        return route.airline === airline || 
               route.src === airport || 
               route.dest === airport;
      });
    } else {
      return routes;
    }
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
            <select 
              onChange={this.selectAirport}
              value={this.state.currentAirport || ""}
            >
              <option value="">Select Airport</option>
              { airports.map( airport => (
                <option
                  key={airport.code}
                  value={airport.code}>
                  {airport.name}
                </option>
                )) }
            </select>
            <button
              onClick={this.clearSelections}
              value="Reset"
            >Reset</button>
          <Table
            className="routes-table"
            columns={columns}
            rows={this.setRoutes()}
            perPage="25"
          />
        </section>
      </div>
    );
  }
}

export default App;
