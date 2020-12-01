'use strict'

// Part 1
// ======

const part1 = input => {
  const start = new Date()
  const data = input.split("\n").map(Number);

  const end = new Date() - start;
  console.log('Execution time: %dms', end);
  return input
}

// Part 2
// ======

const part2 = input => {
  const start = new Date()
  const data = input.split("\n").map(Number);

  const end = new Date() - start;
  console.log('Execution time: %dms', end);
  return input
}

module.exports = { part1, part2 }
