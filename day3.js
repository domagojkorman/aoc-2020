const fs = require('fs');

const input = fs.readFileSync('./input/day3.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

const numberOfTrees = input.reduce((total, row, index) => row[(index * 3) % row.length] === '#' ? total + 1 : total, 0);
console.log(numberOfTrees);

const numberOfTreesOnSlopes = input.reduce((total, row, index) => {
  return total.map((slope) => {
    if (index % slope.col === 0) {
      slope.val = row[(index / slope.col * slope.row) % row.length] === '#' ? slope.val + 1 : slope.val;
    }
    return slope;
  });
}, [{row: 1, col: 1, val: 0}, {row: 3, col: 1, val: 0}, {row: 5, col: 1, val: 0}, {row: 7, col: 1, val: 0}, {row: 1, col: 2, val: 0}]);

console.log(numberOfTreesOnSlopes.reduce((total, current) => total * current.val, 1));
