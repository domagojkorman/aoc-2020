const fs = require('fs');

const input = fs.readFileSync('./input/day15.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1)[0]
  .split(',')
  .map(Number)

const numbers = input.slice(0,-1).reduce((o, c, i) => {
  o[`V${c}`] = i + 1;
  return o;
}, {});

let newNumber = 'V19';
for (let i = 7; i < 30000001; i++) {
  if (i % 3000000 === 0) {
    console.log(`${i / 3000000}%`);
  }
// for (let i = 7; i < 2021; i++) {
  const existingNumber = numbers[newNumber];

  if (existingNumber === undefined) {
    numbers[newNumber] = i - 1;
    newNumber = 'V0';
  } else {
    numbers[newNumber] = i - 1;
    newNumber = `V${i - 1 - existingNumber}`;
  }
}

console.log(newNumber);
