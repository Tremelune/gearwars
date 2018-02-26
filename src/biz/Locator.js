import ChartRenderer from './ChartRenderer.js';
import LineColoration from './LineColoration.js';
import Persister from './Persister.js';

// Old-school dependency injection and handling of global, stateless singletons. Allows for super simple mocking.
class Locator {
  constructor() {
    this.lineColoration = new LineColoration();
    this.chartRenderer = new ChartRenderer(this.lineColoration);
    this.persister = new Persister();
  }


  chartRenderer() {
    return this.chartRenderer;
  }

  persister() {
    return this.persister;
  }
}

export default new Locator();
