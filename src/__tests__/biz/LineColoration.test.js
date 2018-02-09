const LineColoration = require('./LineColoration');

test('base case', () => {
  let expected = ['#dd0000', '#ffcccc']};
  let actual = LineColoration.generateGradient(1, 2);
  expect(actual).toBe(expected);
});
