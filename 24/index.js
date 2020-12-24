"use strict";
const now = require("performance-now");
const reggie = /(?:(?:n|s)(?:[e,w]){1}|e|w)/gi;

const coordinates = {
  ne: [1, 1],
  nw: [-1, 1],
  se: [1, -1],
  sw: [-1, -1],
  e: [2, 0],
  w: [-2, 0],
};
const dirs = ["ne", "nw", "se", "sw", "e", "w"];

function move(coords, dir) {
  const [x, y] = coords;
  return [x + coordinates[dir][0], y + coordinates[dir][1]];
}

function parseJsCoord(str) {
  return str.split(";").map(Number);
}

function encodeCoord(arr) {
  return arr.join(";");
}

// Part 1
// ======
// ~4 ms - answer: 360

const part1 = (input) => {
  const start = now();
  let result = 0;

  result = getBlackTiles(input.split("\n")).size;

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return result;
};

function getBlackTiles(data) {
  return data.reduce((acc, line) => {
    const position = line.match(reggie).reduce(
      (acc, val) => {
        return move(acc, val);
      },
      [0, 0]
    );
    const key = encodeCoord(position);
    return acc.delete(key) ? acc : acc.add(key);
  }, new Set());
}

function getNeighbours(tile) {
  const position = parseJsCoord(tile);
  return dirs.map((x) => encodeCoord(move(position, x)));
}

function flip(blackTiles) {
  const counts = {};

  blackTiles.forEach((tile) => {
    getNeighbours(tile).forEach((x) => {
      counts[x] = (counts[x] || 0) + 1;
    });
  });

  const result = Object.entries(counts).reduce((acc, test) => {
    const [tile, count] = test;
    if ((blackTiles.has(tile) && count === 1) || count === 2) {
      acc.add(tile);
    }
    return acc;
  }, new Set());

  return result;
}

// Part 2
// ======
// ~550 ms - answer: 3924

const part2 = (input) => {
  const start = now();

  let black = getBlackTiles(input.split("\n"));
  for (let i = 0; i < 100; i++) {
    black = flip(black);
  }

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return black.size;
};

module.exports = { part1, part2 };
