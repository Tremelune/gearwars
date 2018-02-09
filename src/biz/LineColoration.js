const GRADIENT_RANGES = [
  {first: '#dd0000', last: '#ffcccc'},
  {first: '#0000dd', last: '#ccccff'},
  {first: '#00aa00', last: '#ccffcc'},
  {first: '#aa00aa', last: '#ffccff'},
  {first: '#ff8800', last: '#ffffcc'},
];


class LineColoration {
  constructor() {
    // Pulled from: https://github.com/anomal/RainbowVis-JS/
    let Rainbow = require('rainbowvis.js');
    this.rainbow = new Rainbow();
  }


 /**
  * Generates a gradient of hex values.
  *
  * @param index Which gradient color scheme to use (drivetrain form index works).
  * @param count Number of steps in the gradient (drivetrain count). The first five gradients are hardcoded. Subsequent
  * gradients are generated at random.
  * @return Array of hex colors: [#000000, #aaaaaa, #ffffff, ...]
  */
  generateGradient(index, count) {
    // We have some hard-coded colors...but if someone wants more, just give 'em something random...
    let first;
    let last;
    if(index < GRADIENT_RANGES.length) {
      let range = GRADIENT_RANGES[index];
      first = range.first;
      last = range.last;
    } else {
      first = this.getRandomColor();
      last = this.getRandomColor();
    }

    this.rainbow.setSpectrum(first, last);
    this.rainbow.setNumberRange(0, count - 1);

    let colors = [];
    for(let i=0; i<count; i++) {
      colors.push(this.rainbow.colourAt(i)); // Dirty non-American!
    }

    return colors;
  }

  // Pulled from: https://stackoverflow.com/questions/1484506/random-color-generator
  static getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}

export default new LineColoration();
