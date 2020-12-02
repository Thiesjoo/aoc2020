'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0 ms - answer: 0
const width = 10;
const dirMap = { "U": { x: 0, y: 1 }, "D": { x: 0, y: -1 }, "R": { x: 1, y: 0 }, "L": { x: -1, y: 0 } }

const part1 = input => {
  const start = now()
  const data = input.split("\n");


  let intersections = []
  let map = {}
  data.forEach((x, me) => {
    let currentPos = { x: 0, y: 0 }
    x.split(",").forEach((y) => {
      let char = y[0]
      let amount = parseInt(y.substring(1))

      for (let i = 0; i < amount; i++) {
        let xNew = currentPos.x + dirMap[char].x
        let yNew = currentPos.y + dirMap[char].y
        currentPos = { x: xNew, y: yNew }

        let curr = getPoint(map, xNew, yNew);
        if (curr !== undefined && curr !== me) {
          intersections.push({ x: xNew, y: yNew })
        }
        setPoint(map, xNew, yNew, me)
      }
    })
  })

  let distances = intersections.filter(x => !(x.x === 0 && x.y === 0)).map(x => {
    return Math.abs(x.x) + Math.abs(x.y)
  })

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return Math.min(...distances)
}

function getPoint(map, x, y) {
  return map[`${x},${y}`]
}

function setPoint(map, x, y, val) {
  map[`${x},${y}`] = val
}

// Part 2
// ======
// ~0 ms - answer: 0

const part2 = input => {
  const start = now()
  const data = input.split("\n");

  let intersections = []
  let map = {}
  data.forEach((x, me) => {
    let currentPos = { x: 0, y: 0 }
    let steps = 0;
    x.split(",").forEach((y) => {
      let char = y[0]
      let amount = parseInt(y.substring(1))

      for (let i = 0; i < amount; i++) {
        let xNew = currentPos.x + dirMap[char].x
        let yNew = currentPos.y + dirMap[char].y
        currentPos = { x: xNew, y: yNew }
        steps++

        let curr = getPoint(map, xNew, yNew);
        if (curr !== undefined && curr.player !== me) {
          intersections.push({ x: xNew, y: yNew, steps: curr.steps + steps })
        }
        setPoint(map, xNew, yNew, { steps, player: me })
      }
    })
  })

  let allSteps = intersections.map(x => x.steps)

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return Math.min(...allSteps)
}
module.exports = { part1, part2 }

