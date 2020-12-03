const fs = require('fs');

const input = fs.readFileSync('./input/day2.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

const formattedInput = input.map((row) => {
  const parts = row.replace(':', '').split(/\s/);
  return {
    min: parts[0].split('-')[0],
    max: parts[0].split('-')[1],
    letter: parts[1],
    password: parts[2],
  }
});

const validPasswords = formattedInput.filter((item) => {
  const timeRepeats = item.password.replace(new RegExp(`[^${item.letter}]`, 'gi'), '').length;
  return timeRepeats >= item.min && timeRepeats <= item.max;
});

console.log("Part 1:", validPasswords.length);

const validPasswords2 = formattedInput.filter((item) => item.password[item.min - 1] === item.letter ^ item.password[item.max - 1] === item.letter);

console.log("Part 2:", validPasswords2.length);
