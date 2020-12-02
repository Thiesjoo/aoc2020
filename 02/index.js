'use strict'
const NanoTimer = require('nanotimer');
const timerObject = new NanoTimer();


// Part 1
// ======
// ~1333 us - answer: 548

const part1 = input => {

  let count2 = 0;
  const end = timerObject.time(() => {
    const data = input.split("\n");

    for (let i = 0; i < data.length; i++) {
      const element = data[i].split(" ");

      const req = element[0].split("-").map(Number) //2 outer bounds
      const letter = element[1][0]; //the letter
      const string = element[2]; // the string

      const count = string.split(letter).length - 1
      if (count >= req[0] && count <= req[1]) {
        count2 += 1
      }
    }

  }, '', 'u');
  console.log('Execution time: %dus', end);

  return count2
}

// Part 2
// ======
// ~950us - answer: 502

const part2 = input => {
  let count2 = 0;
  const end = timerObject.time(() => {

    const data = input.split("\n")
    for (let i = 0; i < data.length; i++) {
      const element = data[i].split(" ");

      const req = element[0].split("-").map(Number) //2 outer bounds
      const letter = element[1][0]; //the letter
      const string = element[2]; // the string

      const a = string[req[0] - 1] === letter
      const b = string[req[1] - 1] === letter

      if ((a && !b) || (!a && b)) {
        count2 += 1
      }
    }
  }, '', 'u');
  console.log('Execution time: %dus', end);

  return count2
}

module.exports = { part1, part2 }
