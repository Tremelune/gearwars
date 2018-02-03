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

    // A sort of slate blue gradient...
    this.state = {lineColors: ['#21233b', '#4e5761', '#7b8b87', '#91a59a', '#a8bfad', '#bfd9c1', 'red', 'blue', 'orange', 'green', 'yellow', 'gray']}
  }


  render() {
    let combinedData = [];

    this.props.drivetrains.map((drivetrain, index) => {
      let data = ChartWrangler.toData(drivetrain);
      combinedData = [...combinedData, ...data];
    })

    return (
      <div className={'Chart'}>
        <LineChart
          grid
          verticalGrid
          axes
          axisLabels={{x: 'mph', y: 'rpm'}}
          width={800}
          height={500}
          xTicks={20}
          yTicks={10}
          lineColors={this.state.lineColors}
          xDomainRange={[0, 150]} // todo Make mutable in form. Lots of cars can break 150mph.
          yDomainRange={[0, 8000]} // todo Make mutable in form. The Ariel Atom has a 10,500rpm redline.
          data={combinedData}
        />
      </div>
    );
  }
}

export default Chart;
