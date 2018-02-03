/**
 * Gradient generator pulled from: https://github.com/anomal/RainbowVis-JS/
 *
 * This should be a class...A singleton, even...
 */

/**
 * Generates a gradient of hex values from a constant range of colors.
 *
 * @param index Which gradient color scheme to use (form index works).
 * @param count Number of steps (0-3) in the gradient (drivetrain count).
 * @return Array of hex colors: [#000000, #aaaaaa, #ffffff]
 */
export function generateGradient(index, count) {
  // This should be a class-level constant...
  const gradientRanges = [
    {first: '#ff0000', last: 'ffcccc'},
    {first: '#0000ff', last: 'ccccff'},
    {first: '#00ff00', last: 'ccffcc'},
  ];

  let gradientRange = gradientRanges[index];

  let Rainbow = require('rainbowvis.js'); // Constant??
  let rainbow = new Rainbow();
  rainbow.setSpectrum(gradientRange.first, gradientRange.last);
  rainbow.setNumberRange(0, count - 1);

  let colors = [];
  for(let i=0; i<count; i++) {
    colors.push(rainbow.colourAt(i)); // Dirty non-American!
  }

  return colors;
}
