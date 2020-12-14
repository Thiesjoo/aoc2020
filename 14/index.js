'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~3.1 ms - answer: 15172047086292

const part1 = input => {
	const start = now()
	let mem = {}
	const data = processInput(input)

	let currMask = []
	data.forEach(x => {
		if (x.type === "mask") {
			currMask = x.val
			return
		}
		mem[x.address] = processBin(x.val, currMask, "X")
	})

	let result = getMem(mem, x => parseInt(x, 2))

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

// Part 2
// ======
// ~130 ms - answer: 4197941339968

const part2 = input => {
	const start = now()
	let mem = {}

	const data = processInput(input)

	let currMask = []
	data.forEach(x => {
		if (x.type === "mask") {
			currMask = x.val
			return
		}
		processX(processBin(x.address, currMask, "0")).forEach(y => {
			mem[parseInt(y, 2)] = x.val
		})
	})

	let result = getMem(mem)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

function processX(bits) {
	if (bits.indexOf('X') === -1) return [bits];
	return [...processX(bits.replace('X', '0')), ...processX(bits.replace('X', '1'))];
}

function processBin(bin, mask, toCheck) {
	return bin.toString(2).padStart(36, "0",).split("").map((bit, i) => (mask[i] === toCheck ? bit : mask[i])).join("")
}

function processInput(input) {
	return input.split("\n").map(line => {
		if (line.startsWith("mask = ")) {
			return { type: "mask", val: line.slice(7).split("") }
		} else {
			const [, address, val] = line.match(/mem\[(\d+)\] = (\d+)/)
			return { val: parseInt(val), address: parseInt(address) }
		}
	});
}

function getMem(mem, mapper = x => x) {
	return Object.values(mem).map(mapper).reduce((acc, val) => acc + val)
}

module.exports = { part1, part2 }
