// part1

export function solvePart1(input) {
  for (let i = 4; i < input.length; i++) {
    const s = input.substring(i - 4, i);

    if (new Set(s.split("")).size === 4) {
      return i;
    }
  }
}

// part 2

export function solvePart2(input) {
  for (let i = 14; i < input.length; i++) {
    const s = input.substring(i - 14, i);

    if (new Set(s.split("")).size === 14) {
      return i;
    }
  }
}
