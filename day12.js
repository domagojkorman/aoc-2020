const fs = require('fs');

class Ship {
  constructor(values) {
    this.N = values.N || 0;
    this.S = values.S || 0;
    this.E = values.E || 0;
    this.W = values.W || 0;
  }

  get vertical() {
    return this.S - this.N;
  }

  get horizontal() {
    return this.E - this.W;
  }

  get distance() {
    return Math.abs(this.vertical) + Math.abs(this.horizontal);
  }
}

const input = fs.readFileSync('./input/day12.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1)
  .map((i) => {
    const direction = i.slice(0, 1);
    const value = Number(i.slice(1));
    return {direction, value};
  })

function rotate(waypoint, rotation) {
  const clockwise = ['N', 'E', 'S', 'W'];
  const directions = rotation.direction === 'R' ? clockwise : clockwise.reverse();
  const offset = rotation.value / 90;
  const clone = {...waypoint};

  directions.forEach((direction) => {
    const index = directions.indexOf(direction);
    const newDirection = directions[(index + offset) % 4];
    waypoint[newDirection] = clone[direction];
  })
}

function move(ship, waypoint, move) {
  if (move.direction === 'F') {
    ship.N += waypoint.N * move.value;
    ship.E += waypoint.E * move.value;
    ship.S += waypoint.S * move.value;
    ship.W += waypoint.W * move.value;
  } else {
    waypoint[move.direction] += move.value;
  }
}

const ship = new Ship({});
const waypoint = new Ship({N: 1, E: 10});
input.forEach((command) => {
  if (['L', 'R'].includes(command.direction)) {
    rotate(waypoint, command);
  } else {
    move(ship, waypoint, command);
  }
});

console.log(`Result: ${ship.distance}`);
