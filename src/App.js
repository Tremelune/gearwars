import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Calculator from './GearingCalculator.js';
import { Chart } from 'react-google-charts';

class App extends Component {
  render() {
    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gears: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      rpms: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000],
    };

    const data = [
      ['Gear', 'Fifth'], [0, 0], [9000, 299],
      ['Gear', 'Fourth'], [0, 0], [9000, 200],
      ['Gear', 'Third'], [0, 0], [9000, 150]
    ];

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <div className={'chart'}>
          <Chart
            chartType="LineChart"
            data={data}
            options={{}}
            graph_id="LineChart"
            width="100%"
            height="400px"
            legend_toggle
          />
        </div>
        <div>
          <p className="App-intro">
            {this.buildGearSection(drivetrain)}
          </p>
        </div>
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
      let speed = Calculator.speed(drivetrain.tireDiameter, drivetrain.finalDrive, gear, rpm);

      rpmRows.push(<ol>{rpm}rpm: {speed}mph</ol>)
    }

    return rpmRows
  }
}

export default App;
