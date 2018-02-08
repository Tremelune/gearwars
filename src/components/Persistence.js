import React, { Component } from 'react';
import * as Persister from '../biz/Persister.js';

class Persistence extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <button onClick={(e) => Persister.clear()}>Clear</button>
        <button onClick={(e) => Persister.revert()}>Revert</button>
        <button onClick={(e) => Persister.save(this.props)}>Save</button>
      </div>
    );
  }
}

export default Persistence;
