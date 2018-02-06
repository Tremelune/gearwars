import * as Calculator from './GearingCalculator.js';

/**
 * Converts data into format easily chartable by Chart:
 * [
 *   [{x: 0, y: 0}, {x: 200, y: 6800}],
 *   [{x: 0, y: 0}, {x: 150, y: 6800}]
 * ]
 */
export function toData(drivetrain) {
  return drivetrain.gearRatios.map((gearRatio, index) => {
    let speed = Calculator.speed(drivetrain.tireDiameter, drivetrain.finalDrive, gearRatio, drivetrain.redline);
    return [{x: 0, y: 0}, {x: speed, y: drivetrain.redline}];
  });
}
