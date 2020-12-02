"use strict";
const now = require("performance-now")

// Part 1
// ======
// 1.3 ms - answer: 703131

const part1 = (input) => {
  const start = now()
  const data = input.split("\n").map(Number);
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    for (let j = 0; j < data.length; j++) {
      const element1 = data[j];
      if (element1 + element === 2020) {
        console.log('Execution time: %dms', (now() - start).toFixed(3));
        return element * element1;
      }
    }
  }
};

// Part 2
// ======
// 6.8 ms - answer: 272423970

const part2 = (input) => {
  const start = now()
  const data = input.split("\n").map(Number);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      for (let k = 0; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          console.log('Execution time: %dms', (now() - start).toFixed(3));
          return data[i] * data[j] * data[k]
        }
      }
    }
  }
};

module.exports = { part1, part2 };
