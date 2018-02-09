import LineColoration from '../../biz/LineColoration.js';

test('base case', () => {
  let expected = ['dd0000', 'ffcccc'];
  let actual = LineColoration.generateGradient(0,2);
  expect(actual).toEqual(expected);
});
