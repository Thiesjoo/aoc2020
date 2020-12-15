const now = require("performance-now")

// Part 1
// ======
// ~50 ms - answer: 206

const part1 = input => {
	const start = now()

	const data = input.split(",").map(Number);
	let turns = [...data]

	for (let i = data.length; i < 2020; i++) {
		let index = turns.map((x, i) => {
			return { x, i }
		}).filter(x => x.x === turns[i - 1]);

		if (index.length > 1) {
			let last = index.length - 1
			turns.push(index[last].i - index[last - 1].i)
		} else {
			turns.push(0)
		}
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
	return turns[turns.length - 1]
}

// Part 2
// ======
// ~3000 ms - answer: 955

const part2 = input => {
	const start = now()
	const numbers = input.split(",").map(Number)

	let mem = new Map();
	let next;

	for (let turn = 1; turn < 30000000; turn++) {
		let current = (turn <= numbers.length) ? numbers[turn - 1] : next;
		next = mem.has(current) ? turn - mem.get(current) : 0;
		mem.set(current, turn);
	}

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));
	return next
}

module.exports = { part1, part2 }
