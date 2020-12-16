const fs = require('fs');

const input = fs.readFileSync('./input/day16.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1)
  .filter(Boolean);

let rules = {};
let my;
let other = [];
let rulesOrder = {};

function isInvalid(input) {
  return Object.values(rules).every((rule) => !isInRange(rule, input));
}

function isInRange(rule, input) {
  return rule.some(({min, max}) => input >= min && input <= max);
}

function areAllRulesAssigned() {
  return Object.values(rulesOrder).every(v => v !== -1);
}

function filterValidIndices(ruleName, validTickets) {
  const rule = rules[ruleName];
  const assignedIndices = Object.values(rulesOrder).filter(v => v !== -1);
  const validIndices = [];
  for (let index = 0; index < my.length; index++) {
    const isValid = validTickets.every(ticket => isInRange(rule, ticket[index]) && !assignedIndices.includes(index));
    if (isValid) validIndices.push(index);
  }

  return validIndices;
}

let parsing = 'rules';
input.forEach((v) => {
  if (v === 'your ticket:') {
    parsing = 'my';
  } else if (v === 'nearby tickets:') {
    parsing = 'other';
  } else if (parsing === 'rules') {
    let [ruleName, ruleValues] = v.split(': ');
    ruleName = ruleName.replace(/\s/g, '-');
    const ranges = ruleValues.split(' or ');
    rules[ruleName] = [];
    rulesOrder[ruleName] = -1;
    ranges.forEach((range) => {
      const [min, max] = range.split('-');
      rules[ruleName].push({min: Number(min), max: Number(max)});
    });
  } else if (parsing === 'my') {
    my = v.split(',').map(Number);
  } else {
    other.push(v.split(',').map(Number));
  }
});

const validTickets = other.filter(ticket => {
  return !ticket.some((v) => isInvalid(v));
}).concat([my]);

let index = 0;
while(!areAllRulesAssigned()) {
  const ruleNames = Object.keys(rules);
  const order = index % ruleNames.length;
  const ruleName = ruleNames[order];
  if (rulesOrder[ruleName] === -1) {
    const validIndices = filterValidIndices(ruleName, validTickets);
    if (validIndices.length === 1) {
      rulesOrder[ruleName] = validIndices[0];
    }
  }
  index++;
}

const myTicket = Object.entries(rulesOrder).reduce((o, [key, value]) => {
  return {...o, [key]: my[value]};
}, {});

const result = Object.entries(myTicket).reduce((acc, [name, value]) => {
  return acc * (name.includes('departure') ? value : 1);
}, 1)
console.log(result)
