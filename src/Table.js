import React, { Component } from 'react';

class Table extends Component {

  state = {
    sourceRows: this.props.rows,
    sourceRowCount: this.props.rows.length,
    rowsPerPage: Number(this.props.perPage),
    currentPageStartIdx: 0,
    rows: this.props.rows.slice(0, this.props.perPage),
  };


  previousPage = () => {
    const newStartIdx = this.state.currentPageStartIdx - this.state.rowsPerPage;

    this.setState({
      rows: [...this.state.sourceRows.slice(
        newStartIdx, (newStartIdx + this.state.rowsPerPage)) ],
      currentPageStartIdx: newStartIdx,
    });
  };

  nextPage = () => { // achtung: startIdx may reference old inaccurate state
    const newStartIdx = this.state.currentPageStartIdx + this.state.rowsPerPage;

    this.setState({
      rows: [...this.state.sourceRows.slice(
      newStartIdx, (newStartIdx + this.state.rowsPerPage)) ],
      currentPageStartIdx: newStartIdx,
    });
  };

  prevPageDisabled = () => {
    return this.state.currentPageStartIdx - this.state.rowsPerPage < 0;
  }

  nextPageDisabled = () => {
    return (this.state.currentPageStartIdx + this.state.rowsPerPage) >= this.state.sourceRowCount - 1;
  };

  render() {
    console.log(this.state);
    const headers = this.props.columns.map( (column, idx) => (
      <th scope="col" 
        key={idx}>
        {column.name}
      </th>
    ));

    const routeRows = this.state.rows.map( (row, idx) => (
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
          disabled={this.prevPageDisabled()}
        >
          Previous Page
        </button>
        <button
          onClick={this.nextPage}
          disabled={this.nextPageDisabled()}
        >
          Next Page
        </button>
      </div>
    );
  }
}

export default Table;
