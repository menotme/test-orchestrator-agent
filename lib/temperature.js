function assertNumber(value, name) {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    throw new TypeError(`${name} must be a number`);
  }
}

function toFahrenheit(c) {
  assertNumber(c, 'c');
  return (c * 9) / 5 + 32;
}

function toCelsius(f) {
  assertNumber(f, 'f');
  return ((f - 32) * 5) / 9;
}

function toKelvin(c) {
  assertNumber(c, 'c');
  return c + 273.15;
}

module.exports = { toFahrenheit, toCelsius, toKelvin };
