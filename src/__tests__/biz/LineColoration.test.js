import LineColoration from '../../biz/LineColoration.js';

let underTest = new LineColoration();

test('generateGradient base case', () => {
  let expected = ['#dd0000', '#ee8080'];
  let actual = underTest.generateGradient("#dd0000",2);
  expect(actual).toEqual(expected);
});

test('generateGradient interpolation', () => {
  let expected = ['#dd0000', '#e64040', '#ee8080'];
  let actual = underTest.generateGradient("#dd0000",3);
  expect(actual).toEqual(expected);
});

// Issue 9 - Make sure this doesn't explode with no gears to display.
test('generateGradient gearless', () => {
  let expected = [];
  let actual = underTest.generateGradient("#ffffff",0);
  expect(actual).toEqual(expected);
});
