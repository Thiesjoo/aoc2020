'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.3 ms - answer: 1200

const part1 = input => {
	const start = now()

	let acc = runProgram(input.split("\n")).acc

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return acc
}


function runProgram(data) {
	const maxLength = data.length
	let executed = {}
	let acc = 0;
	let curr = 0;

	while (curr < maxLength && !executed[curr]) {
		let [instruc, raw] = data[curr].split(" ")
		executed[curr] = true

		switch (instruc) {
			case "nop":
				curr++
				break;
			case "jmp":
				curr += parseInt(raw)
				break;
			case "acc":
				acc += parseInt(raw)
				curr++
				break;
		}
	}

	return { acc, valid: !executed[curr] }
}

// Part 2
// ======
// ~31 ms - answer: 1023

const part2 = input => {
	const start = now()

	const data = input.split("\n");
	data.find((instruction, i) => {
		let dataCopy = [...data]
		if (instruction.startsWith("nop")) {
			dataCopy[i] = "jmp" + instruction.slice(3)
		} else if (instruction.startsWith("jmp")) {
			dataCopy[i] = "nop" + instruction.slice(3)
		}
		let result = runProgram(dataCopy);
		if (result.valid) console.log(result.acc)

		return result.valid
	})

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
}


module.exports = { part1, part2 }
