// prepare

function parseInput(input) {
  const [firstLine, _emptyLine, ...remainingLines] = input.trim().split("\n");

  const directions = [...firstLine];

  const nodePattern = /(\w{3}) = \((\w{3}), (\w{3})\)/;

  const nodesEntries = remainingLines.map((line) => {
    const [_, node, left, right] = line.match(nodePattern);

    return [node, { node, left, right }];
  });

  const nodes = new Map(nodesEntries);

  return { directions, nodes };
}

// utils

function findStepsToZ(currentNode, map) {
  let step = 0;

  while (currentNode.node[2] !== "Z") {
    const i = step % map.directions.length;
    const direction = map.directions[i];

    switch (direction) {
      case "L":
        currentNode = map.nodes.get(currentNode.left);
        break;
      case "R":
        currentNode = map.nodes.get(currentNode.right);
        break;
    }

    step++;
  }

  return step;
}

// part1

export function solvePart1(input) {
  const map = parseInput(input);

  const currentNode = map.nodes.get("AAA");

  return findStepsToZ(currentNode, map);
}

// part 2

export function solvePart2(input) {
  const map = parseInput(input);

  let currentNodes = [...map.nodes.values()].filter(({ node }) => node[2] === "A");

  const steps = currentNodes.map(function (currentNode) {
    return findStepsToZ(currentNode, map);
  });

  const greatestCommonDivisor = (a, b) => (a ? greatestCommonDivisor(b % a, a) : b);

  const leastCommonMultiple = (a, b) => (a * b) / greatestCommonDivisor(a, b);

  const leastCommonMultipleFromArray = (...values) => values.reduce(leastCommonMultiple);

  return leastCommonMultipleFromArray(...steps);
}
