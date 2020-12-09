'use strict'
const now = require("performance-now")

const preambleLength = 25
// Part 1
// ======
// ~7.5 ms - answer: 15690279

const part1 = input => {
	const start = now()
	const data = input.split("\n").map(Number);

	for (let i = preambleLength; i < data.length; i += 1) {
		const element = data[i];
		const preamble = data.slice(i - preambleLength, i)

		let sums = preamble.reduce((acc, val) => {

			preamble.forEach(x => {
				acc.push(x + val)
			})
			return acc
		}, [])
		if (!sums.includes(element)) {
			const end = now()
			console.log('Execution time: ~%dms', (end - start).toFixed(3));

			return element
		}
	}
	return "NOT FOUND"
}

// Part 2
// ======
// ~2.2 ms - answer: 2174232
let maxLength = 2000
const prevAnswer = 15690279

const part2 = input => {
	const start = now()
	const data = input.split("\n").map(Number);
	maxLength = Math.min(data.length, maxLength)

	for (let i = 0; i < data.length; i++) {
		let sum = data[i];
		let min = sum;
		let max = sum;

		for (let j = i + 1; j < maxLength; j++) {
			sum += data[j]
			if (sum === prevAnswer) {
				const end = now()
				console.log('Execution time: ~%dms', (end - start).toFixed(3));
				return min + max
			} else if (sum > prevAnswer) {
				break
			}

			if (data[j] > max) {
				max = data[j]
			} else if (data[j] < min) {
				min = data[j]
			}
		}
	}
}

module.exports = { part1, part2 }
