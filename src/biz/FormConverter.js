const KEY_GEAR = 'gear'; // Is there a way to make this private?

export default class FormConverter {
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
    for (let i = 0; i < 6; i++) {
      let key = KEY_GEAR + i;

      // React uses shallow merging when setting state, such that if gear5 has a value, but no gear5
      // is explicitly specified, the gear5 value from the previous state will live on. You wind up
      // with ghost gears from one comparison to the next.
      //
      // When we convert a drivetrain to a form param, we need to make sure that we explicitly include
      // every form field (gear5, gear4, etc), even if there is no value in the drivetrain. This will
      // ensure the values in teh form that aren't in the drivetrain are blanked out.
      //
      // This will cause problems if we ever make the number of gear ratio fields dynamic.
      if (i < drivetrain.gearRatios.length) {
        params[key] = drivetrain.gearRatios[i];
      } else {
        params[key] = '';
      }
    }

    return params;
  }

 /**
  * Getting form values into an array is weird...I'm doing explicit conversion here. This feels stupid.
  *
  * From: {redline: 6800, gear0: 1.1, gear1: 2.2}
  * To: {redline: 6800, gearRatios: [1.1, 2.2]}
  */
  static paramsToDrivetrain(params) {
    let drivetrain = {gearRatios: []};

    // Loop through all params, if it's 'gear0', gear1' etc, convert it to an array under 'gearRatios'.
    // Absolutely has to be a better way to do all this.
    for (let key in params) {
      if (params.hasOwnProperty(key)) { // Don't include system params.
        if(key.startsWith(KEY_GEAR)) {
          let ratio = params[key]

          // Get rid of any empty strings...
          if(ratio > 0) {
            let split = key.split(KEY_GEAR);
            let index = split[split.length - 1];
            drivetrain.gearRatios[index] = ratio;
          }
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
