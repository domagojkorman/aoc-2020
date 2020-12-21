const fs = require('fs');

const input = fs.readFileSync('./input/day20.txt', 'utf8')
  .split(/\n|\r\n|\r/)
  .slice(0, -1)
  .filter(Boolean);

let tile;
const tiles = [];
input.forEach((row) => {
  if (row.startsWith('Tile')) {
    tile = {key: row.slice(5, -1), img: []}
    tiles.push(tile);
  } else {
    tile.img.push([...row]);
  }
});

const gridSize = tiles[0].img.length;
const imageSize = Math.sqrt(tiles.length);

function createGrid(n) {
  return Array.from(new Array(n), () => new Array(n));
}

function rotate(img) {
  const newImg = createGrid(gridSize);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      newImg[i][j] = img[gridSize - j - 1][i];
    }
  }
  return newImg;
}

function flip(img) {
  const newImg = createGrid(gridSize);
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      newImg[i][j] = img[i][gridSize - j - 1];
    }
  }
  return newImg;
}

function fitsLeft(image, row, column, part) {
  const startRow = row * gridSize;
  const startColumn = column * gridSize;

  for (let i = 0; i < gridSize; i++) {
    const left = image[startRow + i][startColumn - 1];
    const right = part[i][0];
    if (left !== right) return false;
  }

  return true;
}

function fitsTop(image, row, column, part) {
  const startRow = row * gridSize;
  const startColumn = column * gridSize;

  for (let i = 0; i < gridSize; i++) {
    const top = image[startRow - 1][startColumn + i];
    const bottom = part[0][i];
    if (top !== bottom) return false;
  }

  return true;
}

function fits(image, row, column, part) {
  if (row === 0 && column === 0) return true;

  if (row === 0) return fitsLeft(image, row, column, part);
  if (column === 0) return fitsTop(image, row, column, part);

  return fitsLeft(image, row, column, part) && fitsTop(image,row, column, part);
}

function fill(image, row, column, part) {
  const startRow = row * gridSize;
  const startColumn = column * gridSize;

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      image[startRow + i][startColumn + j] = part[i][j];
    }
  }
}

function cropImage(image) {
  const newSize = imageSize * (gridSize - 2);
  const newImage = createGrid(newSize);

  let newI = 0;
  for (let i = 0; i < imageSize * gridSize; i++) {
    if (i % gridSize === 0 || i % gridSize === (gridSize - 1)) continue;
    newJ = 0;
    for (let j = 0; j < imageSize * gridSize; j++) {
      if (j % gridSize === 0 || j % gridSize === (gridSize - 1)) continue;
      newImage[newI][newJ] = image[i][j];
      newJ++;
    }

    newI++;
  }

  return newImage;
}

function findSeaMonsters(image) {
  let numberOfSeaMonsters = 0;
  for (let i = 0; i < image.length - 2; i++) {
    for (let j = 18; j < image.length; j++) {
      if (
        image[i][j] === '#' &&
        image[i + 1][j + 1] === '#' &&
        image[i + 1][j] === '#' &&
        image[i + 1][j - 1] === '#' &&
        image[i + 2][j - 2] === '#' &&
        image[i + 2][j - 5] === '#' &&
        image[i + 1][j - 6] === '#' &&
        image[i + 1][j - 7] === '#' &&
        image[i + 2][j - 8] === '#' &&
        image[i + 2][j - 11] === '#' &&
        image[i + 1][j - 12] === '#' &&
        image[i + 1][j - 13] === '#' &&
        image[i + 2][j - 14] === '#' &&
        image[i + 2][j - 17] === '#' &&
        image[i + 1][j - 18] === '#'
      ) {
        numberOfSeaMonsters++;
      }
    }
  }

  return numberOfSeaMonsters;
}

function countHashes(image) {
  let total = 0;
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image.length; j++) {
      if (image[i][j] === '#') {
        total++;
      }
    }
  }

  return total;
}

function solveImage(image, ids, number, tiles) {
  if (tiles.length === 0) return [image, ids];
  const row = Math.floor(number / imageSize);
  const column = number % imageSize;

  for (let i = 0; i < tiles.length; i++) {
    for (let f = 0; f < 2; f++) {
      for (let r = 0; r < 4; r++) {
        if (fits(image, row, column, tiles[i].img)) {
          fill(image, row, column, tiles[i].img);
          ids[row][column] = tiles[i].key;
          const result = solveImage(image, ids, number + 1, tiles.filter((t, index) => i !== index));
          if (result) {
            return result;
          }
        }
        tiles[i].img = rotate(tiles[i].img);
      }
      tiles[i].img = flip(tiles[i].img);
    }
  }

  return null;
}

const [image, ids] = solveImage(
  createGrid(gridSize * imageSize),
  createGrid(imageSize),
  0,
  tiles
);

const croppedImage = cropImage(image);
const numberOfSeaMonsters = findSeaMonsters(croppedImage);
console.log(`Sea monsters ${numberOfSeaMonsters}`)
const hashes = countHashes(croppedImage) - (numberOfSeaMonsters * 15);

console.log(hashes);
