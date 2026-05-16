function toFahrenheit(c) {
  return (c * 9) / 5 + 32;
}

function toCelsius(f) {
  return ((f - 32) * 5) / 9;
}

function toKelvin(c) {
  return c + 273.15;
}

module.exports = { toFahrenheit, toCelsius, toKelvin };
