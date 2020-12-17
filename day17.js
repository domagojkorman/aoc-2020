const fs = require('fs');

const input = fs.readFileSync('./input/day17.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1);

let grid = {};
let newGrid = {};

function toKey(x, y, z, w) {
  return `${x},${y},${z},${w}`;
}

for (let y = 0; y < input.length; y++) {
  for (let x = 0; x < input[y].length; x++) {
    grid[toKey(x, y, 0, 0)] = input[y][x] === '#';
  }
}

function findCube(x, y, z, w) {
  const key = toKey(x, y, z, w);
  let cube = grid[key];
  if (cube === undefined) {
    newGrid[key] |= false;
    return false;
  }

  return cube;
}

function findNeighbours(cubeX, cubeY, cubeZ, cubeW) {
  const neighbours = [];
  for (let x = cubeX - 1; x <= cubeX + 1; x++) {
    for (let y = cubeY - 1; y <= cubeY + 1; y++) {
      for (let z = cubeZ - 1; z <= cubeZ + 1; z++) {
        for (let w = cubeW - 1; w <= cubeW + 1; w++) {
          if (x !== cubeX || y !== cubeY || z !== cubeZ || w !== cubeW) {
            neighbours.push(findCube(x, y, z, w));
          }
        }
      }
    }
  }
  return neighbours;
}

function resolveCycle() {
  for (let x = -10; x <= 10; x++) {
    console.log(`X = [${x}]`);
    for (let y = -10; y <= 10; y++) {
      for (let z = -10; z <= 10; z++) {
        for (let w = -10; w <= 10; w++) {
          const key = toKey(x, y, z, w);
          const cube = findCube(x, y, z, w);
          const neighbours = findNeighbours(x, y, z, w);
          const numberOfActive = neighbours.filter(Boolean).length;
          if (cube) {
            newGrid[key] = numberOfActive === 2 || numberOfActive === 3
          } else {
            newGrid[key] = numberOfActive === 3
          }
        }
      }
    }
  }
}

for (let i = 0; i < 6; i++) {
  console.log('==================')
  console.log(`Cycle ${i + 1}`);
  resolveCycle();
  grid = {...newGrid};
  newGrid = {};
}

console.log(Object.values(grid).filter(Boolean).length)

// for(let z = 0; z <= 0; z++) {
//   console.log(`Z=${z}`);
//   for(let y = -1; y <= 3; y++) {
//     const s = [];
//     for (let x = -1; x <= 3; x++) {
//       s.push(findCube(x, y, z) ? '#' : '.');
//     }
//     console.log(s.join(''));
//   }
// }
