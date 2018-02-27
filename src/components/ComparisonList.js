import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class ComparisonList extends Component {
  render() {
    return (
      <div>
        <b>Saved Comparisons</b>
        {this.props.comparisons.map((comparison, index) =>
          <div key={index}>
            Name: {comparison.name}
            <a onClick={(e) => this.deleteComparison(comparison.name)}>(remove)</a>
          </div>
        )}
        <br />
      </div>
    );
  }


  deleteComparison(name) {
    locator.persister.deleteComparison(name);
    this.props.reloadSavedComparisons();
  }
}
