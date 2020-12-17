'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~66 ms - answer: 382

const part1 = input => {
	const start = now()

	let result = simulate(input.split("\n").map(x => x.split("")), false)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

function countNeigh(x, y, z, w, map, isPart2) {
	let count = 0;
	for (let ww = (isPart2 ? w - 1 : 0); ww <= (isPart2 ? w + 1 : 0); ww++) { //Only switch to 4d when part2 is active
		for (let zz = z - 1; zz <= z + 1; zz++) {
			for (let yy = y - 1; yy <= y + 1; yy++) {
				for (let xx = x - 1; xx <= x + 1; xx++) {
					if ((xx !== x || yy !== y || zz !== z || ww !== w) && get(xx, yy, zz, ww, map)) {
						count++;
					}
				}
			}
		}
	}
	return count;
}

function get(x, y, z, w, data) {
	return data[`${x},${y},${z},${w}`]
}

function set(x, y, z, w, data, val) {
	data[`${x},${y},${z},${w}`] = val
}

function simulate(data, isPart2 = false) {
	let map = {};

	data.forEach((val, y) => {
		val.forEach((val2, x) => {
			if (val2 === '#') {
				map[`${x},${y},0,0`] = true;
			}
		})
	})

	for (let t = 1; t < 7; t++) {
		let newMap = {};
		for (let w = (isPart2 ? -t : 0); w < (isPart2 ? t + 1 : 1); w++) {
			for (let z = -t; z < t + 1; z++) {
				for (let y = -t; y < data.length + t; y++) {
					for (let x = - t; x < data[0].length + t; x++) {
						const neigh = countNeigh(x, y, z, w, map, isPart2)
						const isActive = get(x, y, z, w, map)

						if (neigh === 3 || (neigh === 2 && isActive)) {
							set(x, y, z, w, newMap, true)
						}
					}
				}
			}
		}

		map = newMap; //Only store active ones
	}

	return Object.keys(map).length
}

// Part 2
// ======
// ~1700 ms - answer: 2552

const part2 = input => {
	const start = now()
	let result = simulate(input.split("\n").map(x => x.split("")), true)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

module.exports = { part1, part2 }
