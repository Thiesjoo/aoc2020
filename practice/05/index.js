'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0 ms - answer: 0

const part1 = input => {
  const start = now()
  let result = 0;

  // input = "1101,100,-1,4,0"
  let program = input.split(",").map(Number)
  console.log(program)

  const inputVar = 1;

  let curr = 0;

  whil:
  while (curr < program.length) {
    let unparsed = program[curr].toString();
    let opCode = parseInt(unparsed.slice(-2))

    let everythingElse = unparsed.substring(0, unparsed.indexOf(unparsed.slice(-2)));
    let modes = everythingElse.padStart(3, "0")

    let paramValues = { st: modes[2] === "1" ? program[curr + 1] : program[program[curr + 1]], nd: modes[1] === "1" ? program[curr + 2] : program[program[curr + 2]], rd: modes[0] === "1" ? program[curr + 3] : program[program[curr + 3]] }


    console.log("Raw: ", unparsed, "op: ", opCode, "modes:", modes, "final params:", paramValues)

    switch (opCode) {
      case 1:
        //ADD
        program[program[curr + 3]] = paramValues.st + paramValues.nd
        console.log(program[program[curr + 3]])

        curr += 4
        break;

      case 2:
        //MULTI
        program[program[curr + 3]] = paramValues.st * paramValues.nd
        console.log(program[curr + 3], ":", program[program[curr + 3]])

        curr += 4
        break;
      case 3:
        //INPUT
        program[program[curr + 1]] = inputVar;
        console.log(program[program[curr + 1]])
        curr += 2
        break;
      case 4:
        //OUTPUT
        console.log("OUT: ", program[paramValues.st])
        curr += 2
        break;
      case 99:
        break whil;
    }
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

  const data = input.split("\n");

  const end = now()
  console.log('Execution time: ~%dms', (end - start).toFixed(3));

  return result
}


module.exports = { part1, part2 }
