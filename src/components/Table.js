import React, { Component } from 'react';
import { getAirlineById, getAirportByCode } from '../data.js';

class Table extends Component {
  state = {
    pageStartIdx: 0,
    displayRows: this.props.rows.slice(0, Number(this.props.perPage)),
  };

  changePageState = (start) => {
    this.setState({
      displayRows: [...this.props.rows.slice(
        start, (start + Number(this.props.perPage))) ],
      pageStartIdx: start,
    });
  };

  previousPage = () => {
    const newStartIdx = this.state.pageStartIdx - Number(this.props.perPage);
    this.changePageState(newStartIdx);
  };

  nextPage = () => {
    const newStartIdx = this.state.pageStartIdx + Number(this.props.perPage);
    this.changePageState(newStartIdx);
  };

  prevPageDisabled = () => {
    return this.state.pageStartIdx - Number(this.props.perPage) < 0;
  };

  nextPageDisabled = () => {
    const lastRow = this.props.rows.length - 1;
    return (this.state.pageStartIdx + Number(this.props.perPage)) >= lastRow;
  };

  pageViewMessage = () => {
    const totalRecords = this.props.rows.length;
    const pageStart = totalRecords ? (this.state.pageStartIdx + 1) : 0;
    let pageEnd = pageStart + Number(this.props.perPage) - 1;

    if (pageEnd > totalRecords) { pageEnd = totalRecords }

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
        <table class={this.props.className}>
          <caption>
            {this.pageViewMessage()}
          </caption>
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
