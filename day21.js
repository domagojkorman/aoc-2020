const fs = require('fs');

const input = fs.readFileSync('./input/day21.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1)

const allergensByFood = input.reduce((acc, current) => {
  const [food, allergens] = current.slice(0, -1).split(' (contains ');
  allergens.split(', ').forEach((a) => {
    if (!acc[a]) {
      acc[a] = [];
    }

    acc[a].push(food.split(' '));
  });

  return acc;
}, {});

let contained = {};
for (let allergen in allergensByFood) {
  const filtered = allergensByFood[allergen].reduce((acc, current) => {
    return current.filter((item) => acc.includes(item));
  });
  contained[allergen] = filtered;
}

function pairFoodWithAllergen(food, contained) {
  if (Object.keys(contained).length === 0) return food;

  const allergen = Object.keys(contained).find((key) => {
    return contained[key].length === 1;
  });
  const foodName = contained[allergen][0];
  food[foodName] = allergen;

  const newContained = Object.keys(contained).reduce((acc, current) => {
    if (current === allergen) {
      return acc;
    }

    acc[current] = contained[current].filter((f) => f !== foodName);
    return acc;
  }, {});

  return pairFoodWithAllergen(food, newContained);
}

const pairedFood = pairFoodWithAllergen({}, contained);
const foodWithoutAllergens = [];

for (let allergen in allergensByFood) {
  allergensByFood[allergen].forEach((foodList) => {
    let allergenSet = new Set();
    foodList.forEach((item) => {
      if (!Object.keys(pairedFood).includes(item)) {
        allergenSet.add(item);
      }
    })
    foodWithoutAllergens.push(...allergenSet);
  })
}

const result = input.reduce((acc, current) => {
  const food = current.slice(0, -1).split(' (contains ')[0].split(' ');
  return [...acc, ...food.filter((item) => !Object.keys(pairedFood).includes(item))];
}, []);
console.log(result.length);

const sorted = Object.keys(pairedFood).sort((k1, k2) => pairedFood[k1] < pairedFood[k2] ? -1 : 1);
console.log(sorted.join(','));
