export default class LineColoration {
  constructor() {
    // Pulled from: https://github.com/anomal/RainbowVis-JS/
    let Rainbow = require('rainbowvis.js');
    this.rainbow = new Rainbow();
  }


 /**
  * Generates a gradient of hex values, from the primary color to a lighter version.
  *
  * @param primary Primary color to construct fading gradient from.
  * @param count Number of steps in the gradient (gear ratio count).
  * @return Array of hex colors: ["#000000", "#aaaaaa", "#ffffff", ...]
  */
  generateGradient(primary, count) {
    let last = this.generateEndColor(primary);

    // Issue 9 - This just doesn't like to be below 1, so...
    let end = Math.max(1, count - 1);

    // There is the potential for a race condition here, but not until we have a billion users...
    this.rainbow.setSpectrum(primary, last);
    this.rainbow.setNumberRange(0, end);

    return this.buildColorArray(count);
  }


  /**
   * Generates reasonable ending color for gradient. We choose a lighter version of the primary.
   * 
   * @param primary Color to base the final color on.
   */
  generateEndColor(primary) {
    // Create a gradient between the primary color and pure white. The count of steps provides
    // resolution. We arbitrarily choose a step near pure white that still has enough of the color
    // in it to be visible while still providing visual differences between gear ratios line colors.
    let count = 3;
    this.rainbow.setSpectrum(primary, "#ffffff");
    this.rainbow.setNumberRange(0, count);
    let colors = this.buildColorArray(count);
    return colors[count - 1];
  }


  buildColorArray(count) {
    let colors = [];
    for(let i=0; i<count; i++) {
      let color = '#' + this.rainbow.colourAt(i);
      colors.push(color);
    }
    return colors;
  }


  // When this is static, the tests fail. It doesn't need to be static, so I'm inclined not to worry about it.
  // Pulled from: https://stackoverflow.com/questions/1484506/random-color-generator
  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
