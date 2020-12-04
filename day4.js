const fs = require('fs');

const input = fs.readFileSync('./input/day4.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);

const passports = input.reduce((passports, current) => {
  if (!current) {
    return [...passports, {}]
  }

  let passport = passports.pop();
  const currentFields = current.split(' ').reduce((o, c) => {
    o[c.split(':')[0]] = c.split(':')[1];
    return o;
  }, {});

  passport = {...passport, ...currentFields};
  return [...passports, passport]
}, [{}]);
// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const filtered2 = passports.slice(0).filter(p => {
  const byr = p.byr && Number(p.byr) >= 1920 && Number(p.byr) <= 2002;
  const iyr = p.iyr && Number(p.iyr) >= 2010 && Number(p.iyr) <= 2020;
  const eyr = p.eyr && Number(p.eyr) >= 2020 && Number(p.eyr) <= 2030;
  let hgtV = p.hgt && p.hgt.replace(/cm|in/, '');
  let hgtU = p.hgt && p.hgt.replace(/\d/g, '');
  const hgt = (hgtU === 'cm' && hgtV >= 150 && hgtV <= 193) || (hgtU === 'in' && hgtV >= 59 && hgtV <= 76);
  const hcl = p.hcl && p.hcl.startsWith('#') && p.hcl.slice(1).replace(/[^\da-f]/g, '').length === 6;
  const ecl = p.ecl && ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(p.ecl);
  const pid = p.pid && p.pid.replace(/[^\d]/g, '').length === 9;
  return byr && iyr && eyr && hgt && hcl && ecl && pid;
});
console.log(filtered2.length);
