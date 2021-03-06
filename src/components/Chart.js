import React, { Component } from 'react';
import {LineChart} from 'react-easy-chart';
import ChartRenderer from '../biz/ChartRenderer.js';
import locator from '../biz/Locator.js'

/** Uses this library: https://rma-consulting.github.io/react-easy-chart/line-chart/index.html */
class Chart extends Component {
  /**
   * todo Drivetrain should probably be a class...immutable...
   *
   * @props An array of at least one drivetrains:
   * {
   *   maxRpm: 8000,
   *   maxSpeed: 75,
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
    super(props);
    this.state = this.calculateDimensions();
  }


  render() {
    console.log('Rendering chart...');
    let lineColors = locator.chartRenderer.generateLineColors(this.props.drivetrains);
    let data = ChartRenderer.buildDataFromDrivetrains(this.props.drivetrains);
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
        xDomainRange={[0, this.props.maxSpeed]}
        yDomainRange={[0, this.props.maxRpm]}
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

  calculateDimensions() {
    return ChartRenderer.calculateDimensions(window.innerWidth, window.innerHeight)
  }
}

export default Chart;
