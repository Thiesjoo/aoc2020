"use strict";
const now = require("performance-now");

// Part 1
// ======
// ~35 ms - answer: 68781323018729

//Code inspiration from: https://github.com/VictiniX888/AdventOfCode-Kotlin/blob/master/src/aoc2020/day20/Tile.kt

const part1 = (input) => {
  const start = now();
  const image = constructImage(input);

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return (
    image[0][0].id *
    image[0][image[0].length - 1].id *
    image[image.length - 1][0].id *
    image[image.length - 1][image[0].length - 1].id
  );
};

function constructImage(input) {
  const data = input.split("\n\n").reduce((acc, x) => {
    let temp = x.split("\n");
    const [, name] = temp[0].match(/Tile (\d+):/);
    const map = temp.slice(1);
    acc.push(
      new Tile(
        name,
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
        let iCurrent = currentBorders.findIndex((y) => arrMatch(y, border));

        let rev = [...border].reverse();
        let iReversedCurrent = currentBorders.findIndex((z) =>
          arrMatch(z, rev)
        );

        if (iCurrent > -1) {
          let rot = (iCurrent + 4 - opposite(iOther)) % 4;
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
          }
        } else if (iReversedCurrent > -1) {
          let rot = (iReversedCurrent + 4 - opposite(iOther)) % 4;
          if (curr.getNeigh(iReversedCurrent) === null) {
            allTiles[tile.id].rotate(rot);

            curr.setNeigh(iReversedCurrent, tile.id);
            tile.setNeigh(opposite(iReversedCurrent), curr.id);
            stack.push(tile);
          }
        }
      });
    });
  }

  // Object.values(allTiles).forEach((x) => {
  //   console.log(x.id, x.top, x.right, x.bottom, x.left);
  // });

  const len = Math.round(Math.sqrt(data.length));
  let image = [];
  const tiles = Object.values(allTiles);

  let left = tiles.find(
    (x) =>
      x.left === null && x.top === null && x.right !== null && x.bottom !== null
  );

  for (let i = 0; i < len; i++) {
    let right = left;
    image[i] = [];
    for (let j = 0; j < len; j++) {
      image[i][j] = right;
      right = allTiles[right.right];
    }
    left = allTiles[left.bottom];
  }
  return image;
}

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
  const N = matrix.length - 1;
  const result = matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
  matrix.length = 0;
  matrix.push(...result);
  return matrix;
}

class Tile {
  constructor(_id, _grid) {
    this.id = _id;
    this.top = null;
    this.left = null;
    this.right = null;
    this.bottom = null;

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
    let test = [...this.grid[this.grid.length - 1]].reverse();
    borders.push(test);
    //left
    borders.push(
      this.grid
        .map((x) => x[0])
        .reduce((acc, val) => {
          acc.push(val);
          return acc;
        }, [])
        .reverse()
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

  removeBorder() {
    let temp = this.grid.slice(1);
    temp.pop();
    this.grid = temp.map((x) => {
      let temp2 = x.slice(1);
      temp2.pop();
      return temp2;
    });
  }

  print() {
    console.log("Tile ", this.id);
    this.grid.forEach((x) => {
      console.log(x.map((y) => (y ? "#" : ".")).join(""));
    });
  }

  toString() {
    return this.grid.map((x) => {
      return x.map((y) => (y ? "#" : ".")).join("");
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

function imageToTile(image) {
  return new Tile(
    0,
    image
      .map((row) => {
        let newArr = [];
        let mapped = row.map((tile) => {
          tile.removeBorder();
          return tile.grid;
        });
        mapped.forEach((x) => {
          x.forEach((y, i) => {
            if (!newArr[i]) newArr[i] = [];
            newArr[i] = newArr[i].concat(y);
          });
        });
        return newArr;
      })
      .reduce((acc, val) => {
        return acc.concat(val);
      }, [])
  );
}

const monster = `                  # 
#    ##    ##    ###
 #  #  #  #  #  #   `;
const regex = monster
  .split("\n")
  .map((x) => new RegExp(`(?=(${x.replace(/\s/g, ".")}))`, "g"));

function countSeaMonsters(image) {
  let count = 0;
  const imageGridOriginal = image.toString();
  for (let y = 0; y < imageGridOriginal.length - 2; y++) {
    const x = (xa, xb) => xa.filter((xc) => new Set(xb).has(xc));
    const yx = (i) =>
      [...imageGridOriginal[y + i].matchAll(regex[i])].map((x) => x.index);
    count += x(x(yx(0), yx(1)), yx(2)).length;
  }
  return count;
}

function calcWaterRoughness(image) {
  const monsters = findAllSeaMonsters(image);
  console.log(monsters);
  if (monsters !== 0) {
    let count = 0; //All the #
    image.grid.forEach((x) => {
      x.forEach((y) => {
        if (y) count++;
      });
    });
    return count - monsters * 15;
  } else {
    return -1;
  }
}

function findAllSeaMonsters(image) {
  let res = 0;
  for (let i = 0; i < 4; i++) {
    res = countSeaMonsters(image);
    if (res !== 0) return res;

    image.flipVertical();
    res = countSeaMonsters(image);
    if (res !== 0) return res;

    image.flipHorizontal();
    res = countSeaMonsters(image);
    if (res !== 0) return res;

    image.flipVertical();
    res = countSeaMonsters(image);
    if (res !== 0) return res;

    image.flipHorizontal();
    image.rotate();
  }

  return 0;
}

// Part 2
// ======
// ~45 ms - answer: 1629

const part2 = (input) => {
  const start = now();
  const image = imageToTile(constructImage(input));
  image.print();
  let result = calcWaterRoughness(image);

  const end = now();
  console.log("Execution time: ~%dms", (end - start).toFixed(3));

  return result;
};

module.exports = { part1, part2 };
