'use strict'
const now = require("performance-now")
const parse = require('parenthesis')

// Part 1
// ======
// ~3 ms - answer: 98621258158412

const part1 = input => {
	const start = now()

	const re = /\([^()]+\)/ //Magic from the webs, i am not that smart
	let result = 0;

	for (let line of input.split("\n")) {
		let m = re.exec(line) //parenthesis parser
		while (m) {
			const expr = m[0]
			const calced = calc(expr.substr(1, expr.length))
			line = line.slice(0, m.index) + calced + line.slice(m.index + expr.length);

			m = re.exec(line)
		}
		result += calc(line)
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

function calc(l) {
	const parts = l.split(' ').map(x => {
		let int = parseInt(x)
		return int ? int : x
	})

	let res = parts[0];
	for (let i = 1; i < parts.length; i += 2) { //Skip the values
		switch (parts[i]) {
			case '+':
				res += parts[i + 1]
				break;
			case '*':
				res *= parts[i + 1]
				break;
		}
	}
	return res;
}

// Part 2
// ======
// ~5.313 ms - answer: 241216538527890

const part2 = input => {
	const start = now()

	//https://en.wikipedia.org/wiki/Operator-precedence_parser#Alternative_methods
	let result = input.split("\n")
		.map(x => '((' + x
			.replace(/\(/g, '(((')
			.replace(/\)/g, ')))')
			.replace(/\+/g, ')+(')
			.replace(/\*/g, '))*((')
			+ '))')
		.map(x => eval(x))
		.reduce((acc, val) => acc + val, 0);

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

module.exports = { part1, part2 }
