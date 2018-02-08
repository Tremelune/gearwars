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
    {first: '#dd0000', last: 'ffcccc'},
    {first: '#0000dd', last: 'ccccff'},
    {first: '#00aa00', last: 'ccffcc'},
    {first: '#aa00aa', last: 'ffccff'},
    {first: '#ff8800', last: 'ffffcc'},
  ];

  let gradientRange = gradientRanges[index];

  let Rainbow = require('rainbowvis.js'); // Constant??
  let rainbow = new Rainbow();

  // We have some hard-coded colors...but if someone wants more, just give 'em something random...
  if(index < 5) {
    rainbow.setSpectrum(gradientRange.first, gradientRange.last);
  } else {
    rainbow.setSpectrum(getRandomColor(), getRandomColor());
  }

  rainbow.setNumberRange(0, count - 1);

  let colors = [];
  for(let i=0; i<count; i++) {
    colors.push(rainbow.colourAt(i)); // Dirty non-American!
  }

  return colors;
}

// Pulled from: https://stackoverflow.com/questions/1484506/random-color-generator
function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
