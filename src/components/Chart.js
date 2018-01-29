import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import * as Wrangler from '../ChartDataWrangler.js';

export default class Chart extends Component {
  constructor() {
    super();

    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gears: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      rpms: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000],
    };

    this.state = Wrangler.toData(drivetrain);
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
        data={[
          [{x: 0, y: 0}, {x: 200, y: 6800}],
          [{x: 0, y: 0}, {x: 150, y: 6800}]
        ]}
        />
      </div>
    );
  }
}
