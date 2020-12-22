const fs = require('fs');

const deckInputs = fs.readFileSync('./input/day22.txt', 'utf8').split(/\n{2}/);

const [deck1, deck2] = deckInputs.map(v => v.split(/\n/).filter(Boolean).filter(v => !v.startsWith('Player')).map(Number));

function historyRepeats(history, deck1, deck2) {
  const key1 = deck1.join(',');
  const key2 = deck2.join(',');
  const key = `${key1}-${key2}`;
  const exists = history[key];

  history[key] = true;
  return Boolean(exists);
}

function play(deck1, deck2) {
  let history = {};
  while(true) {
    if (deck1.length === 0 || deck2.length === 0) break;
    if (historyRepeats(history, deck1, deck2)) {
      deck2 = [];
      break;
    }

    const top1 = deck1[0];
    const top2 = deck2[0];
    deck1 = deck1.slice(1);
    deck2 = deck2.slice(1);

    if (deck1.length >= top1 && deck2.length >= top2) {
      const [d1, d2] = play(deck1.slice(0, top1), deck2.slice(0, top2));
      if (d2.length === 0) {
        deck1 = deck1.concat(top1, top2);
      } else {
        deck2 = deck2.concat(top2, top1);
      }
    } else {
      if (top1 > top2) {
        deck1 = deck1.concat(top1, top2);
      } else {
        deck2 = deck2.concat(top2, top1);
      }
    }
  }

  return [deck1, deck2];
}

const [d1, d2] = play(deck1, deck2);
const winningDeck = d1.length === 0 ? d2 : d1;

console.log(winningDeck.reduce((acc, current, index) => acc + (winningDeck.length - index) * current, 0));
