'use strict'
const now = require("performance-now")

const dirMap = {
	N: (a) => new Vector2(0, 1).mult(a),
	S: (a) => new Vector2(0, -1).mult(a),
	E: (a) => new Vector2(1, 0).mult(a),
	W: (a) => new Vector2(-1, 0).mult(a),
}

// Part 1
// ======
// ~0.8 ms - answer: 1152

const part1 = input => {
	const start = now()
	let vec = new Vector2(0, 0)
	let dir = new Vector2(1, 0)

	input.split("\n").map(x => {
		let inst = x[0]
		let amt = parseInt(x.slice(1))
		if (inst === "F") {
			let tempDir = dir.copy()
			vec.add(dir.mult(amt))
			dir = tempDir
		} else if (inst === "R") {
			dir.rotate(amt)
		} else if (inst === "L") {
			dir.rotate(-amt)
		} else {
			vec.add(dirMap[inst](amt))
		}
	});

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return vec.length()
}

// Part 2
// ======
// ~0.8 ms - answer: 58637

const part2 = input => {
	const start = now()

	let shipVec = new Vector2(0, 0)
	let wayPointVec = new Vector2(10, 1) //Relative to ship

	input.split("\n").map(x => {
		let inst = x[0]
		let amt = parseInt(x.slice(1))
		if (inst === "F") {
			let tempWaypoint = wayPointVec.copy()
			shipVec.add(wayPointVec.mult(amt))
			wayPointVec = tempWaypoint
		} else if (inst === "R") {
			wayPointVec.rotate(amt)
		} else if (inst === "L") {
			wayPointVec.rotate(-amt)
		} else {
			wayPointVec.add(dirMap[inst](amt))
		}
	});

	const end = now()
	console.log('Execution time: ~%dms', (end - start).toFixed(3));

	return shipVec.length()
}

module.exports = { part1, part2 }


class Vector2 {
	x;
	y;

	constructor(_x, _y) {
		this.x = _x;
		this.y = _y;
	}

	add(vec) {
		this.x += typeof vec === "number" ? vec : vec.x;
		this.y += typeof vec === "number" ? vec : vec.y;
		return this;
	}

	mult(vec) {
		this.x *= typeof vec === "number" ? vec : vec.x;
		this.y *= typeof vec === "number" ? vec : vec.y;
		return this;
	}

	rotate(degrees) {
		const theta = -degrees * (Math.PI / 180)
		const cos = Math.cos(theta);
		const sin = Math.sin(theta);

		const xTemp = this.x;
		this.x = Math.round(10000 * (this.x * cos - this.y * sin)) / 10000
		this.y = Math.round(10000 * (xTemp * sin + this.y * cos)) / 10000
		return this
	}

	copy() {
		return new Vector2(this.x, this.y)
	}

	length() {
		return Math.abs(this.x) + Math.abs(this.y)
	}
}