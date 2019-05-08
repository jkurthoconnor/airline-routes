import React, { Component } from 'react';
import './App.css';
import data from './data.js'; // how to import directly as in const?

const { routes, airlines, airports } = data;

class App extends Component {

  render() {
    const routeRows = routes.map( (route, idx) => (
      <tr key={idx}>
        <td>{route.airline}</td>
        <td>{route.src}</td>
        <td>{route.dest}</td>
      </tr>
    ));

    return (
      <div className="app">
        <header className="header">
          <h1 className="title">Airline Routes</h1>
        </header>
        <section>
          <p>
            Welcome to the Routes!
          </p>
          <table>
            <tbody>
              {routeRows}
            </tbody>
          </table>
        </section>
      </div>
    );
  }
}

export default App;
