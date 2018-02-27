import React, { Component } from 'react';

export default class ComparisonList extends Component {
  render() {
    return (
      <div>
        <b>Comparisons</b>
        {this.props.comparisons.map((comparison, index) =>
          <div key={index}>
            Name: {comparison.name}
          </div>
        )}
        <br />
      </div>
    );
  }
}
