import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    // const finalDrive = 3.31;
    // const gears = [4.236, 2.538, 1.665, 1.238, ]

    var rpms = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

    var gearSections = [];
    for (let i=1; i<9; i++) {
      var rpmRows = [];
      for (let rpm of rpms) {
        rpmRows.push(<ol>{rpm}rpm: 0 mph</ol>)
      }

      gearSections.push(<div>Gear {i}</div>) //todo Fuckin' BRs.
      gearSections.push(rpmRows);
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {gearSections}
        </p>
      </div>
    );
  }
}

export default App;
