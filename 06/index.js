'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.9 ms - answer: 6590

const part1 = input => {
	const start = now()

	const data = input.split("\n\n").map(x => {
		return [...new Set(x.replace(/\n/g, "").split(""))]
	})

	const result = data.reduce((acc, val) => acc + val.length, 0)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

// Part 2
// ======
// ~14.2 ms - answer: 3288

const part2 = input => {
	const start = now()

	const data = input.split("\n\n").map(x => {
		let group = x.split("\n")
		//A group is an array of persons. Each person has their answers as one long string

		let questionAnswered = new Array(26).fill(0)
		//Count the amount of times an answer has been given in a group 
		group.forEach(person => {
			const answers = person.split("")
			answers.forEach(answer => {
				questionAnswered[answer.charCodeAt(0) - 97] += 1
			})
		})

		//Check if the answer was given exactly the amount of the groups length
		return questionAnswered.reduce((acc, value) => {
			acc += +(value === group.length)
			//	   ^(unary operator) Turn value into a boolean, and convert that boolean to a 1 or a 0
			return acc
		}, 0);
	})

	const result = data.reduce((acc, val) => acc + val, 0)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}


module.exports = { part1, part2 }
