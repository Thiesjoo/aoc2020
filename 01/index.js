"use strict";

// Part 1
// ======
// 2 ms - answer: 703131

const part1 = (input) => {
  let start = new Date()
  let data = input.split("\n").map(Number);

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    for (let j = 0; j < data.length; j++) {
      const element1 = data[j];
      if (element1 + element === 2020) {
        var end = new Date() - start;
        console.log('Execution time: %dms', end);
        return element * element1;
      }
    }
  }
};

// Part 2
// ======
// 6 ms - answer: 272423970

const part2 = (input) => {
  const start = new Date()
  const data = input.split("\n").map(Number);

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      for (let k = 0; k < data.length; k++) {
        if (data[i] + data[j] + data[k] === 2020) {
          var end = new Date() - start;
          console.log('Execution time: %dms', end);
          return data[i] * data[j] * data[k]
        }
      }
    }
  }
};

module.exports = { part1, part2 };
