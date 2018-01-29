import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import * as ChartWrangler from '../biz/ChartDataWrangler.js';

export default class Chart extends Component {
  constructor() {
    super();

    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    };

    // todo: This only draws four gears...
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
        data={this.state}
        />
      </div>
    );
  }
}
