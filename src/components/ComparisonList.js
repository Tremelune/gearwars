import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class ComparisonList extends Component {
  render() {
    return (
      <div>
        <b>Saved Comparisons</b>
        {this.props.comparisons.map((comparison, index) =>
          <div key={index} className="comparisonList">
            {comparison.name}
            <a onClick={(e) => this.duplicate(comparison)}>(duplicate)</a>
            <a onClick={(e) => this.delete(comparison.id)}>(remove)</a>
          </div>
        )}
        <br />
      </div>
    );
  }


  duplicate(comparison) {
    // The presence of an ID is what switches the update vs create logic in save...I dunno if it belongs here.
    comparison.id = null;
    locator.comparisonDao.save(comparison);
    this.props.reloadSavedComparisons();
  }

  delete(id) {
    locator.comparisonDao.delete(id);
    this.props.reloadSavedComparisons();
  }
}
