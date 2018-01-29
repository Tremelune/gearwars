import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Ho boy, I envy you!</h1></header>

        <Chart />
      </div>
    );
  }
}

export default App;
