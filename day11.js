const fs = require('fs');

const input = fs.readFileSync('./input/day11.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

function countAll(seats) {
  return seats.reduce((acc1, row) => {
    return acc1 + [...row].reduce((acc2, col) => {
      return acc2 + (col === '#' ? 1 : 0);
    }, 0);
  }, 0);
}

function step(seats, row, col, rowStep, colStep) {
  if (row < 0 || row >= seats.length) {
    return 0;
  }
  if (col < 0 || col >= seats[row].length) {
    return 0;
  }

  if (seats[row][col] === '#') {
    return 1;
  } else if (seats[row][col] === 'L') {
    return 0;
  } else {
    return step(seats, row + rowStep, col + colStep, rowStep, colStep);
  }
}

function count(seats, row, col) {
  const steps = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  return steps.reduce((acc, current) => acc + step(seats, row + current[0], col + current[1], current[0], current[1]), 0);
}

function round(seats) {
  return seats.map((row, rowNr) => {
    return [...row].map((column, colNr) => {
      if (column === '.') {
        return '.';
      }

      const nrOfTaken = count(seats, rowNr, colNr);
      if (nrOfTaken === 0) {
        return '#';
      } else if (nrOfTaken >= 5) {
        return 'L';
      } else {
        return column;
      }
    }).join('');
  });
}

function isEqual(seats, newSeats) {
  if (!seats || !newSeats) return false;

  for (let i = 0; i < seats.length; i++) {
    for (let j = 0; j < seats[i].length; j++) {
      if (seats[i][j] !== newSeats[i][j]) return false;
    }
  }

  return true;
}

let seats;
let newSeats = input;

while(!isEqual(seats, newSeats)) {
  seats = [...newSeats];
  newSeats = round(seats);
}

console.log(newSeats);
console.log(countAll(newSeats));
