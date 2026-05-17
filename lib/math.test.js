'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { add, subtract, multiply, divide } = require('./math');

test('add', async (t) => {
  await t.test('sums two positive numbers', () => {
    assert.equal(add(2, 3), 5);
  });

  await t.test('handles negatives and zero', () => {
    assert.equal(add(-4, 4), 0);
    assert.equal(add(0, 0), 0);
  });

  await t.test('throws TypeError for non-number input', () => {
    assert.throws(() => add('1', 2), TypeError);
    assert.throws(() => add(1, null), TypeError);
    assert.throws(() => add(1, NaN), TypeError);
  });
});

test('subtract', async (t) => {
  await t.test('subtracts two positive numbers', () => {
    assert.equal(subtract(10, 4), 6);
  });

  await t.test('handles negatives', () => {
    assert.equal(subtract(-3, -3), 0);
    assert.equal(subtract(0, 5), -5);
  });

  await t.test('throws TypeError for non-number input', () => {
    assert.throws(() => subtract(undefined, 1), TypeError);
    assert.throws(() => subtract(1, {}), TypeError);
  });
});

test('multiply', async (t) => {
  await t.test('multiplies two positive numbers', () => {
    assert.equal(multiply(3, 4), 12);
  });

  await t.test('handles zero and negatives', () => {
    assert.equal(multiply(0, 100), 0);
    assert.equal(multiply(-2, 5), -10);
  });

  await t.test('throws TypeError for non-number input', () => {
    assert.throws(() => multiply('3', 4), TypeError);
    assert.throws(() => multiply(3, true), TypeError);
  });
});

test('divide', async (t) => {
  await t.test('divides two positive numbers', () => {
    assert.equal(divide(10, 2), 5);
  });

  await t.test('handles negatives and fractional results', () => {
    assert.equal(divide(-9, 3), -3);
    assert.equal(divide(1, 4), 0.25);
  });

  await t.test('throws Error on divide-by-zero', () => {
    assert.throws(() => divide(1, 0), { name: 'Error', message: /zero/i });
  });

  await t.test('throws TypeError for non-number input', () => {
    assert.throws(() => divide('10', 2), TypeError);
    assert.throws(() => divide(10, []), TypeError);
  });
});
