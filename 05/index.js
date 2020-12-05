'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~1.1 ms - answer: 951
const part1 = input => {
	const start = now()

	const data = input.split("\n");

	const allSeats = getAllSeats(data)
	allSeats.sort((a, b) => b - a)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return allSeats[0]
}

function getAllSeats(data) {
	return data.map(dataInp => {
		//Just parse the values into binary to get the correct value
		let maxY = parseInt(dataInp.substr(0, 7).replace(/F/g, "0").replace(/B/g, "1"), 2)
		let maxX = parseInt(dataInp.substring(7).replace(/L/g, "0").replace(/R/g, "1"), 2)

		return maxY * 8 + maxX
	})
}

// Part 2
// ======
// ~1.8 ms - answer: 653

const part2 = input => {
	const start = now()

	const data = input.split("\n");
	const allSeats = getAllSeats(data)

	const maxLen = Math.max(...allSeats)
	let missing = []

	for (let i = 0; i < maxLen; i++) {
		if (!allSeats.includes(i + 1)) {
			missing.push(i + 1)
		}

		if (!allSeats.includes(i - 1)) {
			missing.push(i - 1)
		}
	}

	// missing.sort((a, b) => b - a)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return missing[missing.length - 1]
}


module.exports = { part1, part2 }
