import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';

class App extends Component {
  constructor() {
    super();

    this.vehicle = 'm';

    this.jeep = {
      tireDiameter: 29, // Inches
      finalDrive: 3.21,
      gearRatios: [4.46, 2.61, 1.72, 1.25, 1, 0.797],
      redline: 6600,
    };

    this.mustang = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };

    this.state = this.jeep;
  }

  // Sneaky syntax allows for 'this' to be accessible.
  onToggle = () => {
    console.log('TOGGLIN TO: ');
    this.vehicle = this.vehicle == 'j' ? 'm' : 'j';
    let newState = this.vehicle == 'j' ? this.mustang : this.jeep;
    console.log(newState);
    this.setState(newState);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Ho boy, I envy <i>you!</i></h1></header>

        <Chart drivetrain={this.state} />
        <Form toggle={this.onToggle} />
      </div>
    );
  }
}

export default App;
