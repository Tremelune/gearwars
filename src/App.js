import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';
import TireForm from './components/TireForm.js';
import Persistence from './components/Persistence.js';
import * as Persister from './biz/Persister.js';

class App extends Component {
  constructor() {
    super();

    // Check for stored stuff...If there's none, use a default.
    let drivetrains = Persister.load();
    if(!drivetrains) {
      drivetrains = [{
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
    // Don't show the (Remove) button if there's only one listed drivetrain.
    let removeButtonText = this.state.drivetrains.length > 1 ? "(Remove)" : "";
    let revolioWidth = Math.min(window.innerWidth, 400);
    return (
      <div className="App">
        <header>Gear vs Speed</header>

        <Chart drivetrains={this.state.drivetrains} />

        <TireForm tireSize={this.state.tireSize} />
        <br />

        {this.state.drivetrains.map((drivetrain, index) =>
          <div key={index}>
            <div className="drivetrainTitle">
              <b>Drivetrain {index + 1}</b>
              <a onClick={(e) => this.duplicateDrivetrain(index)}>(Duplicate)</a>
              <a onClick={(e) => this.removeDrivetrain(index)}>{removeButtonText}</a>
            </div>

            <Form id={index} drivetrain={drivetrain} update={this.setDrivetrain} />
            <br />
          </div>
        )}

        <Persistence drivetrains={this.state.drivetrains} setDrivetrains={this.setDrivetrains} />

        <img src={"/revolio.png"} width={revolioWidth} alt="Revolio Clockberg Jr playing a string instrument"/>

        <div>Built by Tremelune: <a href="https://github.com/Tremelune/gearwars">GitHub</a></div>
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
    this.setDrivetrains(drivetrains);
  }


  // Sneaky syntax allows for 'this' to be accessible.
  setDrivetrains = (drivetrains) => {
    this.setState({drivetrains: drivetrains});
  }
}

export default App;
