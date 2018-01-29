import React, { Component } from 'react';
import './App.css';
import Chart from './components/Chart.js';
import Form from './components/Form.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header"><h1 className="App-title">Ho boy, I envy <i>you!</i></h1></header>

        <Chart />
        <Form />
      </div>
    );
  }
}

export default App;
