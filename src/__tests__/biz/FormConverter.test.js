import FormConverter from '../../biz/FormConverter.js';

test('params to drivetrain', () => {
  let params = {redline: 6800, gear0: 1.1, gear1: 2.2, gear3: ''} // Also test empty strings from empty forms.
  let actual = FormConverter.paramsToDrivetrain(params)

  let expected = {redline: 6800, gearRatios: [1.1, 2.2]}
  expect(actual).toEqual(expected);
});


test('drivetrain to params', () => {
  let drivetrain = {
    name: "mini",
    tireDiameter: 19,
    finalDrive: 3.31,
    gearRatios: [4.24, 2.54],
    redline: 6800,
  };

  let actual = FormConverter.paramsFromDrivetrain(drivetrain);

  let expected = {
    name: "mini",
    tireDiameter: 19,
    finalDrive: 3.31,
    gear0: 4.24,
    gear1: 2.54,
    gear2: "",
    gear3: "",
    gear4: "",
    gear5: "",
    redline: 6800,
  }

  expect(actual).toEqual(expected);
});
