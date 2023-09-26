import ComparisonDao from '../data/ComparisonDao.ts';
import Datamabase from '../data/Datamabase.js';

import AccountInitializer from './AccountInitializer.ts';
import ChartRenderer from './ChartRenderer.js';
import LineColoration from './LineColoration.js';

/**
 * Old-school dependency injection and handling of global, stateless singletons. Allows for super simple mocking.
 * May want one of these each per-tier, but I already feel like I'm reinventing the wheel here...
 */
class Locator {
  constructor() {
    // Data
    this.db = new Datamabase(localStorage); // Magic localStorage injection!
    this.comparisonDao = new ComparisonDao(this.db, Datamabase.typeComparisons);

    // Business
    this.accountInitializer = new AccountInitializer(this.comparisonDao);
    this.lineColoration = new LineColoration();
    this.chartRenderer = new ChartRenderer(this.lineColoration);

    this.init();
  }


  init() {
    console.log("Initializing database...");
    this.db.init();
  }
}

export default new Locator();
