'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~1.32 ms - answer: 219
const req = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]

const part1 = input => {
  const start = now()

  const data = input.split("\n\n").map(x => {
    return x.replace(/\n/g, " ")
  })

  const mapped = data.map(str => {
    return str.split(" ").map(y => y.split(":")[0])
  })

  const result = mapped.filter(x => {
    const valid = true
    req.forEach(y => {
      if (x.indexOf(y) === -1) {
        valid = false
      }
    })
    return valid
  })

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result.length
}

// Part 2
// ======
// ~3.3 ms - answer: 127

const req2 = {
  "byr": { min: 1920, max: 2002 },
  "iyr": { min: 2010, max: 2020 },
  "eyr": { min: 2020, max: 2030 },
  "hgt": { special: true, "cm": { min: 150, max: 193 }, "in": { min: 59, max: 76 } },
  "hcl": { special: true, },
  "ecl": { special: true, contains: "amb blu brn gry grn hzl oth".split(" ") },
  "pid": { special: true, length: 9 }
}

const reggie = /[0-9a-f]+/

const part2 = input => {
  const start = now()

  const data = input.split("\n\n").map(x => {
    return x.replace(/\n/g, " ")
  })

  const mapped = data.map(str => {
    return str.split(" ").reduce((acc, val) => {
      const test = val.split(":")
      acc[test[0]] = test[1]
      return acc
    }, {})
  })

  const result = mapped.filter(current => {
    let valid = true
    req.forEach(y => {
      if (!current[y]) {
        valid = false
        return
      }
      const z = req2[y]

      if (z.special) {
        if (y === "hgt") {
          if (!(current[y].indexOf('in') > -1 || current[y].indexOf('cm') > -1)) {
            valid = false
            return
          }
          const type = current[y].indexOf('in') > -1 ? "in" : "cm"
          const str = current[y].substring(0, current[y].indexOf(type))

          const val = parseInt(str);
          if (val < z[type].min || val > z[type].max) {
            valid = false
            return
          }
        } else if (y === "ecl") {
          if (z.contains.indexOf(current[y]) === -1) {
            valid = false;
            return
          }
        } else if (y === "hcl") {
          if (current[y][0] !== "#") {
            valid = false
            return
          }
          if (current[y].length !== 7 || !current[y].match(reggie)) {
            valid = false
            return
          }
        } else if (y === "pid") {
          if (current[y].length !== 9 || parseInt(current[y].length) == NaN) {
            valid = false;
            return
          }
        }
      } else {
        const val = parseInt(current[y])
        if (current[y].length !== 4 || val < z.min || val > z.max) {
          valid = false
          return
        }
      }

    })
    return valid
  })

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result.length
}


module.exports = { part1, part2 }
