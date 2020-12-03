'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.1 ms - answer: 265

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
  let width = map[0].length
  let height = map.length
  let result = 0

  let curr = { x: 0, y: 0 }

  while (curr.y < height) {
    let point = getPoint(map, curr.x, curr.y, width)
    if (point === "#") result++
    curr.x += slope.x
    curr.y -= slope.y
  }
  return result
}

// Part 2
// ======
// ~0.375 ms - answer: 3154761400

const part2 = input => {
  const start = now()
  let result = 0;

  const data = input.split("\n").map(x => x.split(""));

  let results = []
  //slopes

  const slopes = [{ x: 1, y: -1 }, { x: 3, y: -1 }, { x: 5, y: -1 }, { x: 7, y: -1 }, { x: 1, y: -2 }]
  slopes.forEach(x => {
    results.push(getTreesWithSlope(data, x))
  })

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return results.reduce((acc, curr) => {
    return acc * curr
  })
}


module.exports = { part1, part2 }
