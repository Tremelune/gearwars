import React, { Component } from 'react';
import Persister from '../biz/Persister.js';

class Persistence extends Component {
  constructor() {
    super();
    this.persister = new Persister(); // How exposed is this variable?
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.persister.clear()}>Clear Saved</button>
        <button onClick={(e) => this.revert()}>Load Saved</button>
        <button onClick={(e) => this.persister.save(this.props.drivetrains)}>Save</button>
        <br />
        <br />
      </div>
    );
  }


  revert() {
    let drivetrains = this.persister.load();
    if(drivetrains) {
      this.props.setDrivetrains(drivetrains);
    }
  }
}

export default Persistence;
