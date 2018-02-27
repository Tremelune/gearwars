import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class ComparisonList extends Component {
  render() {
    return (
      <div>
        <b>Saved Comparisons</b>
        {this.props.comparisons.map((comparison, index) =>
          <div key={index}>
            {comparison.name}
            <a onClick={(e) => this.deleteComparison(comparison.id)}>(remove)</a>
          </div>
        )}
        <br />
      </div>
    );
  }


  deleteComparison(id) {
    locator.comparisonDao.delete(id);
    this.props.reloadSavedComparisons();
  }
}
