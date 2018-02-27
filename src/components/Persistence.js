import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class Persistence extends Component {
 /**
  * Props:
  * @param comparison The current comparison.
  * @param hasSaved Whether or not there is a persisted comparison.
  */
  render() {
    let revertButton = '';
    if(this.props.hasSaved) {
      revertButton = <button onClick={(e) => this.revert()}>Load Saved</button>
    }

    return (
      <div>
        <button onClick={(e) => locator.persister.clear()}>Clear Saved</button>
        {revertButton}
        <button onClick={(e) => locator.persister.saveComparison(this.props.comparison)}>Save</button>
        <br />
        <br />
      </div>
    );
  }


  revert() {
    let comparison = locator.persister.getComparison(this.props.comparison.name);
    if(comparison) {
      this.props.setComparison(comparison);
    }
  }
}
