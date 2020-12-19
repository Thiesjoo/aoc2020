'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~23 ms - answer: 279

const part1 = input => {
	const start = now()
	let result = 0;

	let [rules1, data1] = input.split("\n\n");

	result = parseInput(rules1.split("\n"), data1.split("\n"))

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

function parseInput(rules, messages) {
	let ruleMap = rules.reduce((acc, val) => {
		const [index, rule] = val.split(": ")
		acc[index] = isNaN(parseInt(rule)) //Check if it is a number
			? rule[1] //First char
			: rule.split("|").map(x => x.trim().split(" ").filter(x => x))

		return acc
	}, {})


	const isValid = (msg, params) => {
		const rule = params[0]
		const nextRules = params.slice(1)
		if (!rule) return !msg;

		const next = ruleMap[rule]

		return Array.isArray(next)
			? next.find(x => isValid(msg, x.concat(nextRules)))
			: msg[0] === next && isValid(msg.slice(1), nextRules);
	};

	return messages
		.map(msg => ruleMap["0"].some(r => isValid(msg, r)))
		.filter(x => x)
		.length;
}

// Part 2
// ======
// ~60 ms - answer: 384

const part2 = input => {
	const start = now()
	let result = 0;

	let [rules1, data1] = input.split("\n\n");

	let overrides = ["8: 42 | 42 8", "11: 42 31 | 42 11 31"];
	result = parseInput(rules1.split("\n").concat(overrides), data1.split("\n"))

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

module.exports = { part1, part2 }
