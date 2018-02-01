/**
 * Getting form values into an array is weird...I'm doing explicit conversion here. This feels stupid. It also feels
 * like it should very much be unit tested.
 *
 * This should also be a class with 'gear' as a constant, etc, etc...
 */

 /**
 * From: {redline: 6800, gearRatios: [1.1, 2.2]}
 * To: {redline: 6800, gear0: 1.1, gear2: 2.2}
 */
export function paramsFromDrivetrain(drivetrain) {
  let params = {
    tireDiameter: drivetrain.tireDiameter,
    finalDrive: drivetrain.finalDrive,
    redline: drivetrain.redline,
  }

  // Turn the array of gears into individual key/value pairs.
  for(let i=0; i<drivetrain.gearRatios.length; i++) {
    let key = 'gear' + i;
    params[key] = drivetrain.gearRatios[i];
  }

  return params;
}

/**
 * From: {redline: 6800, gear0: 1.1, gear2: 2.2}
 * To: {redline: 6800, gearRatios: [1.1, 2.2]}
 */
export function paramsToDrivetrain(params) {
  let drivetrain = {gearRatios: []};

  // Loop through all params, if it's 'gear0', gear1' etc, convert it to an array under 'gearRatios'.
  // Absolutely has to be a better way to do all this.
  for (let key in params) {
    if (params.hasOwnProperty(key)) { // Don't include system params.
      if(key.startsWith('gear')) {
        let split = key.split('gear');
        let index = split[split.length - 1];
        drivetrain.gearRatios[index] = params[key];
      } else {
        drivetrain[key] = params[key]; // Normal param...Copy it over.
      }
    }
  }

  return drivetrain;
}
