import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import * as ChartWrangler from '../biz/ChartDataWrangler.js';

/** Uses this library: https://rma-consulting.github.io/react-easy-chart/line-chart/index.html */
class Chart extends Component {
  /**
   * todo Drivetrain should probably be a class...immutable...
   *
   * props: {
   *   drivetrain: {
   *     tireDiameter: 26, // Inches
   *     finalDrive: 3.31,
   *     gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
   *     redline: 6800,
   *   }
   * }
   */
  constructor(props) {
    super();
  }


  render() {
    let data = ChartWrangler.toData(this.props.drivetrain);
    return (
      <div className={'chart'}>
        <LineChart
          grid
          verticalGrid
          axes
          axisLabels={{x: 'mph', y: 'rpm'}}
          width={800}
          height={500}
          xTicks={20}
          yTicks={10}
          lineColors={['red', 'blue', 'black', 'green', 'orange', 'pink', 'cyan', 'purple', 'yellow', 'gray']}
          xDomainRange={[0, 150]} // todo Make mutable in form. Lots of cars can break 150mph.
          yDomainRange={[0, 8000]} // todo Make mutable in form. The Ariel Atom has a 10,500rpm redline.
          data={data}
        />
      </div>
    );
  }
}

export default Chart;
