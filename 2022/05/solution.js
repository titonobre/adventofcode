// prepare

function parseInput(input) {
  const [header, procedure] = input.split("\n\n");

  // parse stacks diagram

  const [stacksKeysRow, ...stacksRows] = header.split("\n").reverse();

  const stackKeys = stacksKeysRow.trim().split(/\s*/g);

  const stacksMatrix = stacksRows.map((row) => {
    const matches = row.matchAll(/(?:\[(\w)\]|\s{3})\s?/g);

    return [...matches].map((match) => match[1]);
  });

  const stacks = stackKeys.reduce((acc, key, index) => {
    acc[key] = stacksMatrix.map((box) => box[index]).filter((box) => !!box);
    return acc;
  }, {});

  // parse procedure steps

  const steps = procedure
    .split("\n")
    .filter((line) => line.length > 0)
    .map((line) => {
      const match = line.match(/move (\d+) from (\d+) to (\d+)/);

      const amount = parseInt(match[1]);
      const from = match[2];
      const to = match[3];

      return { amount, from, to };
    });

  return { stacks, stackKeys, steps };
}

// part1

export function solvePart1(input) {
  const { stacks, stackKeys, steps } = parseInput(input);

  const stacksAfter = steps.reduce((acc, { amount, from, to }) => {
    return [...Array(amount)].reduce((acc2, i) => {
      const crate = acc2[from].at(-1);

      return {
        ...acc2,
        [from]: acc2[from].slice(0, -1),
        [to]: [...acc2[to], crate],
      };
    }, acc);
  }, stacks);

  const topBoxes = stackKeys.map((key) => stacksAfter[key].at(-1)).join("");

  return topBoxes;
}

// part 2

export function solvePart2(input) {
  const { stacks, stackKeys, steps } = parseInput(input);

  const stacksAfterCrateMover9001 = steps.reduce((acc, { amount, from, to }) => {
    const crates = acc[from].slice(-amount);

    return {
      ...acc,
      [from]: acc[from].slice(0, -amount),
      [to]: [...acc[to], ...crates],
    };
  }, stacks);

  const topBoxesAfterCrateMover9001 = stackKeys.map((key) => stacksAfterCrateMover9001[key].at(-1)).join("");

  return topBoxesAfterCrateMover9001;
}
