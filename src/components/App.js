import React, { Component } from 'react';
import '../App.css';
import Chart from './Chart.js';
import Comparison from './Comparison.js';
import TireForm from './TireForm.js';
import locator from '../biz/Locator.js';

class App extends Component {
  constructor() {
    super();

    // Check for stored stuff...If there's none, use a default.
    let comparison = locator.persister.load();
    let drivetrains; // We don't need the comparison name yet.
    if(comparison) {
      drivetrains = comparison.drivetrains;
    } else {
      drivetrains = [{
        name: "EcoBoost",
        tireDiameter: 27.3, // Inches
        finalDrive: 3.31,
        gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
        redline: 6800,
      }];
    }

    this.state = {
      tireSize: '235/50-18',
      drivetrains: drivetrains,
    };
  }


  render() {
    let revolioWidth = Math.min(window.innerWidth, 400);
    return (
      <div className="App">
        <header>Gear vs Speed</header>

        <Chart drivetrains={this.state.drivetrains} />

        <TireForm tireSize={this.state.tireSize} />
        <br />

        <Comparison drivetrains={this.state.drivetrains} setDrivetrains={this.setDrivetrains} />

        <img src={"/revolio.png"} width={revolioWidth} alt="Revolio Clockberg Jr playing a string instrument"/>

        <div>Built by Tremelune: <a href="https://github.com/Tremelune/gearwars">GitHub</a></div>
      </div>
    );
  }


  // Sneaky syntax allows for 'this' to be accessible.
  setDrivetrains = (drivetrains) => {
    this.setState({drivetrains: drivetrains});
  }
}

export default App;
