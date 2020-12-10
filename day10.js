const fs = require('fs');

const input = fs.readFileSync('./input/day10.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1).map(Number).sort((a,b) => a-b);

const result = input.reduce((acc, current, index) => {
  const diff = current - (input[index - 1] || 0);
  acc[diff] = (acc[diff] || 0) + 1;
  return acc;
}, {3: 1});

console.log(result);

const result2 = input.reduce((acc, current, index) => {
  const currentCount = acc[current];
  const i1 = input[index + 1] || 0;
  const i2 = input[index + 2] || 0;
  const i3 = input[index + 3] || 0;
  const diff1 = Math.abs(current - i1);
  const diff2 = Math.abs(current - i2);
  const diff3 = Math.abs(current - i3);

  if (i1 && diff1 <= 3) {
    acc[i1] = (acc[i1] || 0) + currentCount;
  }
  if (i2 && diff2 <= 3) {
    acc[i2] = (acc[i2] || 0) + currentCount;
  }
  if (i3 && diff3 <= 3) {
    acc[i3] = (acc[i3] || 0) + currentCount;
  }
  if (index !== input.length - 1) {
    delete acc[current];
  }
  return acc;
}, {0: 1});

console.log(Object.values(result2)[0]);
