const fs = require('fs');

const input = fs.readFileSync('./input/day13.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(1, -1);

const buses = input[0].split(',')
  .map((value, index) => {
    if (value === 'x') return null;

    return {id: Number(value), offset: index};
  })
  .filter(Boolean);

function isValidTime(bus, minute) {
  return (minute + bus.offset) % bus.id === 0;
}

const r = buses.slice(1).reduce((result, bus) => {
  let minute = result.initial;
  while(!isValidTime(bus, minute)) {
    minute += result.step;
  }

  return {initial: minute, step: result.step * bus.id};
}, {initial: buses[0].id, step: buses[0].id})

console.log(r);
