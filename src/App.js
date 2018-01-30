import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };
  }


  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Ho boy, I envy <i>you!</i></h1></header>

        <Chart drivetrain={this.state}/>
        <Form />
      </div>
    );
  }
}

export default App;
