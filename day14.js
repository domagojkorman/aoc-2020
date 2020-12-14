const fs = require('fs');

const input = fs.readFileSync('./input/day14.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1);

  const result = [];
let mask;
input.forEach((row, index) => {
  console.log(index);
  if (row.startsWith('mask')) {
    mask = [...row.replace(/mask\s=\s/g, '')];
  } else {
    const memIndex= [...parseInt(row.split(' = ')[0].slice(4, -1), 10).toString(2).padStart(mask.length, '0')]
    const memValue = parseInt(row.split(' = ')[1], 10);
    let r = [''];
    for (let i = 0; i < memIndex.length; i++) {
      const v = mask[i];
      const t = memIndex[i];
      if (v === '0') {
        r = r.map(res => res + t);
      } else if (v === '1') {
        r = r.map(res => res + '1');
      } else {
        const first = r.map(res => res + '1');
        const second = r.map(res => res + '0');
        r = [...first, ...second];
      }
    }
    r.forEach((memIndex) => {
      result[parseInt(memIndex, 2)] = memValue;
    });
  }
});

console.log(Object.keys(result).reduce((acc, key) => acc + result[key], 0));
