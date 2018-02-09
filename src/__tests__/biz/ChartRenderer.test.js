import ChartRenderer from '../../biz/ChartRenderer.js';

test('build data from drivetrains', () => {
  let drivetrains = [
    {
      name: "Mustang",
      tireDiameter: 27.3,
      finalDrive: 3.31,
      gearRatios: [4.236],
      redline: 6800,
    },
    {
      name: "Jeep",
      tireDiameter: 33,
      finalDrive: 4.11,
      gearRatios: [4.236, 2.538],
      redline: 6200,
    },
  ];

  let expected = [
    [{"x": 0, "y": 0}, {"x": 39, "y": 6800}],
    [{"x": 0, "y": 0}, {"x": 35, "y": 6200}],
    [{"x": 0, "y": 0}, {"x": 58, "y": 6200}],   
  ];

  let actual = ChartRenderer.buildDataFromDrivetrains(drivetrains);
  expect(actual).toEqual(expected);
});

test('calculate dimensions', () => {
  let expected = {width: 800, height: 450};
  let actual = ChartRenderer.calculateDimensions(800, 800);
  expect(actual).toEqual(expected);
});

test('calculate dimensions constrains to height', () => {
  let expected = {width: 1138, height: 640};
  let actual = ChartRenderer.calculateDimensions(8000, 800);
  expect(actual).toEqual(expected);
});
