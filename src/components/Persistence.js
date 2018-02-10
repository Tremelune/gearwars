import React, { Component } from 'react';
import locator from '../biz/Locator.js';

export default class Persistence extends Component {
  render() {
    return (
      <div>
        <button onClick={(e) => locator.persister.clear()}>Clear Saved</button>
        <button onClick={(e) => this.revert()}>Load Saved</button>
        <button onClick={(e) => locator.persister.save(this.props.drivetrains)}>Save</button>
        <br />
        <br />
      </div>
    );
  }


  revert() {
    let drivetrains = locator.persister.load();
    if(drivetrains) {
      this.props.setDrivetrains(drivetrains);
    }
  }
}
