import React, { Component } from 'react';
import ChartRenderer from '../biz/ChartRenderer.js';
import locator from '../biz/Locator.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Scatter} from 'react-chartjs-2';

/** Uses Chart.js and react-chartjs-2. */
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

    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    this.state = this.calculateDimensions();
  }


  render() {
    let datasets = locator.chartRenderer.buildDataFromDrivetrains(this.props.drivetrains);

    let options = {
      scales: {
        x: {
          // If we don't floor, you get labels like '150.0000000000000'
          max: Math.floor(this.props.maxSpeed),
          ticks: {
            stepSize: 10,
          }
        },
        y: {
          // If we don't floor, you get labels like '8,500.0000000000000'
          max: Math.floor(this.props.maxRpm),
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {
        padding: 20
      },
      animation: {
        duration: 0
      },
      elements: {
        point:{
            radius: 0
        }
      },
    }

    let data = {
      datasets: datasets,
    }

    return (
        <Scatter
          options={options}
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
