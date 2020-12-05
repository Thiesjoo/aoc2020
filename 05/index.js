'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~2.2 ms - answer: 951
const maxHeight = 128 - 1
const maxWidth = 8 - 1

const part1 = input => {
	const start = now()

	const data = input.split("\n");
	const allSeats = getAllSeats(data)
	allSeats.sort((a, b) => b - a)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return allSeats[0]
}

function getMid(string, max) {
	let currY = [0, max];

	for (let i = 0; i < string.length; i++) {
		let mid = Math.floor((currY[0] + currY[1]) / 2);
		if (string[i] === "F" || string[i] === "L") {
			currY[1] = mid - 1;
		} else {
			currY[0] = mid + 1;
		}
	}
	return currY[0]
}

function getAllSeats(data) {

	return data.map(dataInp => {
		let maxY = getMid(dataInp.substr(0, 7), maxHeight)
		let maxX = getMid(dataInp.substring(7), maxWidth)

		return maxY * 8 + maxX
	})

}

// Part 2
// ======
// ~2.9 ms - answer: 653

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

	missing.sort((a, b) => b - a)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return missing[0]
}


module.exports = { part1, part2 }
