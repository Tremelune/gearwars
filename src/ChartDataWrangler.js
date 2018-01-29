/**
 * Converts data into format easily chartable by Chart:
 * {options, columns, rows}
 */
export function toData(redline, gearRatios) {
  // Oh, actually, this does nothing...
  return {
    options: {
      hAxis: {title: 'mph', minValue: 0, maxValue: 200},
      vAxis: {title: 'rpm', minValue: 0, maxValue: 6800},
    },

    columns: [
      {type: 'number', label: 'x'},
      {type: 'number', label: 'Sixth'},
      {type: 'number', label: 'Fifth'},
    ],

    rows: [[0, 0, 0], [200, 5000, 6800]],
  }
}
