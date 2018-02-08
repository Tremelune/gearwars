import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import ChartDataWrangler from '../biz/ChartDataWrangler.js';
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

    this.state = this.calculateDimensions();
  }


  render() {
    let lineColors = this.generateLineColors(this.props)
    let data = this.buildDataFromDrivetrains(this.props)
    return (
      <LineChart
        grid
        verticalGrid
        axes
        axisLabels={{x: 'mph', y: 'rpm'}}
        width={this.state.width}
        height={this.state.height}
        margin={{top: 10, right: 10, bottom: 30, left: 40}}
        xTicks={20}
        yTicks={10}
        lineColors={lineColors}
        xDomainRange={[0, 150]} // todo Make mutable in form. Lots of cars can break 150mph.
        yDomainRange={[0, 8000]} // todo Make mutable in form. The Ariel Atom has a 10,500rpm redline.
        data={data}
      />
    );
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState(this.calculateDimensions());
  }


  /** Generates line colors. One gradient per drivetrain. One color per gear. */
  generateLineColors(props) {
    // This seems a bit weird, but I didn't know how to append in a map().
    let gradients = [];
    props.drivetrains.map((drivetrain, index) => {
      let count = drivetrain.gearRatios.length;
      let gradient = LineColoration.generateGradient(index, count)
      gradients = [...gradients, ...gradient];
      return null;
    })
    return gradients;
  }

  /** Converts drivetrains to chart data, and combines them in a single array. */
  buildDataFromDrivetrains(props) {
    // This seems a bit weird, but I didn't know how to append in a map().
    let combinedData = [];
    props.drivetrains.map((drivetrain, index) => {
      let data = ChartDataWrangler.toData(drivetrain);
      combinedData = [...combinedData, ...data];
      return null;
    })
    return combinedData;
  }

  calculateDimensions() {
    let width = window.innerWidth;
    let height = Math.round(width * 9 / 16); // Arbitrary aspect ratio...

    let reasonableMaxHeight = window.innerHeight * 0.8;
    if(height > reasonableMaxHeight) {
      height = reasonableMaxHeight;
      width = Math.round(height * 16 / 9);
    }

    return {
      width: width,
      height: height,
    }
  }
}

export default Chart;
