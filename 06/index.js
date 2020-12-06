'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.9 ms - answer: 6590

const part1 = input => {
	const start = now()

	const data = input.split("\n\n").map(x => {
		return x.replace(/\n/g, "").split("")
	})

	const parsed = data.map(x => {
		return [...new Set(x)]; //Unique answers only
	})
	const result = parsed.reduce((acc, val) => acc + val.length, 0)

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
		return x.split("\n")
	})

	//Data is now an array of groups. Within each group there is an array with every person's answer
	let parsed = data.map(group => {
		let questionAnswered = {}
		//Count the amount of times an answer has been given in a group 
		group.forEach(person => {
			const answers = person.split("")
			answers.forEach(answer => {
				if (!(answer in questionAnswered)) {
					questionAnswered[answer] = 0
				}
				questionAnswered[answer]++
			})
		})

		//Check if the answer was given exactly the amount of the groups length
		let count = 0;
		Object.values(questionAnswered).forEach((x) => {
			if (x === group.length) count++
		})

		return count;
	})

	const result = parsed.reduce((acc, val) => acc + val, 0)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}


module.exports = { part1, part2 }
