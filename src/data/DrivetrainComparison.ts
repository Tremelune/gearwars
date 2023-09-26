interface Drivetrain {
  name: string,
  tireDiameter: number, // Inches
  finalDrive: number,
  gearRatios: Array<number>,
  redline: number,
  color: string,
}


interface Comparison {
    name: string,
    drivetrains: Array<Drivetrain>,
}
