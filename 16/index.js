"use strict";
const now = require("performance-now");

// Part 1
// ======
// ~0 ms - answer: 0

const part1 = (input) => {
	const start = now();
	let result = 0;

	const data = parseInput(input);
	console.log(data);

	data.tickets.forEach((ticket) => {
		ticket.forEach((val) => {
			let test = data.rules.some((x) => {
				return checkRangeHelper(x, val);
			});
			if (!test) {
				result += val;
			}
		});
	});

	const end = now();
	console.log("Execution time: ~%dms", (end - start).toFixed(3));

	return result;
};

// Part 2
// ======
// ~7 ms - answer: 589685618167

const part2 = (input) => {
	const start = now();
	let result = 0;

	const { myTicket, rules, tickets } = parseInput(input);

	let validTickets = tickets
		.filter((ticket) => {
			return ticket.every((value) => {
				return rules.some((y) => {
					return checkRangeHelper(y, value);
				});
			});
		});

	let eligibleFields = myTicket.map((_, i) =>
		rules.filter((field) =>
			validTickets.map((ticket) => ticket[i]).every((ticketField) => checkRangeHelper(field, ticketField))
		),
	);

	const takenRules = [];
	const amountOfRules = Object.keys(myTicket).length;

	while (takenRules.length < amountOfRules) {
		eligibleFields
			.filter(x => x.length === 1)
			.forEach((innerFields) => {
				if (!~takenRules.indexOf(innerFields[0][2])) takenRules.push(innerFields[0][2]);
			});

		eligibleFields = eligibleFields.map((fields) =>
			fields.length !== 1 ? fields.filter((field) => !~takenRules.indexOf(field[2])) : fields,
		);
	}

	result = eligibleFields
		.map((x, i) => {
			return ~x[0][2].indexOf('departure') ? myTicket[i] : false
		})
		.filter((x) => x)
		.reduce((acc, val) => acc * val, 1);;

	const end = now();
	console.log("Execution time: ~%dms", (end - start).toFixed(3));

	return result;
};

function parseInput(input) {
	let data = {};
	input.split("\n\n").map((x, i) => {
		switch (i) {
			case 0:
				data.rules = x.split("\n").map((y) => {
					let test123 = y.split(":");
					let test = test123[1].split(" ");
					let st = test[1];
					let nd = test[3];
					st = st.split("-").map(Number);
					nd = nd.split("-").map(Number);
					return [st, nd, test123[0]];
				});
				break;
			case 1:
				data.myTicket = x.split("\n")[1].split(",").map(Number);
				break;
			case 2:
				data.tickets = x
					.split("\n")
					.slice(1)
					.map((y) => y.split(",").map(Number));
				break;
		}
	});
	return data;
}

function checkRangeHelper(rangeTwice, val) {
	return checkRange(rangeTwice[0], val) || checkRange(rangeTwice[1], val);
}

function checkRange(range, val) {
	return range[0] <= val && val <= range[1];
}

module.exports = { part1, part2 };
