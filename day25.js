const fs = require('fs');

const GRID_SIZE = 400;

const [cardKey, doorKey] = fs.readFileSync('./input/day25.txt', 'utf8')
  .split(/\n/)
  .slice(0, -1)
  .map(Number);

function calculateLoopSize(result) {
  let loopSize = 1;
  let value = 1;
  while (true) {
    value = (value * 7) % 20201227;
    if (result === value) return loopSize;
    loopSize++;
  }
}

function calculateEncryptionKey(subject, loopSize) {
  let result = 1;
  for (let i = 0; i < loopSize; i++) {
    result = (result * subject) % 20201227;
  }
  return result;
}

const cardLoopSize = calculateLoopSize(cardKey);
const doorLoopSize = calculateLoopSize(doorKey);
console.log(calculateEncryptionKey(doorKey, cardLoopSize));
console.log(calculateEncryptionKey(cardKey, doorLoopSize));
