import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");
