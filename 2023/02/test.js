import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";

import { solvePart1, solvePart2 } from "./solution.js";

const example = await readFile(new URL("./example.txt", import.meta.url), "utf8");
const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");
const answers = await readFile(new URL("./answers.txt", import.meta.url), "utf8");

describe("2023/02", () => {
  describe("examples", () => {
    test("part 1", () => assert.equal(solvePart1(example), 8));

    test("part 2", () => assert.equal(solvePart2(example), 2286));
  });

  describe("input", () => {
    const [answer1, answer2] = answers.trim().split("\n").filter(Boolean).map(Number);

    test("part 1", () => assert.equal(solvePart1(input), answer1));

    test("part 2", () => assert.equal(solvePart2(input), answer2));
  });
});
