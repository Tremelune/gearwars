import ChartRenderer from './ChartRenderer.js';
import LineColoration from './LineColoration.js';

import ComparisonDao from '../data/ComparisonDao.js';
import Datamabase from '../data/Datamabase.js';

// Old-school dependency injection and handling of global, stateless singletons. Allows for super simple mocking.
// May want one of these each per-tier, but I already feel like I'm reinventing the wheel here...
class Locator {
  constructor() {
    // Business
    this.lineColoration = new LineColoration();
    this.chartRenderer = new ChartRenderer(this.lineColoration);

    // Data
    this.db = new Datamabase(localStorage); // Magic localStorage injection!
    this.comparisonDao = new ComparisonDao(this.db, Datamabase.typeComparisons);

    this.init();
  }


  init() {
    console.log("Initializing database...");
    this.db.init();
  }
}

export default new Locator();
