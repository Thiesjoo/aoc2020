'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.15 ms - answer: 265

const part1 = input => {
  const start = now()

  const data = input.split("\n").map(x => x.split(""));

  const slope = { x: 3, y: -1 }
  const result = getTreesWithSlope(data, slope)

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result
}

function getPoint(map, x, y, width) {
  return map[y][x % width]
}

function getTreesWithSlope(map, slope) {
  const width = map[0].length
  const height = map.length
  let result = 0

  let x = 0;
  let y = 0;

  while (y < height) {
    let point = getPoint(map, x, y, width)
    if (point === "#") result++
    x += slope.x
    y -= slope.y
  }
  return result
}

// Part 2
// ======
// ~0.300 ms - answer: 3154761400

const part2 = input => {
  const start = now()
  const data = input.split("\n").map(x => x.split(""));

  const slopes = [{ x: 1, y: -1 }, { x: 3, y: -1 }, { x: 5, y: -1 }, { x: 7, y: -1 }, { x: 1, y: -2 }]

  const result = slopes.map(x => {
    return getTreesWithSlope(data, x)
  }).reduce((acc, curr) => {
    return acc * curr
  })

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result
}


module.exports = { part1, part2 }
