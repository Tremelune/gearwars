// I pulled this jank math from:
// http://www.hotrod.com/articles/speed-rpm-gear-ratio-tire-size-formula/
export function speed(tireDiameter, finalDrive, gearRatio, rpm) {
  // 336.13 is magic constant used to convert inches to miles.
  const speed = (rpm * tireDiameter) / (finalDrive * gearRatio * 336.13);
  return Math.round(speed);
}
