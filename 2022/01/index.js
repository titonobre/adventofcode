import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

const lines = input.split("\n");

// part 1

const values = lines
  .reduce((acc, line) => {
    const lastGroup = acc.at(-1);

    const currentGroup = lastGroup || [];

    if (currentGroup !== lastGroup) {
      acc.push(currentGroup);
    }

    if (line.trim().length > 0) {
      currentGroup.push(parseInt(line));
    } else {
      acc.push([]);
    }

    return acc;
  }, [])
  .map((items) => items.reduce((acc, value) => acc + value, 0));

const max = Math.max(...values);

console.log(max);

// part 2

const topTotal = values
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((total, value) => total + value, 0);

console.log(topTotal);
