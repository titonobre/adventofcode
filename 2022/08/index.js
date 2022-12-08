import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

const grid = input
  .split("\n")
  .filter((line) => line.length > 0)
  .map((line) => {
    return line.split("").map(Number);
  });

function getLines(grid, r, c) {
  const column = grid.map((row) => row[c]);
  const row = grid[r];

  const north = column.slice(0, r);
  const south = column.slice(r + 1);
  const east = row.slice(c + 1);
  const west = row.slice(0, c);

  return { north, south, east, west };
}

// part 1

function countVisibleTrees(grid) {
  let visibleTrees = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const tree = grid[row][column];

      const { north, south, east, west } = getLines(grid, row, column);

      if (
        tree > Math.max(...north) ||
        tree > Math.max(...south) ||
        tree > Math.max(...east) ||
        tree > Math.max(...west)
      ) {
        visibleTrees++;
      }
    }
  }

  return visibleTrees;
}

const visibleTreesCount = countVisibleTrees(grid);

console.log(visibleTreesCount);

// part 2

function getVisibleTrees(trees, height) {
  const visibleTrees = [];

  for (let i = 0; i < trees.length; i++) {
    visibleTrees.push(trees[i]);
    if (trees[i] >= height) {
      break;
    }
  }
  return visibleTrees;
}

function getMaxScenicScore(grid) {
  let maxScenicScore = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; column < grid[row].length; column++) {
      const tree = grid[row][column];

      const { north, south, east, west } = getLines(grid, row, column);

      const visibleNorth = getVisibleTrees(north.reverse(), tree).length;
      const visibleSouth = getVisibleTrees(south, tree).length;
      const visibleEast = getVisibleTrees(east, tree).length;
      const visibleWest = getVisibleTrees(west.reverse(), tree).length;

      const scenicScore =
        visibleNorth * visibleSouth * visibleEast * visibleWest;

      if (scenicScore > maxScenicScore) {
        maxScenicScore = scenicScore;
      }
    }
  }

  return maxScenicScore;
}

const maxScenicScore = getMaxScenicScore(grid);

console.log(maxScenicScore);
