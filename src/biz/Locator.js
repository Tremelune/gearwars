import ChartRenderer from './ChartRenderer.js';
import LineColoration from './LineColoration.js';

// Old-school dependency injection and handling of global, stateless singletons. Allows for super simple mocking.
class Locator {
  constructor() {
    this.lineColoration = new LineColoration();
    this.chartRenderer = new ChartRenderer(this.lineColoration);
  }


  chartRenderer() {
    return this.chartRenderer;
  }
}

export default new Locator();
