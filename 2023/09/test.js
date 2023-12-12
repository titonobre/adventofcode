import assert from 'node:assert/strict'
import { readFile } from "node:fs/promises";
import { describe, test } from 'node:test'

import { solvePart1, solvePart2 } from "./solution.js";

const example = await readFile(new URL("./example.txt", import.meta.url), "utf8");
const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

describe("2023/09", () => {
    describe("example", () => {
        test("part 1", () => assert.equal(solvePart1(example), 114));
        test("part 2", () => assert.equal(solvePart2(example), 2));
    });
    describe("input", () => {
        test("part 1", () => assert.equal(solvePart1(input), 1953784198));
        test("part 2", () => assert.equal(solvePart2(input), 957));
    });
});
