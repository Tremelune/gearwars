const KEY_GEAR = 'gear'; // Is there a way to make this private?

class FormConverter {
 /**
  * Getting form values into an array is weird...I'm doing explicit conversion here. This feels stupid. It also feels
  * like it should very much be unit tested.
  *
  * From: {redline: 6800, gearRatios: [1.1, 2.2]}
  * To: {redline: 6800, gear0: 1.1, gear2: 2.2}
  */
  static paramsFromDrivetrain(drivetrain) {
    let params = {};

    // Copy all the non-gear-ratio stuff over.
    for(let key in drivetrain) {
      if (drivetrain.hasOwnProperty(key)) { // Don't include system params.
        if(key !== 'gearRatios') { // This seems very coincidental with a drivetrain's structure. I don't like it.
          params[key] = drivetrain[key];
        }
      }
    }

    // Turn the array of gears into individual key/value pairs.
    for(let i=0; i<drivetrain.gearRatios.length; i++) {
      let key = KEY_GEAR + i;
      params[key] = drivetrain.gearRatios[i];
    }

    return params;
  }

 /**
  * Getting form values into an array is weird...I'm doing explicit conversion here. This feels stupid. It also feels
  * like it should very much be unit tested.
  *
  * From: {redline: 6800, gear0: 1.1, gear2: 2.2}
  * To: {redline: 6800, gearRatios: [1.1, 2.2]}
  */
  static paramsToDrivetrain(params) {
    let drivetrain = {gearRatios: []};

    // Loop through all params, if it's 'gear0', gear1' etc, convert it to an array under 'gearRatios'.
    // Absolutely has to be a better way to do all this.
    for (let key in params) {
      if (params.hasOwnProperty(key)) { // Don't include system params.
        if(key.startsWith(KEY_GEAR)) {
          let split = key.split(KEY_GEAR);
          let index = split[split.length - 1];
          drivetrain.gearRatios[index] = params[key];
        } else {
          drivetrain[key] = params[key]; // Normal param...Copy it over.
        }
      }
    }

    return drivetrain;
  }

 /**
  * Converts tire size string (ex: "235/40-17") to a tire object:
  * {
  *   width: 235,
  *   aspectRatio: 40,
  *   wheelDiameter: 17,
  * }
  */
  static parseTire(size) {
    let sizes = size.split("/");
    let width = sizes[0];
    sizes = sizes[1].split('-');
    let aspectRatio = sizes[0];
    let wheelDiameter = sizes[1];
    return {
      width: parseInt(width, 10),
      aspectRatio: parseInt(aspectRatio, 10),
      wheelDiameter: parseInt(wheelDiameter, 10),
    }
  }
}

export default FormConverter;
