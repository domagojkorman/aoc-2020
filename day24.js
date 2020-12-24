const fs = require('fs');

const GRID_SIZE = 400;

const input = fs.readFileSync('./input/day24.txt', 'utf8').split(/\n/).slice(0, -1);
const directions = input.map((row) => {
  let d = [];
  const arr = [...row];
  while (arr.length) {
    let length = 2;
    if (arr[0] === 'e' || arr[0] === 'w') {
      length = 1;
    }
    d.push(arr.splice(0, length).join(''));
  }
  return d;
});

function createGrid(n) {
  return Array.from(new Array(n), () => new Array(n));
}

function fill(hexGrid) {
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (row % 2 === col % 2) {
        hexGrid[row][col] = 'w';
      } else {
        hexGrid[row][col] = null;
      }
    }
  }
}

function getNeighbours(hexGrid, row, col) {
  return [
    hexGrid[row]?.[col - 2],
    hexGrid[row]?.[col + 2],
    hexGrid[row - 1]?.[col - 1],
    hexGrid[row - 1]?.[col + 1],
    hexGrid[row + 1]?.[col - 1],
    hexGrid[row + 1]?.[col + 1]
  ].filter(Boolean);
}

function countBlackTiles(hexGrid, row, col) {
  return getNeighbours(hexGrid, row, col).reduce((acc, c) => acc + (c === 'b' ? 1 : 0), 0);
}

function countAllBlack(hexGrid) {
  let total = 0;
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (hexGrid[row][col] === 'b') {
        total++;
      }
    }
  }
  return total;
}

let hexGrid = createGrid(GRID_SIZE);
fill(hexGrid);

directions.forEach((direction) => {
  let row = GRID_SIZE / 2;
  let col = GRID_SIZE / 2;
  direction.forEach((d) => {
    if (d === 'e') {
      col += 2;
    } else if (d === 'w') {
      col -= 2;
    } else if (d === 'ne') {
      row--;
      col++;
    } else if (d === 'nw') {
      row--;
      col--;
    } else if (d === 'se') {
      row++;
      col++;
    } else if (d === 'sw') {
      row++;
      col--;
    }
  });
  hexGrid[row][col] = hexGrid[row][col] === 'w' ? 'b' : 'w';
});

for (let days = 0; days < 100; days++) {
  const newGrid = createGrid(GRID_SIZE);
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const value = hexGrid[row][col];
      if (value === null) {
        newGrid[row][col] = null;
        continue;
      };

      const nrOfBlack = countBlackTiles(hexGrid, row, col);
      if (value === 'b' && (nrOfBlack === 0 || nrOfBlack > 2)) {
        newGrid[row][col] = 'w';
      } else if (value === 'w' && nrOfBlack === 2) {
        newGrid[row][col] = 'b';
      } else {
        newGrid[row][col] = value;
      }
    }
  }

  hexGrid = newGrid;
  console.log(`Day ${days + 1} = ${countAllBlack(hexGrid)}`);
}

console.log(countAllBlack(hexGrid));
