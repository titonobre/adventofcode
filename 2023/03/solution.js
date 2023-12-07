// prepare input

const symbol = /[^\d\.]/g;
const number = /\d+/g;

function parseInput(input) {
  return input.split("\n").map((line) => {
    const parts = [...line.matchAll(number)].map((match) => {
      return {
        id: Number(match[0]),
        start: match.index,
        end: match.index + match[0].length - 1,
      };
    });

    const symbols = [...line.matchAll(symbol)].map((match) => {
      return {
        symbol: match[0],
        position: match.index,
      };
    });

    return { line, parts, symbols };
  });
}

// utils

function isPartAroundPosition(position) {
  return ({ start, end }) => {
    return start - 1 <= position && position <= end + 1;
  };
}

// part 1

export function solvePart1(input) {
  const schematic = parseInput(input);

  const allParts = [];

  for (let l = 0; l < schematic.length; l++) {
    const { parts, symbols } = schematic[l];

    for (const { position } of symbols) {
      const partCandidates = [...(schematic[l - 1]?.parts ?? []), ...parts, ...(schematic[l + 1]?.parts ?? [])];

      allParts.push(...partCandidates.filter(isPartAroundPosition(position)));
    }
  }

  const result1 = allParts.reduce((acc, part) => acc + part.id, 0);
  return result1;
}

// part 2

function getGears(schematic) {
  const gears = [];

  for (let l = 0; l < schematic.length; l++) {
    const { parts, symbols } = schematic[l];

    for (const { symbol, position } of symbols) {
      if (symbol !== "*") {
        continue;
      }

      const partCandidates = [...(schematic[l - 1]?.parts ?? []), ...parts, ...(schematic[l + 1]?.parts ?? [])];

      const adjacentParts = partCandidates.filter(isPartAroundPosition(position));

      if (adjacentParts.length === 2) {
        gears.push(adjacentParts);
      }
    }
  }
  return gears;
}

export function solvePart2(input) {
  const schematic = parseInput(input);

  const gears = getGears(schematic);

  return gears.reduce((acc, [p1, p2]) => acc + p1.id * p2.id, 0);
}
