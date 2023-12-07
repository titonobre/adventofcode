import assert from 'node:assert/strict'
import { readFile } from "node:fs/promises";
import { describe, test } from 'node:test'

import { solvePart1, solvePart2 } from "./solution.js";

const example1 = await readFile(new URL("./example1.txt", import.meta.url), "utf8");
const example2 = await readFile(new URL("./example2.txt", import.meta.url), "utf8");
const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

describe("2023/01", () => {
    describe("example", () => {
        test("part 1", () => assert.equal(solvePart1(example1), 142));
        test("part 2", () => assert.equal(solvePart2(example2), 281));
    });
    describe("input", () => {
        test("part 1", () => assert.equal(solvePart1(input), 55029));
        test("part 2", () => assert.equal(solvePart2(input), 55686));
    });
});
