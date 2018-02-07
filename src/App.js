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
      tireDiameter: 27.3, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };

    this.state = {
      tireSize: '235/50-18',
      drivetrains: [mustang],
    };
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Gear vs Speed</h1></header>

        <div className="input">
          <TireForm tireSize={this.state.tireSize} />
          <br />

          {this.state.drivetrains.map((drivetrain, index) =>
            <div key={index}>
              <div>
                <b>Drivetrain {index + 1}</b>
                <a onClick={(e) => this.duplicateDrivetrain(index)}>(Duplicate)</a>
                <a onClick={(e) => this.removeDrivetrain(index)}>(Remove)</a>
              </div>

              <Form id={index} drivetrain={drivetrain} update={this.setDrivetrain} />
              <br />
            </div>
          )}
        </div>

        <div className="output">
          <Chart drivetrains={this.state.drivetrains} />
        </div>

        <img src={"/revolio.png"} alt="Revolio Clockberg Jr playing a string instrument"/>
      </div>
    );
  }


  duplicateDrivetrain = (index) => {
    let drivetrains = this.state.drivetrains.slice();
    let drivetrain = drivetrains[index];
    drivetrains.push(drivetrain);
    this.setState({drivetrains: drivetrains});
  }

  removeDrivetrain = (index) => {
    let drivetrains = this.state.drivetrains.slice();
    drivetrains.splice(index, 1);
    this.setState({drivetrains: drivetrains});
  }

  // Sneaky syntax allows for 'this' to be accessible.
  setDrivetrain = (formId, drivetrain) => {
    // We have several drivetrains in state, so we use the form ID to replace just the one being updated.
    let drivetrains = this.state.drivetrains.slice();
    drivetrains[formId] = drivetrain;
    this.setState({drivetrains: drivetrains});
  }
}

export default App;
