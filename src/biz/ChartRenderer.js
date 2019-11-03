import GearingCalculator from './GearingCalculator.js';

export default class ChartRenderer {
  constructor(lineColoration) {
    this.lineColoration = lineColoration;
  }


 /**
  * Converts drivetrains to chart data, and combines them in a single array. The data structure matches that used by
  * our chart library in Chart.js.
  */
  static buildDataFromDrivetrains(drivetrains) {
    // This seems a bit weird, but I didn't know how to append in a map().
    let combinedData = [];
    drivetrains.forEach((drivetrain, index) => {
      let data = this.toData(drivetrain);
      Array.prototype.push.apply(combinedData, data);
      return null;
    })
    return combinedData;
  }


  static calculateDimensions(windowWidth, windowHeight) {
    let width = windowWidth;
    let height = Math.round(width * 9 / 16); // Arbitrary aspect ratio...

    let reasonableMaxHeight = windowHeight * 0.8;
    if(height > reasonableMaxHeight) {
      height = reasonableMaxHeight;
      width = Math.round(height * 16 / 9);
    }

    return {
      width: width,
      height: height,
    }
  }


  /** Gets highest redline within a comparison (to the nearest 1,000, rounded up). */
  static calculateHighestRedliine(comparison) {
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


 /**
  * Converts data into format easily chartable by Chart:
  * [
  *   [{x: 0, y: 0}, {x: 200, y: 6800}],
  *   [{x: 0, y: 0}, {x: 150, y: 6800}]
  * ]
  */
  static toData(drivetrain) {
    return drivetrain.gearRatios.map((gearRatio, index) => {
      let speed =
        GearingCalculator.speed(drivetrain.tireDiameter, drivetrain.finalDrive, gearRatio, drivetrain.redline);
      return [{x: 0, y: 0}, {x: speed, y: drivetrain.redline}];
    });
  }
}
