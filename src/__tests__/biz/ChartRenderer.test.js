import { assert } from 'console';
import ChartRenderer from '../../biz/ChartRenderer.js';
const util = require('util')

test('generate line colors', () => {
  let drivetrains = [
    {gearRatios: [4.236, 1]},
    {gearRatios: [2.538, 1]},
  ];

  let underTest = new ChartRenderer(new MockColoration());
  let actual = underTest.generateLineColors(drivetrains);
  let expected = ["000000", "ffffff", "000000", "ffffff"];
  expect(actual).toEqual(expected);
});


test('build data from drivetrains', () => {
  let drivetrains = [
    {
      tireDiameter: 27.3,
      finalDrive: 3.31,
      gearRatios: [4.236],
      redline: 6800,
    },
    {
      tireDiameter: 33,
      finalDrive: 4.11,
      gearRatios: [4.236, 2.538],
      redline: 6200,
    },
  ];

  let expected = [
    {
      showLine: true,
      backgroundColor: '000000',
      borderColor: '000000',
      data: [{"x": 0, "y": 0}, {"x": 39, "y": 6800}],
    },
    {
      showLine: true,
      backgroundColor: '000000',
      borderColor: '000000',
      data: [{"x": 0, "y": 0}, {"x": 35, "y": 6200}],
    },
    {
      showLine: true,
      backgroundColor: 'ffffff',
      borderColor: 'ffffff',
      data: [{"x": 0, "y": 0}, {"x": 58, "y": 6200}],
    },
  ];

  let underTest = new ChartRenderer(new MockColoration());
  let actual = underTest.buildDataFromDrivetrains(drivetrains);
  expect(actual).toEqual(expected);
});


// Issue 9.
test('build data from drivetrains with "holes"', () => {
  let drivetrains = [
    {
      tireDiameter: 10,
      finalDrive: 1,
      gearRatios: [null, 2],
      redline: 1000,
    },
  ];

  let expected = [
    {
      showLine: true,
      backgroundColor: '000000',
      borderColor: '000000',
      data: [{"x": 0, "y": 0}, {"x": Infinity, "y": 1000}],
    },
    {
      showLine: true,
      backgroundColor: 'ffffff',
      borderColor: 'ffffff',
      data: [{"x": 0, "y": 0}, {"x": 15, "y": 1000}],
    },
  ];

  let underTest = new ChartRenderer(new MockColoration());
  let actual = underTest.buildDataFromDrivetrains(drivetrains);
  expect(actual).toEqual(expected);
});


test('get highest redline', () => {
  let comparison = {
    drivetrains: [
      {redline: 4000},
      {redline: 5001} // Make sure it rounds up, too
    ]
  }
  expect(6000).toEqual(ChartRenderer.calculateHighestRedline(comparison));
});


class MockColoration {
  generateGradient(index, count) {
    return ['000000', 'ffffff'];
  }
}
