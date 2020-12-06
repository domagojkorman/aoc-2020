const fs = require('fs');

const input = fs.readFileSync('./input/day6.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

let init = false;
const answers = input.reduce((total, current) => {
  if (!current) {
    init = false;
    return total;
  }

  if (!init) {
    init = true;
    return [...total, [...current]];
  }

  const filter = total.pop().filter((answer) => current.includes(answer));
  return [...total, filter];
}, []);

const sum = answers.reduce((total, current) => total + current.length, 0);
console.log(sum);
