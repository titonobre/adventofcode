// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map(line => {
      const [rawResult, rawOperands] = line.split(":");

      const result = Number(rawResult);
      const operands = rawOperands.trim().split(" ").map(Number);

      return { result, operands };
    });
}

// utils

function calculatePermutationsWithRepetition(elements, k) {
  if (k === 0) return [[]];

  const result = [];

  elements.forEach(element => {
    const smallerPermutations = calculatePermutationsWithRepetition(elements, k - 1);
    smallerPermutations.forEach(permutation => {
      result.push([element, ...permutation]);
    });
  });

  return result;
}

function evaluate(operands, operators) {
  return operands.reduce((acc, operand, i) => {
    const operator = operators[i - 1];

    switch (operator) {
      case "+":
        return acc + operand;
      case "*":
        return acc * operand;
      case "||":
        return Number(String(acc) + String(operand));
      default:
        return acc;
    }
  })
}

function findSolutionsBatch(operations, knownOperators) {
  return operations.map(operation => {

    const { result, operands } = operation;

    const operatorsPermutations = calculatePermutationsWithRepetition(knownOperators, operands.length - 1);

    const solutions = operatorsPermutations.reduce((acc, permutation) => {
      const value = evaluate(operands, permutation);

      if (value === result) {
        acc.push(permutation);
      }

      return acc;
    }, []);

    return { operation, solutions };
  });
}

// part1

export function solvePart1(input) {
  const operations = parseInput(input);

  const knownOperators = ["+", "*"];

  const sumOfResults = findSolutionsBatch(operations, knownOperators)
    .filter(({ solutions }) => solutions.length > 0)
    .reduce((acc, { operation }) => acc + operation.result, 0);

  return sumOfResults;
}

// part 2

export function solvePart2(input) {
  const operations = parseInput(input);

  const knownOperators = ["+", "*", "||"];

  const sumOfResults = findSolutionsBatch(operations, knownOperators)
    .filter(({ solutions }) => solutions.length > 0)
    .reduce((acc, { operation }) => acc + operation.result, 0);

  return sumOfResults;
}
