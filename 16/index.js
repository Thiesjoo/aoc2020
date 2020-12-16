'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0 ms - answer: 0

const part1 = input => {
	const start = now()
	let result = 0;

	const data = parseInput(input)
	console.log(data)

	data.tickets.forEach(ticket => {
		ticket.forEach(val => {
			let test = data.rules.some(x => {
				return checkRangeHelper(x, val)
			})
			if (!test) {
				result += val
			}
		})
	})

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

	const data = parseInput(input)
	// console.log(data)

	let data3 = data.tickets.filter(ticket => {
		let valid = true;
		ticket.forEach(val => {
			let test = data.rules.some(x => {
				return checkRangeHelper(x, val)
			})
			if (!test) {
				// result += val
				valid = false
			}
		})
		return valid
	})

	// console.log(data3)
	// return
	let data2 = data3.map(ticket => {
		return ticket.reduce((acc, val) => {
			let test = data.rules.map((x) => {
				return checkRangeHelper(x, val)
			})
			acc.push(test)
			return acc
		}, [])
	})
	console.log(data2)
	// return


	const test = (index, index2) => {
		let col = []
		data2.forEach(y => {
			col.push(y[index][index2])
		})
		return col
	}
	// console.log(data2)
	let map = []
	for (let i = 0; i < data2[0].length; i++) {
		for (let j = 0; j < data2[0][0].length; j++) {
			if (new Set(test(i, j)).size === 1) {
				if (!map[i]) map[i] = []
				map[i].push(data.rules[j][2])
			}
		}
	}
	map = map.map((x, i) => {
		return { x, i }
	})
	let test2 = map.findIndex(x => {
		return x.x.length === 1
	})
	// console.log(test2, " = ", map[test2])
	map.sort((a, b) => a.x.length - b.x.length)
	console.log(map)
	let test3 = {}
	for (let i = 0; i < map.length; i++) {
		const element = map[i];
		console.log("E: ", element)
		if (element.x.length !== 1) console.log("FECK")
		// test3[element.i] = element.x[0]
		map = map.map(x => {
			x.x.splice(x.x.findIndex(y => y === element.x[0]), 1)
			return x
		})
		map.sort((a, b) => a.x.length - b.x.length)

		// console.log(map)
	}
	console.log(test3)

	// console.log(data.myTicket, map)

	// console.log(map
	// 	.map((x, i) => x === "departure" ? i : false)
	// 	.filter(x => typeof x === "number")
	// 	.map((x, i) => data.myTicket[x])
	// 	.reduce((acc, val) => acc * val, 1))

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}


function parseInput(input) {
	let data = {}
	input.split("\n\n").map((x, i) => {
		switch (i) {
			case 0:
				data.rules = x.split("\n").map(y => {
					let test123 = y.split(":")
					let test = test123[1].split(" ")
					// console.log(test,)
					let st = test[1]
					let nd = test[3]
					st = st.split("-").map(Number)
					nd = nd.split("-").map(Number)
					return [st, nd, test123[0]]
				})
				break
			case 1:
				data.myTicket = x.split("\n")[1].split(",").map(Number)
				break
			case 2:
				data.tickets = x.split("\n").slice(1).map(y => y.split(",").map(Number))
				break
		}
	})
	return data
}

function checkRangeHelper(rangeTwice, val) {
	return checkRange(rangeTwice[0], val) || checkRange(rangeTwice[1], val)
}

function checkRange(range, val) {
	return range[0] <= val && val <= range[1]
}

module.exports = { part1, part2 }



let test = [
	['departure time', 'class', 'duration', 'route', 'train'],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure track',
		'departure date',
		'departure time',
		'class',
		'duration',
		'route',
		'train',
		'zone'
	],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure track',
		'departure date',
		'departure time',
		'arrival station',
		'arrival track',
		'class',
		'duration',
		'route',
		'train',
		'wagon',
		'zone'
	],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure track',
		'departure date',
		'departure time',
		'class',
		'duration',
		'route',
		'train'
	],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure time',
		'class',
		'duration',
		'route',
		'train'
	],
	[
		'departure location',
		'departure station',
		'departure time',
		'class',
		'duration',
		'route',
		'train'
	],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure track',
		'departure date',
		'departure time',
		'arrival station',
		'class',
		'duration',
		'route',
		'train',
		'wagon',
		'zone'
	],
	['class', 'duration', 'route'],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure track',
		'departure date',
		'departure time',
		'arrival station',
		'class',
		'duration',
		'route',
		'train',
		'zone'
	],
	['route'],
	[
		'departure location',
		'departure time',
		'class',
		'duration',
		'route',
		'train'
	],
	['duration', 'route'],
	[
		'departure location',
		'departure station',
		'departure platform',
		'departure track',
		'departure time',
		'class',
		'duration',
		'route',
		'train'
	],
	[
		'departure location', 'departure station',
		'departure platform', 'departure track',
		'departure date', 'departure time',
		'arrival location', 'arrival station',
		'arrival platform', 'arrival track',
		'class', 'duration',
		'price', 'route',
		'row', 'seat',
		'train', 'type',
		'wagon', 'zone'
	],
	[
		'departure location', 'departure station',
		'departure platform', 'departure track',
		'departure date', 'departure time',
		'arrival location', 'arrival station',
		'arrival platform', 'arrival track',
		'class', 'duration',
		'route', 'train',
		'wagon', 'zone'
	],
	[
		'departure location', 'departure station',
		'departure platform', 'departure track',
		'departure date', 'departure time',
		'arrival location', 'arrival station',
		'arrival platform', 'arrival track',
		'class', 'duration',
		'price', 'route',
		'row', 'train',
		'wagon', 'zone'
	],
	[
		'departure location', 'departure station',
		'departure platform', 'departure track',
		'departure date', 'departure time',
		'arrival location', 'arrival station',
		'arrival platform', 'arrival track',
		'class', 'duration',
		'price', 'route',
		'train', 'wagon',
		'zone'
	],
	[
		'departure location', 'departure station',
		'departure platform', 'departure track',
		'departure date', 'departure time',
		'arrival location', 'arrival station',
		'arrival platform', 'arrival track',
		'class', 'duration',
		'price', 'route',
		'row', 'seat',
		'train', 'wagon',
		'zone'
	],
	[
		'departure location', 'departure station',
		'departure platform', 'departure track',
		'departure date', 'departure time',
		'arrival station', 'arrival platform',
		'arrival track', 'class',
		'duration', 'route',
		'train', 'wagon',
		'zone'
	],
	['class', 'duration', 'route', 'train']
]