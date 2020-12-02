'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~1333 us - answer: 548

const part1 = input => {

  const start = now()
  let count2 = 0;
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

  const end = now()
  console.log('Execution time: %dms', (end - start).toFixed(3));

  return count2
}

// Part 2
// ======
// ~950us - answer: 502

const part2 = input => {
  const start = now()
  let totalCount = 0;

  const data = input.split("\n")
  for (let i = 0; i < data.length; i++) {
    const element = data[i].split(" ");

    const req = element[0].split("-").map(Number) //2 outer bounds
    const letter = element[1][0]; //the letter
    const string = element[2]; // the string

    const a = string[req[0] - 1] === letter
    const b = string[req[1] - 1] === letter

    if ((a && !b) || (!a && b)) { //XOR
      totalCount += 1
    }
  }
  const end = now()
  console.log('Execution time: %dms', (end - start).toFixed(3));

  return totalCount
}

module.exports = { part1, part2 }
