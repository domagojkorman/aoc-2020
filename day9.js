const fs = require('fs');

const input = fs.readFileSync('./input/day9.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1).map(Number);

const invalid = input.slice(25).find((n, i) => {
  return !input.slice(i, 25 + i).find((first, j) => {
    return input.slice(i, 25 + i).find((second, k) => {
      return j !== k && first + second === n;
    })
  })
})

function sumCont(invalid, index, step) {
  const contArray = input.slice(index, index + step).sort((a, b) => a - b);
  const sum = contArray.reduce((acc, c) => acc + c);
  if (sum === invalid) {
    return contArray[0] + contArray.pop();
  } else if (sum > invalid) {
    return sumCont(invalid, index - 1, 2);
  } else {
    return sumCont(invalid, index, step + 1);
  }
}

console.log(sumCont(invalid, input.findIndex((t) => t === invalid), 2));
