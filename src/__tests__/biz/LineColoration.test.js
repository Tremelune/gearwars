import lineColoration from '../../biz/LineColoration.js';

test('base case', () => {
  let expected = ['dd0000', 'ffcccc'];
  let actual = lineColoration.generateGradient(0,2);
  expect(actual).toEqual(expected);
});

test('interpolation', () => {
  let expected = ['0000dd', '6666ee', 'ccccff'];
  let actual = lineColoration.generateGradient(1,3);
  expect(actual).toEqual(expected);
});

// Make sure requesting more than the hardcoded gradients results in a random gradient.
test('randoms', () => {
  let gradient = lineColoration.generateGradient(10,10);
  expect(gradient.length).toBe(10);
});
