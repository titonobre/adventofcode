import { readFile } from "fs/promises";

import { solvePart1, solvePart2 } from "./solution.js";

const inputFile = process.argv[2] ?? "input.txt";

const input = await readFile(new URL(inputFile, import.meta.url), "utf8");

console.log(solvePart1(input));
console.log(solvePart2(input));
