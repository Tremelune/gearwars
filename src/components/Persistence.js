import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class Persistence extends Component {
  render() {
    return (
      <div>
        <button onClick={(e) => locator.persister.clear()}>Clear Saved</button>
        <button onClick={(e) => this.revert()}>Load Saved</button>
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
