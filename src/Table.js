import React, { Component } from 'react';

class Table extends Component {
  previousPage = () => {

  };

  nextPage = () => {

  };

  render() {
    const headers = this.props.columns.map( (column, idx) => (
      <th scope="col" 
        key={idx}>
        {column.name}
      </th>
    ));

    const routeRows = this.props.rows.map( (row, idx) => (
      <tr key={idx}>
        <td>{row.airline}</td>
        <td>{row.src}</td>
        <td>{row.dest}</td>
      </tr>
    ));

    return (
      <div>
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
        <button
          onClick={this.previousPage}
        >
          Previous Page
        </button>
        <button
          onClick={this.nextPage}
        >
          Next Page
        </button>
      </div>
    );
  }
}

export default Table;
