import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // I pulled this jank math from:
  // http://www.hotrod.com/articles/speed-rpm-gear-ratio-tire-size-formula/
  calculateSpeed(tireDiameter, finalDrive, gearRatio, rpm) {
    const speed = (rpm * tireDiameter) / (finalDrive * gearRatio * 336.13)
    return Math.round(speed);
  }

  render() {
    const tireDiameter = 26; // Inches
    const finalDrive = 3.31;
    const gears = [4.236, 2.538, 1.665, 1.238, 1, 0.704];
    const rpms = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000];

    var gearSections =
      this.buildGearSection(tireDiameter, finalDrive, gears, rpms);

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

  buildGearSection(tireDiameter, finalDrive, gears, rpms) {
    var gearSections = [];

    var index = 1;
    for (let gear of gears) {
      var rpmRows = [];
      for (let rpm of rpms) {
        let speed = this.calculateSpeed(tireDiameter, finalDrive, gear, rpm);
        rpmRows.push(<ol>{rpm}rpm: {speed}mph</ol>)
      }

      gearSections.push(<div>Gear {index++} ({gear})</div>)
      gearSections.push(rpmRows);
    }

    return gearSections;
  }
}

export default App;
