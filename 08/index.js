'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.3 ms - answer: 1200

const part1 = input => {
	const start = now()

	const acc = runProgram(input.split("\n")).acc

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
		const [instruct, raw] = data[curr].split(" ")
		executed[curr] = true

		switch (instruct) {
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
// ~17 ms - answer: 1023

const part2 = input => {
	const start = now()

	const data = input.split("\n");
	data.find((instruction, i) => {
		const nop = instruction.startsWith("nop");
		const jmp = instruction.startsWith("jmp")

		if (nop || jmp) {
			const val = instruction.slice(3);

			data[i] = (jmp ? "nop" : "jmp") + val
			const result = runProgram(data);
			if (result.valid) console.log(result.acc)

			data[i] = (jmp ? "jmp" : "nop") + val
			return result.valid
		}
	})

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
}

module.exports = { part1, part2 }
