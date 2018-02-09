import GearingCalculator from '../../biz/GearingCalculator.js';

test('speed', () => {
  let expected = 128;
  let actual = GearingCalculator.speed(26, 4.11, 1, 6800);
  expect(actual).toEqual(expected);
});

test('diameter', () => {
  let tire = {
    wheelDiameter: 17,
    width: 235,
    aspectRatio: 40,
  }

  let expected = 24.4;
  let actual = GearingCalculator.diameter(tire);
  expect(actual).toEqual(expected);
});
