'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.047 ms - answer: 4207

const part1 = input => {
	const start = now()
	const data = input.split("\n");

	let time = parseInt(data[0])
	let schedule = data[1].split(",").filter(x => x !== "x").map(Number)

	let diff = schedule.map(x => {
		return {
			schedule: x,
			time: time % x
		}
	});
	diff.sort((a, b) => b.time - a.time)
	let maxDiff = diff[0];

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return maxDiff.schedule * Math.abs(maxDiff.schedule - maxDiff.time)
}

// Part 2
// ======
// ~0 ms - answer: 0

const part2 = input => {
	const start = now()
	const data = input.split("\n");
	let schedule = data[1].split(",").map(Number)
	console.log(schedule)

	const adding = schedule[0];

	let found = null;
	let index = adding * 100000000000000;
	while (!found) {
		index += adding
		found = schedule.every((x, i) => {
			return isNaN(x) || (index + i) % x === 0
		})
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return index
}

module.exports = { part1, part2 }
