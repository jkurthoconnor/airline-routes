import React, { Component } from 'react';
import Table from './components/Table.js';
import Select from './components/Select.js';
import './App.css';
import { routes, airlines, airports } from './data';

class App extends Component {
  state = {
    currentAirline: '',
    currentAirport: ''
  };

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
          <Select 
            airlines={airlines}
            airports={airports}
            selectAirline={this.selectAirline}
            selectAirport={this.selectAirport}
            currentAirline={this.state.currentAirline || ""}
            currentAirport={this.state.currentAirport || ""}
            clear={this.clearSelections}
            rows={this.setRoutes()}
          />
          <Table
            key={Math.random()}
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
