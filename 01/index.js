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
// 7 ms - answer: 272423970


const part2 = (input) => {
  let start = new Date()
  let data = input.split("\n").map(Number);

  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    for (let j = 0; j < data.length; j++) {
      const element1 = data[j];
      for (let k = 0; k < data.length; k++) {
        const element2 = data[k];

        if (element1 + element + element2 === 2020) {
          var end = new Date() - start;
          console.log('Execution time: %dms', end);
          return element * element1 * element2;
        }
      }
    }
  }
  return input;
};

module.exports = { part1, part2 };
