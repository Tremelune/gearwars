import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gears: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      rpms: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
    };

    var gearSections =
      this.buildGearSection(drivetrain);

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

  buildGearSection(drivetrain) {
    var gearSections = [];

    var index = 1;
    for (let gear of drivetrain.gears) {
      var rpmRows = this.buildRpmRows(drivetrain, gear);

      gearSections.push(<div>Gear {index++} ({gear})</div>)
      gearSections.push(rpmRows);
    }

    return gearSections;
  }

  buildRpmRows(drivetrain, gear) {
    var rpmRows = [];
    for (let rpm of drivetrain.rpms) {
      let speed = this.calculateSpeed(drivetrain, gear, rpm);
      rpmRows.push(<ol>{rpm}rpm: {speed}mph</ol>)
    }

    return rpmRows
  }

  // I pulled this jank math from:
  // http://www.hotrod.com/articles/speed-rpm-gear-ratio-tire-size-formula/
  calculateSpeed(drivetrain, gearRatio, rpm) {
    const numer = rpm * drivetrain.tireDiameter;
    const denom = drivetrain.finalDrive * gearRatio * 336.13;
    return Math.round(numer / denom);
  }
}

export default App;
