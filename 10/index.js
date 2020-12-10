'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.05 ms - answer: 1876

const part1 = input => {
	const start = now()

	const data = input.split("\n").map(Number)
	data.sort((a, b) => a - b)

	let ones = 0;
	let threes = 1;

	let prev = 0;

	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		let diff = Math.abs(element - prev);
		if (diff === 1) {
			ones++
		} else if (diff === 3) {
			threes++
		} else {
			console.log("No chain found")
			return
		}

		prev = data[i]
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
	return ones * threes
}

// Part 2
// ======
// ~0.14 ms - answer: 14173478093824

const part2 = input => {
	const start = now()
	const data = input.split("\n").map(Number);

	data.sort((a, b) => a - b)
	data.push(data[data.length - 1] + 3) //Add the final number

	let lengthMap = {}
	lengthMap[0] = 1

	for (let j = 0; j < data.length; j++) {
		const value = data[j];
		[lengthMap[value - 1], lengthMap[value - 2], lengthMap[value - 3]].forEach(x => {
			if (x) {
				if (!lengthMap[value]) lengthMap[value] = 0
				lengthMap[value] += x
			}
		})
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return lengthMap[data[data.length - 1]]
}

module.exports = { part1, part2 }
