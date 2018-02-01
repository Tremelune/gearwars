import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';

class App extends Component {
  constructor() {
    super();

    // Something to fill the form in with initially (happens to be a 2015 EcoBoost Ford Mustang).
    this.state = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };
  }


  // Sneaky syntax allows for 'this' to be accessible.
  setDrivetrain = (drivetrain) => {
    this.setState(drivetrain);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Gear vs Speed</h1></header>

        <Chart drivetrain={this.state} />
        <Form drivetrain={this.state} update={this.setDrivetrain} />
      </div>
    );
  }
}

export default App;
