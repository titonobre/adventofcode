import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

const pairs = input.split("\n").filter((line) => line.length > 0);

// part 1

const containments = pairs.reduce((acc, pair) => {
  const [assignment1, assignment2] = pair.split(",");

  const [a1S, a1E] = assignment1.split("-").map(Number);
  const [a2S, a2E] = assignment2.split("-").map(Number);

  if ((a1S <= a2S && a1E >= a2E) || (a2S <= a1S && a2E >= a1E)) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(containments);

// part 2

const overlaps = pairs.reduce((acc, pair) => {
  const [assignment1, assignment2] = pair.split(",");

  const [a1S, a1E] = assignment1.split("-").map(Number);
  const [a2S, a2E] = assignment2.split("-").map(Number);

  const start = Math.max(a1S, a2S);
  const end = Math.min(a1E, a2E);

  if (end - start >= 0) {
    return acc + 1;
  }

  return acc;
}, 0);

console.log(overlaps);
