'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~47 ms - answer: 121

const part1 = input => {
	const start = now()
	let result = 0;

	const data = input.split("\n");

	let graph = {}

	data.forEach(x => {
		let parsed = /(\w+ \w+) bags contain (.*)\./.exec(x)

		const otherParsed = parsed[2] !== 'no other bags'
			? parsed[2].split(', ').map((other) => /(\w+ \w+) bags?/.exec(other)[1])
			: [];

		graph[parsed[1]] = otherParsed
	})



	result = Object
		.keys(graph)
		.filter((color) => fillGraph(color, graph).includes('shiny gold'))
		.length;

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

//fillGraph gets every color from every other color. 
//As a result you get a list of every color mentioned in the input
function fillGraph(bagColor, graph) {
	const colors = [...graph[bagColor]];

	graph[bagColor].forEach(x => {
		colors.push(...fillGraph(x, graph))
	})

	return colors;
};

let testGraph

function getTotal(bagColor,) {
	let total = 0;
	for (const { color, amount } of testGraph[bagColor]) { //Loop over every color and gather total
		total += amount + amount * getTotal(color);
	}

	return total;
};

// Part 2
// ======
// ~3.5 ms - answer: 3805

const part2 = input => {
	const start = now()
	let result = 0;

	const data = input.split("\n");

	let graph = {}
	data.forEach(x => {
		let parsed = /(\w+ \w+) bags contain (.*)\./.exec(x)

		const otherParsed = parsed[2] !== 'no other bags'
			? parsed[2].split(', ').map((other) => {
				const [, amount, color] = /(\d+) (\w+ \w+) bags?/.exec(other);
				return { amount: parseInt(amount), color }
			})
			: [];

		graph[parsed[1]] = otherParsed
	})

	testGraph = graph
	result = getTotal("shiny gold")

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}


module.exports = { part1, part2 }
