import React, { Component } from 'react';
import Table from './Table.js';
import './App.css';

class App extends Component {
  formatValue = (property, value) => {
    // return a string;
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
            Welcome to the Routes!
          </p>
          <Table 
            className="routes-table"
            columns={columns}
            rows=""
            format={this.formatValue}
          />
        </section>
      </div>
    );
  }
}

export default App;
