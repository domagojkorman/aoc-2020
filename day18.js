const fs = require('fs');

const input = fs.readFileSync('./input/day18.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1)
  .map(v => v.replace(/\(/g, '( ',).replace(/\)/g, ' )'))
  .map(v => v.split(' '));

function evaluate(row, index) {
  const left = row[index];
  const middle = row[index + 1];
  const right = row[index + 2];

  if (left === '(') {
    if (right === ')') {
      row.splice(index, 3, middle);
      return;
    } else {
      evaluate(row, index + 1);
      evaluate(row, index);
      return;
    }
  }

  if (middle === ')') {
    evaluate(row, index - 1);
    return;
  }

  if (right === '(') {
    evaluate(row, index + 3);
    evaluate(row, index);
    return;
  }

  if (middle === undefined && right === undefined) {
    return;
  }

  if (middle === '+') {
    const result = eval(`${left}${middle}${right}`);
    row.splice(index, 3, result);
    evaluate(row, index);
    return;
  }

  if (middle === '*') {
    const nextOperator = row[index + 3];
    if (nextOperator !== '+') {
      const result = eval(`${left}${middle}${right}`);
      row.splice(index, 3, result);
      evaluate(row, index);
      return;
    } else {
      evaluate(row, index + 2);
      evaluate(row, index);
      return;
    }
  }
}

const r = input.reduce((total, current) => {
  evaluate(current, 0);
  return total + current[0];
}, 0)

console.log(r);
