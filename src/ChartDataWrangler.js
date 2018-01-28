
import * as Calculator from './GearingCalculator.js';

/**
 * Converts data into format easily chartable by Chart:
 * {options, columns, rows}
 */
export function toData(redline, gearRatios) {
  let columnNames = gearRatios.map((gearRatio, index) => {
    return 'Gear ' + (index + 1); // There is no zeroeth gear.
  });
  columnNames.unshift('x') // X-axis value corresponding to the multiple y-axis RPM values

  let columns = columnNames.map((name, index) => {
    return {type: 'number', label: name};
  });

  return {
    options: {
      hAxis: {title: 'mph'},
      vAxis: {title: 'rpm'},
    },

    columns,

    rows: [[0, 0, 0, 0, 0, 0, 0], [200, 1200, 2400, 3300, 4400, 5000, 6800]],
  }
}
