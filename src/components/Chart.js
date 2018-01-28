import React, { Component } from 'react';
import { Chart as GoogleChart } from 'react-google-charts';

export default class Chart extends Component {
  constructor() {
    super();

    const drivetrain = {
      tireDiameter: 26, // Inches
      finalDrive: 3.31,
      gears: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      rpms: [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000],
    };

    this.state = {
      options: {
        hAxis: {title: 'mph', minValue: 0, maxValue: 200},
        vAxis: {title: 'rpm', minValue: 0, maxValue: 6800},
      },

      columns: [
        {type: 'number', label: 'x'},
        {type: 'number', label: 'gear1'},
        {type: 'number', label: 'gear2'},
      ],

      rows: [[0, 0, 0], [200, 5000, 6800]],
    }
  }

  render() {
    return (
      <div className={'chart'}>
          <GoogleChart
            chartType="LineChart"
            options={this.state.options}
            columns={this.state.columns}
            rows={this.state.rows}
            graph_id="LineChart"
            width="100%"
            height="400px"
            legend_toggle
          />
      </div>
    );
  }
}
