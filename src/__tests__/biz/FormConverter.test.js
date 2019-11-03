import FormConverter from '../../biz/FormConverter.js';

test('params to drivetrain', () => {
  let drivetrain = {redline: 6800, gear0: 1.1, gear1: 2.2, gear3: ''} // Also test empty strings from empty forms.
  let actual = FormConverter.paramsToDrivetrain(drivetrain)

  let expected = {redline: 6800, gearRatios: [1.1, 2.2]}
  expect(actual).toEqual(expected);
});
