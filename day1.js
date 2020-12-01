const fs = require('fs');

const input = fs.readFileSync('./input/day1.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);
const sortedNumbers = input.map(Number);

let result1;
let result2;
sortedNumbers.forEach((n) => {
  sortedNumbers.forEach((t) => {
    if ((t + n) === 2020) {
      result1 = [n,t];
    }
    sortedNumbers.forEach((l) => {
      if ((t + n + l) === 2020) {
        result2 = [n,t,l];
      }
    })
  })
})
console.log(result1.reduce((c, t) => t * c), result2.reduce((c, t) => t * c));
