'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0 ms - answer: 0

const part1 = input => {
	const start = now()
	let result = 0;

	const data = input.split("\n");

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
