import React, { Component } from 'react';
import persister from '../biz/Persister.js';

class Persistence extends Component {
  render() {
    return (
      <div>
        <button onClick={(e) => persister.clear()}>Clear Saved</button>
        <button onClick={(e) => this.revert()}>Load Saved</button>
        <button onClick={(e) => persister.save(this.props.drivetrains)}>Save</button>
        <br />
        <br />
      </div>
    );
  }


  revert() {
    let drivetrains = persister.load();
    if(drivetrains) {
      this.props.setDrivetrains(drivetrains);
    }
  }
}

export default Persistence;
