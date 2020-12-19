const fs = require('fs');

const input = fs.readFileSync('./input/day19.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1);

function generateNLevels(key, part, n) {
  const parts = part.split(`${key}`);
  const levels = [];
  for (let i = 2; i <= n; i++) {
    const level = parts[0].repeat(i) + parts[1].repeat(i);
    levels.push(level);
  }

  return levels.map(l => l.trim()).join(' | ').replace(/\s{2,}/g, ' ');
}

function normalizeLoops(key, values) {
  return values.split(' | ').reduce((f, part) => {
    if (!part.split(' ').includes(key)) {
      f.push(part);
      return f;
    }

    console.log(`Loop ${key} ${part}`)
    f.push(generateNLevels(key, part, 5));
    return f;
  }, []).join(' | ');
}

let parsing = 'rules';
const {rules, inputs} = input.reduce((o, row) => {
  if (!Boolean(row)) {
    parsing = 'inputs';
  } else if (parsing === 'rules') {
    const [key, values] = row.split(': ');
    o.rules[`R${key}`] = normalizeLoops(key, values);
  } else {
    o.inputs.push(row);
  }
  return o;
}, {rules: {}, inputs:[]});

console.log(rules);

function buildRegex(key) {
  const regex = rules[key];
  if (regex === '\"a\"') return 'a';
  if (regex === '\"b\"') return 'b';

  const newRegex = regex.split(' | ').reduce((f, part) => {
    const regexPart = part.split(' ').reduce((acc, current) => {
      const newKey = `R${current}`;
      return `${acc}${buildRegex(newKey)}`;
    }, '');

    f.push(`(${regexPart})`);
    return f;
  }, []);

  return `(${newRegex.join('|')})`;
}

const regex = `^${buildRegex('R0')}$`;
const regexp = new RegExp(regex);
const filtered = inputs.filter((i) => regexp.test(i));

console.log(regex);
console.log(filtered.length);
