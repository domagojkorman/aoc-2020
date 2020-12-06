const fs = require('fs');

const input = fs.readFileSync('./input/day5.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

function binarySearch(mapping, string, value) {
  if (string.length === 0) {
    return value;
  }
  return binarySearch(mapping, string.slice(1), value + mapping[string[0]] * Math.pow(2, string.length - 1));
}
const ids = input.map((i) => {
  const row = binarySearch({F: 0, B: 1}, i.slice(0, 7), 0);
  const column = binarySearch({R: 1, L: 0}, i.slice(7, 10), 0);
  return row * 8 + column;
}).sort((a,b) => a - b);

ids.slice(1).forEach((v, i) => {
  if ((v - ids[i]) === 2) {
    console.log(v - 1);
  }
})
