const fs = require('fs');

const input = fs.readFileSync('./input/day7.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

function count(bags, color) {
  const b = bags.find(b => b.color === color)
  if (!b.bags.length) {
    return 0;
  }

  return b.bags.reduce((total, current) => {
    return total + current.number + current.number * count(bags, current.color)
  }, 0);
}
const bags = input.map((current) => {
  const key = current.split('contain')[0];
  const value = current.split('contain')[1];
  const keyV = key.split(' ').slice(0,-2).join('-');
  const valueV = value.split(',').filter((v) => !v.trim().startsWith('no other')).map((v) => {
    const nr = Number(v.trim().split(' ')[0]);
    const k = v.trim().split(' ').slice(1, -1).join('-');
    return { number: nr, color: k };
  })
  return { color: keyV, bags: valueV};
});

console.log(count(bags, 'shiny-gold'));
