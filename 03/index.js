'use strict'
const NanoTimer = require('nanotimer');
const timerObject = new NanoTimer();


// Part 1
// ======
// ~0 us - answer: 548

const part1 = input => {
  let result = 0;
  const end = timerObject.time(() => {
    const data = input.split("\n");

  }, '', 'u');
  console.log('Execution time: %dus', end.toPrecision(1));

  return result
}

// Part 2
// ======
// ~0 us - answer: 0

const part2 = input => {

  let result = 0;
  const end = timerObject.time(() => {
    const data = input.split("\n")

  }, '', 'u');
  console.log('Execution time: %dus', end);

  return result
}

module.exports = { part1, part2 }
