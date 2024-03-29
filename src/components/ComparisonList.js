import React, { Component } from 'react';
import locator from '../biz/Locator.js';

/**
 * @param comparisons - List of comparisons.
 * @param selectedId - ID of currently selected comparison.
 * @function reloadSavedComparisons - Refreshes the comparison list.
 * @function setComparison - Changes the comparison ID.
 */
export default class ComparisonList extends Component {
  render() {
    return (
      <div>
        <b>Saved Comparisons</b>
        {this.props.comparisons.map((comparison, index) =>
          <div key={index} className="comparisonList">
            <span className="comparisonName">
              {comparison.id === this.props.selectedId
                ? comparison.name
                : <a onClick={(e) => {this.props.setComparison(comparison)}}>{comparison.name}</a>
              }
            </span>

            <span className="comparisonButtons">
              <a onClick={(e) => this.duplicate(comparison)}>(duplicate)</a>
              <a onClick={(e) => this.delete(comparison.id)}>(remove)</a>
            </span>
          </div>
        )}
        <br />
      </div>
    );
  }


  duplicate(comparison) {
    console.log('Duplicating:', comparison);
    // The presence of an ID is what switches the update vs create logic in save...I dunno if it belongs here.
    let clone = {...comparison, id: null};
    clone = locator.comparisonDao.save(clone);
    this.props.reloadSavedComparisons(clone.id);
  }

  delete(id) {
    locator.comparisonDao.delete(id);
    this.props.reloadSavedComparisons(id);
  }
}
