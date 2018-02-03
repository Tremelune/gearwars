import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import * as ChartWrangler from '../biz/ChartDataWrangler.js';
import * as LineColoration from '../biz/LineColoration.js';

/** Uses this library: https://rma-consulting.github.io/react-easy-chart/line-chart/index.html */
class Chart extends Component {
  /**
   * todo Drivetrain should probably be a class...immutable...
   *
   * @props An array of at least one drivetrains:
   * {
   *   [
   *     drivetrain: {
   *       tireDiameter: 26, // Inches
   *       finalDrive: 3.31,
   *       gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
   *       redline: 6800,
   *     },
   *   ]
   * }
   */
  constructor(props) {
    super();

    // todo Pull out function.
    let drivetrainA = LineColoration.generateGradient(0, 6);
    let drivetrainB = LineColoration.generateGradient(1, 7);
    let lineColors = [...drivetrainA, ...drivetrainB];

    // A sort of slate blue gradient...
    this.state = {lineColors: lineColors};
    this.state.data = this.buildDataFromDrivetrains(props);
  }


  render() {
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
          data={this.state.data}
        />
      </div>
    );
  }


  /** Converts drivetrains to chart data, and combines them ina single array. */
  buildDataFromDrivetrains(props) {
    let combinedData = [];
    props.drivetrains.map((drivetrain, index) => {
      let data = ChartWrangler.toData(drivetrain);
      combinedData = [...combinedData, ...data];
    })
    return combinedData;
  }
}

export default Chart;
