import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';

class App extends Component {
  constructor() {
    super();

    // Something to fill the form in with initially (happens to be a 2015 EcoBoost Ford Mustang).
    let mustang = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };

    let compass = {
      tireDiameter: 29, // Inches
      finalDrive: 3.5,
      gearRatios: [4.46, 2.51, 1.56, 1.56, 1.14, 0.85, 0.67],
      redline: 6400,
    };

    this.state = [mustang, compass];
  }


  // Sneaky syntax allows for 'this' to be accessible.
  setDrivetrain = (drivetrain) => {
    // Until we can clone forms, just always throw a hardcoded Mustang in there...
    let mustang = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };

    let drivetrains = [mustang, drivetrain];
    this.setState({drivetrains);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Gear vs Speed</h1></header>

        <Chart drivetrains={this.state} />
        <Form drivetrain={this.state[1]} update={this.setDrivetrain} />

        <img src={"/revolio.png"} />
      </div>
    );
  }
}

export default App;
