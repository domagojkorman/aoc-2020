const fs = require('fs');

const input = fs.readFileSync('./input/day8.txt', 'utf8').split(/\n|\r\n|\r/).slice(0, -1);
const commands = input.map(i => ({command: i.split(' ')[0], value: Number(i.split(' ')[1])}));

function execute(commands, index, changed, acc) {
  if (commands[index] === null) return -1;
  if (index === commands.length - 1) {
    const {command, value} = commands[index];
    const nextAcc = command === 'acc' ? acc + value : acc;
    return nextAcc;
  };


  const {command, value} = commands[index];
  commands[index] = null;
  const nextIndex = command === 'jmp' ? index + value : index + 1;
  const nextAcc = command === 'acc' ? acc + value : acc;
  const val = execute([...commands], nextIndex, changed, nextAcc);

  if (val === -1 && !changed && command !== 'acc') {
    const changedIndex = command === 'nop' ? index + value : index + 1;
    return execute([...commands], changedIndex, true, nextAcc);
  }

  return val;
}

console.log(execute(commands, 0, false, 0));
