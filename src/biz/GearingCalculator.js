// I pulled this jank math from:
// http://www.hotrod.com/articles/speed-rpm-gear-ratio-tire-size-formula/
export function speed(tireDiameter, finalDrive, gearRatio, rpm) {
  // 336.13 is magic constant used to convert inches to miles.
  const speed = (rpm * tireDiameter) / (finalDrive * gearRatio * 336.13);
  return Math.round(speed);
}

/**
 * Math pulled from: https://www.pepboys.com/tires/treadsmart/tire_size_calculator/
 *
 * @param tire Example data for 235/40-17 tire: {
 *   wheelDiameter: 17, // Inches
 *   width: 235, // Millimeters
 *   aspectRatio: 40, // Millimeters
 * }
 */
export function diameter(tire) {
  let aspect = tire.aspectRatio / 100;
  let numer = tire.width * aspect * 2;
  let tireThickness = numer / 25.4; // Convert to inches...
  let diameter = tireThickness + tire.wheelDiameter;
  return Number(diameter.toFixed(1));
}
