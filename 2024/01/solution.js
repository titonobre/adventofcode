// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce((acc, line) => {
      const [left, right] = line.split("   ").map(Number);

      acc.left.push(left);
      acc.right.push(right);

      return acc;
    }, { left: [], right: [] });
}

// part1

export function solvePart1(input) {
  const { left, right } = parseInput(input);

  const sortedLeft = left.sort();
  const sortedRight = right.sort();

  const differences = sortedLeft.map((el, i) => Math.abs(el - sortedRight[i]));

  const sum = differences.reduce((acc, el) => acc + el, 0);

  return sum;
}

// part 2

export function solvePart2(input) {
  const { left, right } = parseInput(input);

  const rightCounts = right.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  const similarityScore = left.reduce((acc, el) => {
    return acc + el * (rightCounts[el] || 0);
  }, 0);

  return similarityScore;
}
