// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const lastGroup = acc.at(-1);

      const currentGroup = lastGroup || [];

      if (currentGroup !== lastGroup) {
        acc.push(currentGroup);
      }

      if (line.trim().length > 0) {
        currentGroup.push(parseInt(line));
      } else {
        acc.push([]);
      }

      return acc;
    }, [])
    .map((items) => items.reduce((acc, value) => acc + value, 0));
}

// part1

export function solvePart1(input) {
  const values = parseInput(input);

  const max = Math.max(...values);

  return max;
}

// part 2

export function solvePart2(input) {
  const values = parseInput(input);

  const topTotal = values
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((total, value) => total + value, 0);

  return topTotal;
}

// solution

export function solve(input) {
  return [solvePart1(input), solvePart2(input)];
}
