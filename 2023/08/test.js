import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { describe, test } from "node:test";

import { solvePart1, solvePart2 } from "./solution.js";

const example1 = await readFile(new URL("./example1.txt", import.meta.url), "utf8");
const example2 = await readFile(new URL("./example2.txt", import.meta.url), "utf8");
const example3 = await readFile(new URL("./example3.txt", import.meta.url), "utf8");
const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");
const answers = await readFile(new URL("./answers.txt", import.meta.url), "utf8");

describe("2023/08", () => {
  describe("examples", () => {
    test("part 1.1", () => assert.equal(solvePart1(example1), 2));
    test("part 1.2", () => assert.equal(solvePart1(example2), 6));

    test("part 2", () => assert.equal(solvePart2(example3), 6));
  });

  describe("input", () => {
    const [answer1, answer2] = answers.trim().split("\n").filter(Boolean).map(Number);

    test("part 1", () => assert.equal(solvePart1(input), answer1));

    test.skip("part 2", () => {
      assert.equal(solvePart2(input), answer2);
    });
  });
});
