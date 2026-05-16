const test = require('node:test');
const assert = require('node:assert');
const { toFahrenheit, toCelsius, toKelvin } = require('./temperature');

test('toFahrenheit: 0°C is 32°F', () => {
  assert.strictEqual(toFahrenheit(0), 32);
});

test('toFahrenheit: 100°C is 212°F', () => {
  assert.strictEqual(toFahrenheit(100), 212);
});

test('toFahrenheit: -40°C is -40°F', () => {
  assert.strictEqual(toFahrenheit(-40), -40);
});

test('toCelsius: 32°F is 0°C', () => {
  assert.strictEqual(toCelsius(32), 0);
});

test('toCelsius: 212°F is 100°C', () => {
  assert.strictEqual(toCelsius(212), 100);
});

test('toCelsius: -40°F is -40°C', () => {
  assert.strictEqual(toCelsius(-40), -40);
});

test('toKelvin: 0°C is 273.15K', () => {
  assert.strictEqual(toKelvin(0), 273.15);
});

test('toKelvin: 100°C is 373.15K', () => {
  assert.strictEqual(toKelvin(100), 373.15);
});

test('toKelvin: -273.15°C is 0K (absolute zero)', () => {
  assert.strictEqual(toKelvin(-273.15), 0);
});
