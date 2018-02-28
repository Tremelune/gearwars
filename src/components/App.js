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

    let comparisons = this.establishComparisons();
    let currentComparison = comparisons[0];

    this.state = {
      tireSize: '235/50-18',
      comparisons: comparisons,
      currentComparison: currentComparison,
    };
  }


  render() {
    let comparison = this.state.currentComparison;
    let revolioWidth = Math.min(window.innerWidth, 400);

    return (
      <div className="App">
        <header>Gear vs Speed</header>

        <Chart drivetrains={comparison.drivetrains} />

        {this.state.comparisons.length > 0 &&
          <ComparisonList
            comparisons={this.state.comparisons}
            selectedId={comparison.id}
            reloadSavedComparisons={this.reloadSavedComparisons}
            setComparison={this.setComparison}/>
        }

        <TireForm tireSize={this.state.tireSize} />
        <br />

        <Comparison comparison={comparison} setComparison={this.setComparison} />

        <br />
        <img src={"/revolio.png"} width={revolioWidth} alt="Revolio Clockberg Jr playing a string instrument" />

        <div>Built by Tremelune: <a href="https://github.com/Tremelune/gearwars">GitHub</a></div>
      </div>
    );
  }

  setComparison = (comparison) => {
    console.log('Selecting comparison:', comparison);
    this.setState({currentComparison: comparison});
  }

  reloadSavedComparisons = (selectedId) => {
    let comparisons = this.establishComparisons();
    console.log('Selecting ' + selectedId + ' from:', comparisons);

    this.setState({
      comparisons: comparisons,
      currentComparison: this.getSelected(comparisons, selectedId),
    });
  }

  getSelected(comparisons, selectedId) {
    comparisons.forEach((comparison) => {
      if(comparison.id === selectedId) {
        return comparison;
      }
    });

    return comparisons[0];
  }


  /** Check for stored stuff...If there's none, use a default. Always has at least one element. */
  establishComparisons() {
    let comparisons = locator.comparisonDao.getAll();
    if(comparisons.length <= 0) {
      locator.accountInitializer.initialize();
      comparisons = locator.comparisonDao.getAll();
    }

    console.log('Established comparisons:', comparisons);
    return comparisons;
  }
}

export default App;
