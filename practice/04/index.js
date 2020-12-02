'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0 ms - answer: 0
const reggie = /(11)|(22)|(33)|(44)|(55)|(66)|(77)|(88)|(99)|(00)/g

const part1 = input => {
  const start = now()
  let result = 0;

  const data = input.split("-").map(Number);

  for (let i = data[0]; i < data[1]; i++) {
    let valid = true;
    let prev = 0;
    i.toString().split("").forEach(x => {
      if (x < prev) {
        valid = false
      }
      prev = parseInt(x)
    })

    if (valid && i.toString().match(reggie)) result++
  }


  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result
}

// Part 2
// ======
// ~0 ms - answer: 0

const part2 = input => {
  const start = now()
  let result = 0;

  const data = input.split("-").map(Number);

  for (let i = data[0]; i < data[1]; i++) {
    let valid = true;
    let prev = 0;
    let str = i.toString();
    str.split("").forEach(x => {
      if (x < prev) {
        valid = false
      }
      prev = parseInt(x)
    })
    if (!valid) continue
    const count = str.split(letter).length - 1


    if (str.match(reggie)) result++
  }


  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result
}


module.exports = { part1, part2 }
