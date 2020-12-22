'use strict'
const now = require("performance-now")

// Part 1
// ======
// ~0.2 ms - answer: 31314

const part1 = input => {
	const start = now()
	const data = input.split("\n\n");

	let player1 = data[0].split("\n").slice(1).map(Number)
	let player2 = data[1].split("\n").slice(1).map(Number)

	game(player1, player2, false)

	let result = getScore(player1, player2)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

// Part 2
// ======
// ~10000 ms - answer: 32760

const part2 = input => {
	const start = now()
	const data = input.split("\n\n");

	let player1 = data[0].split("\n").slice(1).map(Number)
	let player2 = data[1].split("\n").slice(1).map(Number)

	game(player1, player2)

	let result = getScore(player1, player2)

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return result
}

function format(arr1, arr2) {
	return arr1.join(",") + arr2.join(",")
}

function getScore(arr1, arr2) {
	let arr = arr1.length === 0 ? arr2 : arr1
	arr.reverse()
	return arr.reduce((acc, val, i) =>
		acc + val * (i + 1)
	)
}

function game(player1, player2, complex = true) {
	let prevRounds = []

	while (player1.length !== 0 && player2.length !== 0) {
		if (complex) { //Complex is for part2 only
			if (prevRounds.includes(format(player1, player2))) {
				return true
			}
			prevRounds.push(format(player1, player2))
		}

		let card1 = player1.shift();
		let card2 = player2.shift();

		let winner = card1 > card2;
		if (complex && card1 < player1.length + 1 && card2 < player2.length + 1) {
			let new1 = player1.slice(0, card1)
			let new2 = player2.slice(0, card2)
			winner = game(new1, new2)
		}

		let first = winner ? card1 : card2;
		let second = !winner ? card1 : card2;
		(winner ? player1 : player2).push(first, second)
	}
	return player1.length !== 0
}

module.exports = { part1, part2 }
