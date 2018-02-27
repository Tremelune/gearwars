import React, { Component } from 'react';
import '../App.css';
import Chart from './Chart.js';
import Comparison from './Comparison.js';
import ComparisonList from './ComparisonList.js';
import TireForm from './TireForm.js';
import locator from '../biz/Locator.js';

class App extends Component {
  constructor() {
    super();

    // Check for stored stuff...If there's none, use a default.
    // locator.persister.clear()
    let comparisons = locator.persister.getAllComparisons();
    let currentComparison;
    if(comparisons.length <= 0) {
      let drivetrains = [{
        name: "EcoBoost",
        tireDiameter: 27.3, // Inches
        finalDrive: 3.31,
        gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
        redline: 6800,
      }];

      currentComparison = {
        name: 'Mustang',
        drivetrains: drivetrains,
      }
    } else {
      currentComparison = comparisons[0];
    }

    this.state = {
      tireSize: '235/50-18',
      comparisons: comparisons,
      currentComparison: currentComparison,
    };
  }


  render() {
    let comparison = this.state.currentComparison;
    let revolioWidth = Math.min(window.innerWidth, 400);

    let comparisonList = '';
    if(this.state.comparisons.length > 0) {
      comparisonList =
        <ComparisonList comparisons={this.state.comparisons} reloadSavedComparisons={this.reloadSavedComparisons} />
    }

    return (
      <div className="App">
        <header>Gear vs Speed</header>

        <Chart drivetrains={comparison.drivetrains} />

        {comparisonList}

        <TireForm tireSize={this.state.tireSize} />
        <br />

        <Comparison comparison={comparison} setComparison={this.setComparison} />

        <img src={"/revolio.png"} width={revolioWidth} alt="Revolio Clockberg Jr playing a string instrument" />

        <div>Built by Tremelune: <a href="https://github.com/Tremelune/gearwars">GitHub</a></div>
      </div>
    );
  }


  setComparison = (comparison) => {
    this.setState({comparisons: [comparison]});
  }

  reloadSavedComparisons = () => {
    let comparisons = locator.persister.getAllComparisons();
    this.setState({comparisons: comparisons});
  }
}

export default App;
