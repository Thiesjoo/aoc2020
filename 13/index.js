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
	const maxDiff = diff[0];

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return maxDiff.schedule * Math.abs(maxDiff.schedule - maxDiff.time)
}

// Part 2
// ======
// ~1.2 ms - answer: 725850285300475

// Principle behind this code was gathered from reddit. Code implementation was done by me.
const part2 = input => {
	const start = now()
	const data = input.split("\n");
	const schedule = data[1].split(",").map((x, i) => {
		return { x: parseInt(x), i }
	}).filter(x => !isNaN(x.x))

	// https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
	const invm = (a, b) => a === 0 ? 0 : (b % a == 0 ? 1 : (b - Math.floor(invm(b % a, a) * b / a)))

	// https://en.wikipedia.org/wiki/Chinese_remainder_theorem
	let N = schedule.reduce((acc, val) => {
		acc = acc * val.x
		return acc
	}, 1)

	const x = schedule.reduce((acc, val) => {
		let test = val.i * Math.floor(N / val.x) * invm(Math.floor(N / val.x), val.x)
		acc += test
		return acc
	}, 0)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return (N - x % N) + 1
}

module.exports = { part1, part2 }
