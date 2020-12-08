'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.3 ms - answer: 1200

const part1 = input => {
	const start = now()

	const acc = runProgram(parseInput(input)).acc

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
		executed[curr] = true

		switch (data[curr].instruct) {
			case "nop":
				curr++
				break;
			case "jmp":
				curr += data[curr].value
				break;
			case "acc":
				acc += data[curr].value
				curr++
				break;
		}
	}

	return { acc, valid: !executed[curr] }
}

function parseInput(input) {
	return input.split("\n").map(x => {
		const [parsed, val] = x.split(" ")
		return { instruct: parsed, value: parseInt(val) }
	})
}

// Part 2
// ======
// ~6 ms - answer: 1023

const part2 = input => {
	const start = now()

	let data = parseInput(input)

	data.find((instruction, i) => {
		const { instruct, value } = instruction
		const jmp = instruct === "jmp"

		if (jmp || instruct === "nop") {
			data[i] = { instruct: (jmp ? "nop" : "jmp"), value }

			const result = runProgram(data);
			if (result.valid) console.log(result.acc)

			data[i] = instruction
			return result.valid
		}
	})

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
}

module.exports = { part1, part2 }
