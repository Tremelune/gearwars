import React, { Component } from 'react';
import '../App.css';
import Chart from './Chart.js';
import ChartRenderer from '../biz/ChartRenderer';
import Comparison from './Comparison.js';
import ComparisonList from './ComparisonList.js';
import AxisForm from './AxisForm.js';
import TireForm from './TireForm.js';
import locator from '../biz/Locator.js';
import ReactGA from 'react-ga';


const ANALYTICS_ID = 'UA-2413562-9';


class App extends Component {
  constructor() {
    super();

    this.initAnalytics()

    let comparisons = this.establishComparisons();
    let currentComparison = comparisons[0];

    this.state = {
      maxSpeed: 120,
      maxRpm: ChartRenderer.calculateHighestRedline(currentComparison),
      tireSize: '235/50-18',
      comparisons: comparisons,
      currentComparison: currentComparison,
    };
  }

  // Initialize Google Analytics
  // https://github.com/react-ga/react-ga
  initAnalytics() {
    let options = {
      gaOptions: {
        siteSpeedSampleRate: 100
      }
    };

    ReactGA.initialize(ANALYTICS_ID, options);
  }


  render() {
    this.trackPageView()

    let comparison = this.state.currentComparison;
    let revolioWidth = Math.min(window.innerWidth, 400); // Revolio is the minstrel in the graphic.

    return (
      <div className="App">
        <header>Gear vs Speed</header>

        <Chart maxRpm={this.state.maxRpm} maxSpeed={this.state.maxSpeed} drivetrains={comparison.drivetrains} />

        <AxisForm
          maxRpm={this.state.maxRpm}
          maxSpeed={this.state.maxSpeed}
          setMaxRpm={this.setMaxRpm}
          setMaxSpeed={this.setMaxSpeed} />
        <br />

        <TireForm tireSize={this.state.tireSize} />
        <br />

        {this.state.comparisons.length > 0 &&
          <ComparisonList
            comparisons={this.state.comparisons}
            selectedId={comparison.id}
            reloadSavedComparisons={this.reloadSavedComparisons}
            setComparison={this.setComparison}/>
        }

        <Comparison
          comparison={comparison}
          setComparison={this.setComparison}
          reloadSavedComparisons={this.reloadSavedComparisons}/>

        <br />
        <img src={"/revolio.png"} width={revolioWidth} alt="Revolio Clockberg Jr playing a string instrument" />

        <div>
          Built by <a href="https://www.instagram.com/raidenmotors/">Raiden Motors</a><br/>
          <a href="https://github.com/Tremelune/gearwars">(GitHub)</a>
        </div>
      </div>
    );
  }

  // Track page view in analytics
  trackPageView() {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }


  setMaxRpm = (maxRpm) => {
    console.log('Setting max RPM to: ' + maxRpm);
    this.setState({maxRpm: maxRpm});
  }

  setMaxSpeed = (maxSpeed) => {
    console.log('Setting max speed to: ' + maxSpeed);
    this.setState({maxSpeed: maxSpeed});
  }

  setComparison = (comparison) => {
    console.log('Selecting comparison:', comparison);
    this.setState({currentComparison: comparison});
  }

  reloadSavedComparisons = (selectedId) => {
    let comparisons = this.establishComparisons();
    console.log('Selecting ' + selectedId + ' from:', comparisons);

    let current = this.getSelected(comparisons, selectedId);
    this.setState({
      comparisons: comparisons,
      currentComparison: current,
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
