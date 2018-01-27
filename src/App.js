import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Calculator from './GearingCalculator.js';

class App extends Component {
  render() {
    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gears: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      rpms: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.buildGearSection(drivetrain)}
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
      let speed = Calculator.speed(
        drivetrain.tireDiameter, drivetrain.finalDrive, gear, rpm);

      rpmRows.push(<ol>{rpm}rpm: {speed}mph</ol>)
    }

    return rpmRows
  }
}

export default App;
