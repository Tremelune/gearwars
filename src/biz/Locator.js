import LineColoration from './LineColoration.js';

// Old-school dependency injection and handling of global, stateless singletons. Allows for super simple mocking.
class Locator {
  constructor() {
    this.lineColoration = new LineColoration();
  }


  lineColoration() {
    return this.lineColoration;
  }
}

export default new Locator();
