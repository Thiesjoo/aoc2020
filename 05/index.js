'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.8 ms - answer: 951

const part1 = input => {
	const start = now()

	const data = input.split("\n");
	const allSeats = getAllSeatIds(data)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return Math.max(...allSeats)
}

function getAllSeatIds(data) {
	return data.map(dataInp => {
		//Just parse the values into binary to get the correct value
		return parseInt(dataInp.replace(/[FL]/g, "0").replace(/[BR]/g, "1"), 2)
	})
}

// Part 2
// ======
// ~1.4 ms - answer: 653

const part2 = input => {
	const start = now()

	const data = input.split("\n");
	const allSeats = getAllSeatIds(data)

	const maxLen = Math.max(...allSeats)
	let missing = []

	for (let i = 0; i < maxLen; i++) {
		if (!allSeats.includes(i + 1)) {
			missing.push(i + 1)
		}
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return missing[missing.length - 1]
}


module.exports = { part1, part2 }
