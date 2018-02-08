import React, { Component } from 'react';
import * as Persister from '../biz/Persister.js';

class Persistence extends Component {
  render() {
    return (
      <div>
        <button onClick={(e) => Persister.clear()}>Clear</button>
        <button onClick={(e) => this.revert()}>Revert</button>
        <button onClick={(e) => Persister.save(this.props.drivetrains)}>Save</button>
      </div>
    );
  }


  revert() {
    let drivetrains = Persister.load();
    if(drivetrains) {
      this.props.setDrivetrains(drivetrains);
    }
  }
}

export default Persistence;
