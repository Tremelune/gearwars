import GearingCalculator from './GearingCalculator.js';

export default class ChartRenderer {
  constructor(lineColoration) {
    this.lineColoration = lineColoration;
  }


 /**
  * Converts drivetrains to chart data, and combines them in a single array. The data structure matches that used by
  * Chart.js:
  * 
  * [
  *   {
  *     showLine: true,
  *     backgroundColor: '#0000ff',
  *     borderColor: '#0000ff',
  *     data: [{x: 0, y:0}, {x: 30, y: 6000}]
  *   },
  *   {
  *     showLine: true,
  *     backgroundColor: '#0000ee',
  *     borderColor: '#0000ee',
  *     data: [{x: 0, y:0}, {x: 60, y: 6000}]
  *   },
  *   {
  *     showLine: true,
  *     backgroundColor: '#0000ff',
  *     borderColor: '#0000ff',
  *     data: [{x: 0, y:0}, {x: 70, y: 6800}]
  *   },
  * ]
  */
  buildDataFromDrivetrains(drivetrains) {
    // This seems a bit weird, but I didn't know how to append in a map().
    let combinedData = [];

    drivetrains.forEach((drivetrain, index) => {
      let colors = this.lineColoration.generateGradient(index, drivetrain.gearRatios.length)
      
      // We don't want the colors to change if a drivetrain is hidden, so we check after colors have
      // been generated
      if(drivetrain.hidden != true) {
        let dataset = this.toDataset(drivetrain, colors);
        Array.prototype.push.apply(combinedData, dataset);
      }
      
      return null;
    })

    return combinedData;
  }


  /** Gets highest redline within a comparison (to the nearest 1,000, rounded up). */
  static calculateHighestRedline(comparison) {
    let max = 0

    comparison.drivetrains.forEach(drivetrain => {
      if(drivetrain.redline > max) {
        max = drivetrain.redline
      }
    });

    // Bump it up to the nearest thousand
    let rounded = Math.ceil(max / 1000)
    max = rounded * 1000
    console.log('Calculated max RPM to ' + max)

    return max;
  }


  /** Generates line colors. One gradient per drivetrain. One color per gear. */
  generateLineColors(drivetrains) {
    // This seems a bit weird, but I didn't know how to append in a map().
    let gradients = [];

    drivetrains.forEach((drivetrain, index) => {
      let count = drivetrain.gearRatios.length;
      let gradient = this.lineColoration.generateGradient(index, count)
      Array.prototype.push.apply(gradients, gradient);
      return null;
    })

    return gradients;
  }


 /** Converts data into format easily chartable by Chart.js. */
  toDataset(drivetrain, colors) {
    // Using map() here caused weird behavior when gearRatio values were null, so...forEach.
    let rows = []

    drivetrain.gearRatios.forEach((gearRatio, index) => {
      let row = ChartRenderer.toDatasetRow(drivetrain, gearRatio, colors[index])
      rows.push(row)
    })

     return rows
  }


  static toDatasetRow(drivetrain, gearRatio, color) {
    let speed =
      GearingCalculator.speed(drivetrain.tireDiameter, drivetrain.finalDrive, gearRatio, drivetrain.redline);

    return {
      showLine: true,
      backgroundColor: color,
      borderColor: color,
      data: [
        { x: 0, y: 0 },
        { x: speed, y: drivetrain.redline },
      ]
    };
  }
}
