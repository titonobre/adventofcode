import assert from 'node:assert/strict'
import { readFile } from "node:fs/promises";
import { describe, test } from 'node:test'

import { solvePart1, solvePart2 } from "./solution.js";

const example = await readFile(new URL("./example.txt", import.meta.url), "utf8");
const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

describe("2023/07", () => {
    describe("example", () => {
        test("part 1", () => assert.equal(solvePart1(example), 6440));
        test("part 2", () => assert.equal(solvePart2(example), 5905));
    });
    describe("input", () => {
        test("part 1", () => assert.equal(solvePart1(input), 248179786));
        test("part 2", () => assert.equal(solvePart2(input), 247885995));
    });
});
