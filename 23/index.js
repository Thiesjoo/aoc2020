"use strict";
const now = require("performance-now");

// Part 1
// ======
// ~0.2 ms - answer: 28946753

function insert(arr, index, newItem) {
  return [...arr.slice(0, index), ...newItem, ...arr.slice(index)];
}

const part1 = (input) => {
  const start = now();
  let data = input.split("").map(Number);

  let test = [...data];
  test.sort((a, b) => a - b);
  let min = test[0];
  let max = test[test.length - 1];

  let curr = 0;
  for (let i = 0; i < 100; i++) {
    let value = data[curr];
    let indeces = [1, 2, 3].map((x) => (x + curr) % data.length);
    let val = indeces.map((x) => data[x]);

    data = data.filter((x, i) => indeces.indexOf(i) === -1);
    let dest = value - 1;
    while (data.indexOf(dest) === -1) {
      dest -= 1;
      if (dest < min) {
        dest = max;
      }
    }
    let destIndex = data.indexOf(dest);
    data = insert(data, destIndex + 1, val);
    curr = (data.indexOf(value) + 1) % data.length;
  }

  let str = "";
  let index = data.indexOf(1);
  for (let i = 1; i < data.length; i++) {
    const element = data[(i + index) % data.length];
    str += element;
  }

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return str;
};

// Part 2
// ======
// ~4000 ms - answer: 519044017360

const part2 = (input) => {
  const start = now();
  let cups = input.split("").map(Number);

  const steps = 10000000;
  const max = Math.max(...cups);

  //Generate array
  cups = cups.concat(
    Array.from({ length: 1000000 - max }, (x, i) => i + max + 1)
  );

  //Init the structure: {v: <value>, n: <next cup>}
  cups = cups.map((x, i) => {
    return { v: x };
  });

  //Make a linked list
  for (let i = 0; i < cups.length - 1; i++) {
    cups[i].n = cups[i + 1];
  }
  cups[cups.length - 1].n = cups[0];

  const map = new Map(cups.map((item) => [item.v, item]));

  let head = cups[0];

  for (let i = 0; i < steps; i++) {
    const filtered = [head.n.v, head.n.n.v, head.n.n.n.v];
    const filteredHead = head.n;
    head.n = head.n.n.n.n; //New head in list

    let cur = head.v - 1;
    while (true) {
      while (filtered.indexOf(cur) > -1) cur--;
      if (cur === 0) cur += cups.length;
      while (filtered.indexOf(cur) > -1) cur--;

      if (map.has(cur)) {
        const pos = map.get(cur);
        filteredHead.n.n.n = pos.n;
        pos.n = filteredHead;
        break;
      }

      cur--;
    }

    head = head.n;
  }
  const posOne = map.get(1);

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return posOne.n.v * posOne.n.n.v;
};

module.exports = { part1, part2 };
