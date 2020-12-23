const { count } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./input/day23.txt', 'utf8').split(/\n/)[0];

const refMap = new Map();

let current;
let prev;
[...input].map(Number).forEach((c) => {
  const node = {value: c, next: null};
  if (!current) {
    current = node;
  } else {
    prev.next = node;
  }
  refMap.set(node.value, node);
  prev = node;
});

for (let i = 10; i <= 1000000; i++) {
  const node = {value: i, next: null};
  prev.next = node;
  prev = node;
  refMap.set(node.value, node);
}

prev.next = current;

function clampValue(value) {
  return value === 0 ? 1000000 : value;
}

function findValue(current, first, second, third) {
  const value = clampValue(current - 1);
  return [first, second, third].includes(value) ? findValue(value, first, second, third) : value;
}

for (let i = 0; i < 10000000; i++) {
  const first = current.next;
  const second = current.next.next;
  const third = current.next.next.next;
  current.next = third.next;

  const value = findValue(current.value, first.value, second.value, third.value);
  const destination = refMap.get(value);

  third.next = destination.next;
  destination.next = first;
  current = current.next;
}

const one = refMap.get(1);

console.log(one.next.value * one.next.next.value);
