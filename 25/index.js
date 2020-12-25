"use strict";
const now = require("performance-now");

// Part 1
// ======
// ~300 ms - answer: 7269858

const part1 = (input) => {
  const start = now();
  const data = input.split("\n").map(Number);

  let loopCard = loop(7, data[0]);
  let loopDoor = loop(7, data[1]);

  let encryptionKey = encrypt(loopCard, data[1]);
  console.log({ loopDoor, loopCard });

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return encryptionKey;
};

function loop(subject, key) {
  let value = 1;
  for (let i = 1; i < 100000000000; i++) {
    value = (value * subject) % 20201227;
    if (key === value) return i;
  }
  return value;
}

function encrypt(loopsize, subject) {
  let value = 1;
  for (let i = 0; i < loopsize; i++) {
    value = (value * subject) % 20201227;
  }
  return value;
}

module.exports = { part1, part2 };
