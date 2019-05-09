import React, { Component } from 'react';
import { getAirlineById, getAirportByCode } from '../data.js';

class Table extends Component {
  state = {
    sourceRows: this.props.rows,
    sourceRowCount: this.props.rows.length,
    rowsPerPage: Number(this.props.perPage),
    currentPageStartIdx: 0,
    displayRows: this.props.rows.slice(0, Number(this.props.perPage)),
  };

  previousPage = () => {
    const newStartIdx = this.state.currentPageStartIdx - this.state.rowsPerPage;

    this.setState({
      displayRows: [...this.state.sourceRows.slice(
        newStartIdx, (newStartIdx + this.state.rowsPerPage)) ],
      currentPageStartIdx: newStartIdx,
    });
  };

  nextPage = () => { // achtung: startIdx may reference old inaccurate state
    const newStartIdx = this.state.currentPageStartIdx + this.state.rowsPerPage;

    this.setState({
      displayRows: [...this.state.sourceRows.slice(
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

  pageViewMessage = () => {
    let pageStart = this.state.currentPageStartIdx + 1;
    let pageEnd = pageStart + this.state.rowsPerPage - 1;
    let totalRecords = this.state.sourceRowCount;

    pageStart = totalRecords ? pageStart : 0;
    pageEnd = pageEnd > totalRecords ? totalRecords : pageEnd;

    return `Displaying ${pageStart} - ${pageEnd} of ${totalRecords} matching routes`;
  };

  render() {
    const headers = this.props.columns.map( (column, idx) => (
      <th scope="col" 
        key={idx}>
        {column.name}
      </th>
    ));

    const routeRows = this.state.displayRows.map( (row, idx) => (
      <tr key={idx}>
        <td>{getAirlineById(row.airline)}</td>
        <td>{getAirportByCode(row.src)}</td>
        <td>{getAirportByCode(row.dest)}</td>
      </tr>
    ));

    return (
      <div>
        <table>
          <caption>{this.pageViewMessage()}</caption>
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
