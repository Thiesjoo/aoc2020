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
    let valid = true
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

const validators = {
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
    //Map the passport to an object with all property's
    return str.split(" ").reduce((acc, val) => {
      const test = val.split(":")
      acc[test[0]] = test[1]
      return acc
    }, {})
  })

  const result = mapped.filter(current => {
    let valid = true
    req.forEach(requirement => {
      if (!current[requirement]) { //Property exists?
        valid = false
        return
      }
      const validator = validators[requirement]

      if (validator.special) {
        if (requirement === "hgt") { //Parse the height value
          if (!(current[requirement].indexOf('in') > -1 || current[requirement].indexOf('cm') > -1)) {
            valid = false
            return
          }
          const type = current[requirement].indexOf('in') > -1 ? "in" : "cm"
          const str = current[requirement].substring(0, current[requirement].indexOf(type))

          const val = parseInt(str);
          if (val < validator[type].min || val > validator[type].max) {
            valid = false
            return
          }
        } else if (requirement === "ecl" && (validator.contains.indexOf(current[requirement]) === -1)) { //Check if eye color is in the list
          valid = false;
          return
        } else if (requirement === "hcl" && (current[requirement].length !== 7 || current[requirement][0] !== "#" || !current[requirement].match(reggie))) { //Check the hex color using a regex`, but first check length and first char
          valid = false
          return

        } else if (requirement === "pid" && (current[requirement].length !== 9 || parseInt(current[requirement].length) == NaN)) {
          valid = false;
          return
        }
      } else {
        const val = parseInt(current[requirement])
        if (current[requirement].length !== 4 || val < validator.min || val > validator.max) {
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
