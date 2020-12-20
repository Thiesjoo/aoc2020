"use strict";
const now = require("performance-now");

// Part 1
// ======
// ~0 ms - answer: 68781323018729

const part1 = (input) => {
  const start = now();
  let result = 0;

  const data = input.split("\n\n").reduce((acc, x) => {
    let temp = x.split("\n");
    const [, name] = temp[0].match(/Tile (\d+):/);
    const map = temp.slice(1);
    acc.push(
      new Tile(
        name,
        null,
        null,
        null,
        null,
        map.map((y) => {
          return y.split("").map((z) => z === "#");
        })
      )
    );
    return acc;
  }, []);

  let allTiles = data.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});
  let remainingTiles = [...data];

  let stack = [];
  stack.push(data[0]);

  while (stack.length !== 0) {
    let curr = stack.pop();
    const index = remainingTiles.findIndex((x) => x.id === curr.id);
    if (index > -1) {
      remainingTiles.splice(index, 1);
    }

    let currentBorders = curr.getBorders();

    remainingTiles.forEach((tile) => {
      let tempBorders = tile.getBorders();
      tempBorders.forEach((border, iOther) => {
        //Find a matched border
        let iCurrent = currentBorders.findIndex((y) => arrMatch(y, border));

        let rev = [...border].reverse();
        let iReversedCurrent = currentBorders.findIndex((z) =>
          arrMatch(z, rev)
        );

        if (iCurrent > -1) {
          let rot = (iCurrent + 4 - opposite(iOther)) % 4;
          console.log(iCurrent, iOther, opposite(iOther), rot);

          if (curr.getNeigh(iCurrent) === null) {
            allTiles[tile.id].rotate(rot);

            if (iCurrent === 0 || iCurrent === 2) {
              allTiles[tile.id].flipHorizontal();
            } else {
              allTiles[tile.id].flipVertical();
            }
            curr.setNeigh(iCurrent, tile.id);
            tile.setNeigh(opposite(iCurrent), curr.id);
            stack.push(tile);
          } else {
            console.log("Con already set");
          }
        } else if (iReversedCurrent > -1) {
          let rot = (iReversedCurrent + 4 - opposite(iOther)) % 4;
          if (curr.getNeigh(iReversedCurrent) === null) {
            allTiles[tile.id].rotate(rot);
            // if (opposite(iReversedCurrent) !== iOther) {
            //   console.log("Something is wrong?");
            //   curr.print();
            //   tile.print();
            //   console.log(
            //     "rev: ",
            //     iReversedCurrent,
            //     opposite(iReversedCurrent),
            //     iOther,
            //     opposite(iOther)
            //   );
            // }
            curr.setNeigh(iReversedCurrent, tile.id);
            tile.setNeigh(opposite(iReversedCurrent), curr.id);
            stack.push(tile);
          } else {
            console.log("Con already set");
          }
        }
      });
    });
  }

  // const len = Math.round(Math.sqrt(data.length));
  // let image = [];
  // const tiles = Object.values(allTiles);

  // let left = tiles.find(
  //   (x) =>
  //     x.left === null && x.top === null && x.right !== null && x.bottom !== null
  // );

  // for (let i = 0; i < len; i++) {
  //   let right = left;
  //   image[i] = [];
  //   for (let j = 0; j < len; j++) {
  //     image[i][j] = right;
  //     // console.log(left, right, j, i);
  //     right = allTiles[right.right];
  //   }
  //   left = allTiles[left.bottom];
  //   console.log(left);
  // }

  const left1 = Object.values(allTiles).find(
    (x) =>
      x.left === null && x.top === null && x.right !== null && x.bottom !== null
  );
  const right1 = Object.values(allTiles).find(
    (x) =>
      x.right === null && x.top === null && x.left !== null && x.bottom !== null
  );
  const right2 = Object.values(allTiles).find(
    (x) =>
      x.right === null && x.bottom === null && x.left !== null && x.top !== null
  );
  const left2 = Object.values(allTiles).find(
    (x) =>
      x.left === null && x.bottom === null && x.right !== null && x.top !== null
  );
  console.log(left1?.id, right1?.id, left2?.id, right2?.id);

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return left1?.id * right1?.id * left2?.id * right2?.id;
};

function opposite(i) {
  switch (i) {
    case 0:
      return 2;
    case 1:
      return 3;
    case 2:
      return 0;
    case 3:
      return 1;
  }
}

function rotate(matrix) {
  // function statement
  const N = matrix.length - 1; // use a constant
  // use arrow functions and nested map;
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
  matrix.length = 0; // hold original array reference
  matrix.push(...result); // Spread operator
  return matrix;
}

// function rotate(matrix) {
//   return matrix[0].map((val, index) =>
//     [...matrix.map((row) => row[index])].reverse()
//   );
// }

class Tile {
  constructor(_id, _top, _right, _bot, _left, _grid) {
    this.id = _id;
    this.top = _top;
    this.left = _left;
    this.right = _right;
    this.bottom = _bot;

    this.grid = _grid;
  }

  get(x, y) {
    this.grid[y][x];
  }

  getBorders() {
    let borders = [];
    //top
    borders.push(this.grid[0]);
    //right
    borders.push(
      this.grid
        .map((x) => x[x.length - 1])
        .reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, [])
    );
    //bot
    borders.push(this.grid[this.grid.length - 1]);
    //left
    borders.push(
      this.grid
        .map((x) => x[0])
        .reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, [])
    );

    return borders;
  }

  flipHorizontal() {
    this.grid = this.grid.map((x) => [...x].reverse());
  }

  flipVertical() {
    this.grid.reverse();
  }

  rotate(times) {
    for (let i = 0; i < times; i++) {
      this.grid = rotate(this.grid);
    }
  }

  setNeigh(i, tileId) {
    switch (i) {
      case 0:
        this.top = tileId;
        break;
      case 1:
        this.right = tileId;
        break;
      case 2:
        this.bottom = tileId;
        break;
      case 3:
        this.left = tileId;
        break;
    }
  }

  getNeigh(i) {
    switch (i) {
      case 0:
        return this.top;
      case 1:
        return this.right;
      case 2:
        return this.bottom;
      case 3:
        return this.left;
    }
  }

  print() {
    console.log("Tile ", this.id);
    this.grid.forEach((x) => {
      console.log(x.map((y) => (y ? "#" : ".")).join(""));
    });
  }
}

function arrMatch(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

// Part 2
// ======
// ~0 ms - answer: 0

const part2 = (input) => {
  const start = now();
  let result = 0;

  const data = input.split("\n");

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return result;
};

module.exports = { part1, part2 };
