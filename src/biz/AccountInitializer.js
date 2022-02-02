/** This is a way to get someone started with some representative vehicle instead of a confusing blank form/chart. */
export default class AccountInitializer {
  constructor(comparisonDao) {
    this.comparisonDao = comparisonDao;
  }


  initialize() {
    let drivetrainsA = [
      {
        name: "Stock Rear gears",
        tireDiameter: 27.3, // Inches
        finalDrive: 3.31,
        gearRatios: [4.24, 2.54, 1.67, 1.24, 1, 0.7],
        redline: 6800,
      },
      {
        name: "Tall Rear Gears",
        tireDiameter: 27.3, // Inches
        finalDrive: 4.11,
        gearRatios: [4.24, 2.54, 1.67, 1.24, 1, 0.7],
        redline: 6800,
      },
    ];

    let comparisonA = {
      name: '2015 EcoBoost Mustang',
      drivetrains: drivetrainsA,
    }

    let drivetrainsB = [
      {
        name: "Tesla Model S Front Motor",
        tireDiameter: 27.7, // Inches
        finalDrive: 1,
        gearRatios: [9.34],
        redline: 18000,
      },
      {
        name: "Tesla Model S Rear Motor",
        tireDiameter: 27.7, // Inches
        finalDrive: 1,
        gearRatios: [9.71],
        redline: 18000,
      },
      {
        name: "Porsche Taycan Rear Motor",
        tireDiameter: 28.7, // Inches
        finalDrive: 1,
        gearRatios: [15.1, 8.05],
        redline: 16000,
      },
    ];

    let comparisonB = {
      name: 'EVs',
      drivetrains: drivetrainsB,
    }

    this.comparisonDao.save(comparisonA);
    this.comparisonDao.save(comparisonB);
  }
}
