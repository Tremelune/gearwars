import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import * as ChartWrangler from '../biz/ChartDataWrangler.js';

class Chart extends Component {
  constructor() {
    super();

    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };

    this.state = ChartWrangler.toData(drivetrain);
  }

  render() {
    return (
      <div className={'chart'}>
      <LineChart
        grid
        verticalGrid
        axes
        axisLabels={{x: 'mph', y: 'rpm'}}
        width={1000}
        height={500}
        xTicks={20}
        yTicks={5}
        lineColors={['red', 'blue', 'black', 'green', 'orange', 'pink', 'cyan', 'purple', 'yellow', 'gray']}
        data={this.state}
        />
      </div>
    );
  }
}

export default Chart;
