// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" ").map((value) => Number(value)));
}

// utils

function calculateSequenceDifferences(sequence) {
  const sequences = [sequence];

  while (sequences.at(-1).some((value) => value !== 0)) {
    const currentSequence = sequences.at(-1);
    const diffs = currentSequence.slice(1).map((value, i) => value - currentSequence[i]);

    sequences.push(diffs);
  }

  return sequences;
}

function extrapolateNextValue(sequences) {
  return sequences.reduceRight((acc, sequence) => {
    return acc + sequence.at(-1);
  }, 0);
}

function calculateNextValue(sequence) {
  const sequenceAndDiffs = calculateSequenceDifferences(sequence);
  const nextValue = extrapolateNextValue(sequenceAndDiffs);

  return nextValue;
}

// part1

export function solvePart1(input) {
  return parseInput(input)
    .map((sequence) => calculateNextValue(sequence))
    .reduce((acc, value) => acc + value);
}

// part 2

export function solvePart2(input) {
  return parseInput(input)
    .map((sequence) => sequence.toReversed())
    .map((sequence) => calculateNextValue(sequence))
    .reduce((acc, value) => acc + value);
}
