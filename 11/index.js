'use strict'
const now = require("performance-now")
const directions = [[0, 1], [1, 0], [-1, 0], [0, -1], [1, 1], [-1, -1], [-1, 1], [1, -1]]

// Part 1
// ======
// ~170 ms - answer: 2427

const part1 = input => {
	const start = now()

	let result = simulate(input.split("\n").map(x => x.split("")), false)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

function countHash(data) {
	return data.reduce((acc, val) => {
		acc.push(...val)
		return acc
	}).filter(x => x === "#").length
}

function getNeigh(i, j, data) {
	return directions.map(x => {
		return get(x[0] + i, x[1] + j, data)
	}).filter(x => x)
}

function getFarNeigh(i, j, data) {
	return directions.map(x => {
		let val = "."
		let iTemp = i
		let jTemp = j
		while (val === ".") {
			iTemp += x[0]
			jTemp += x[1]

			val = get(iTemp, jTemp, data)
		}
		return val
	}).filter(x => x)

}

function get(i, j, data) {
	if (!data || i < 0 || j < 0 || i >= data.length || j >= data[0].length) return false
	return data[i][j]
}

function simulate(data, complex = false) {

	let changed = true;
	while (changed) {
		changed = false
		const prev = data.map(x => [...x])

		for (let i = 0; i < prev.length; i++) {
			for (let j = 0; j < prev[i].length; j++) {
				const neigh = complex ? getFarNeigh(i, j, prev)
					: getNeigh(i, j, prev)
				if (prev[i][j] === "L" && !neigh.find(x => x === "#")) {
					data[i][j] = "#"
					changed = true
				} else if (prev[i][j] === "#" && neigh.filter(x => x === "#").length > (complex ? 4 : 3)) {
					data[i][j] = "L"
					changed = true
				}
			}
		}
	}
	return countHash(data)
}

// Part 2
// ======
// ~242 ms - answer: 2199

const part2 = input => {
	const start = now()
	let result = simulate(input.split("\n").map(x => x.split("")), true)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

module.exports = { part1, part2 }
