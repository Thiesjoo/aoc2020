'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~50 ms - answer: 206

const part1 = input => {
	const start = now()

	const data = input.split(",").map(Number);
	let turns = [...data]

	for (let i = data.length; i < 2020; i++) {
		let index = turns.map((x, i) => {
			return { x, i }
		}).filter(x => x.x === turns[i - 1])
		if (index.length > 1) {
			let last = index.length - 1
			turns.push(index[last].i - index[last - 1].i)
		} else {
			turns.push(0)
		}
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
	return turns[turns.length - 1]
}

// Part 2
// ======
// ~0 ms - answer: 0

const part2 = input => {
	const start = now()

	let prev = 0
	let info = {};

	const data = input.split(",").map(Number)

	data.forEach((x, i) => {
		info[x] = [i]
		prev = x
	})
	console.log(info)

	for (let i = data.length; i < 30000000; i++) {
		let index = info[prev]
		if (index === undefined) {
			info[prev] = []
		}
		// console.log("Turn:", i + 1, "prev val: ", prev, "prev indexes", index)
		if (index && index.length > 1) {
			let res = index[index.length - 1] - index[index.length - 2] //Get diff between last two4
			if (!info[res]) info[res] = []
			info[res].push(i)
			prev = res
		} else {
			info[0].push(i)
			prev = 0;
		}
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
	return prev
}

module.exports = { part1, part2 }
