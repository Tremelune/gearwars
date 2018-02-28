/** This is a way to get someone started with some representative vehicle instead of a confusing blank form/chart. */
export default class AccountInitializer {
  constructor(comparisonDao) {
    this.comparisonDao = comparisonDao;
  }


  initialize() {
    let comparison = this.buildInitialComparison();
    this.comparisonDao.save(comparison);
  }

  buildInitialComparison() {
    let drivetrains = [{
      name: "2015 EcoBoost Mustang",
      tireDiameter: 27.3, // Inches
      finalDrive: 3.31,
      gearRatios: [4.236, 2.538, 1.665, 1.238, 1, 0.704],
      redline: 6800,
    }];

    return {
      name: 'Default',
      drivetrains: drivetrains,
    }
  }
}
