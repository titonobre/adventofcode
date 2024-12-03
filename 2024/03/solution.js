// prepare

function parseInput(input) {
  return input
    .trim()
    .matchAll(/(?<op0>do|don't)\(\)|(?<op2>mul)\((?<x>\d{1,3}),(?<y>\d{1,3})\)/g)
    .toArray()
    .map(({ groups: { op0, op2, x, y } }) => op2 ? [op2, Number(x), Number(y)] : [op0]);
}

// part1

export function solvePart1(input) {
  const validOperations = parseInput(input);

  const result = validOperations.filter(([op]) => op === "mul").reduce((acc, [, x, y]) => acc + x * y, 0);

  return result;
}

// part 2

export function solvePart2(input) {
  const validOperations = parseInput(input);

  const [, result] = validOperations.reduce(([mulEnabled, value], [op, x, y]) => {

    if (op === "mul") {
      return [mulEnabled, mulEnabled ? value + x * y : value];
    }

    return [op === "do", value];
  }, [true, 0]);

  return result;
}
