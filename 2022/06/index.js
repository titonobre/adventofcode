import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

// part 1

for (let i = 4; i < input.length; i++) {
  const s = input.substring(i - 4, i);

  if (new Set(s.split("")).size === 4) {
    console.log(i);
    break;
  }
}

// part 2

for (let i = 14; i < input.length; i++) {
  const s = input.substring(i - 14, i);

  if (new Set(s.split("")).size === 14) {
    console.log(i);
    break;
  }
}
