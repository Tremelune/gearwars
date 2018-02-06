import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';
import TireForm from './components/TireForm.js';

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
      gearRatios: [4.46, 2.51, 1.56, 1.35, 1.14, 0.85, 0.67],
      redline: 6400,
    };

    this.state = {drivetrains: [mustang, compass]};
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Gear vs Speed</h1></header>

        <Chart drivetrains={this.state.drivetrains} />

        <div><b>Drivetrain 1</b></div>
        <TireForm />
        <br />
        <Form id="0" drivetrain={this.state.drivetrains[0]} update={this.setDrivetrain} />
        <br />

        <div><b>Drivetrain 2</b></div>
        <TireForm />
        <br />
        <Form id="1" drivetrain={this.state.drivetrains[1]} update={this.setDrivetrain} />
        <br />

        <img src={"/revolio.png"} alt="Revolio Clockberg Jr playing a string instrument"/>
      </div>
    );
  }


  // Sneaky syntax allows for 'this' to be accessible.
  setDrivetrain = (formId, drivetrain) => {
    // We have several drivetrains in state, so we use the form ID to replace just the one being updated.
    let drivetrains = this.state.drivetrains;
    drivetrains[formId] = drivetrain;
    this.setState({drivetrains: drivetrains});
  }
}

export default App;
