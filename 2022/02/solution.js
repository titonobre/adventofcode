// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.split(" "));
}

// utils

const hands = ["R", "P", "S", "R"];

const pointsPerHand = {
  R: 1, // rock
  P: 2, // paper
  S: 3, // scissors
};

const codeMapping = {
  A: "R",
  B: "P",
  C: "S",
  X: "R",
  Y: "P",
  Z: "S",
};

// part1

export function solvePart1(input) {
  const entries = parseInput(input);

  const total = entries.reduce((acc, [opponent, me]) => {
    const opponentHand = codeMapping[opponent];
    const meHand = codeMapping[me];

    if (meHand === opponentHand) {
      // draw
      return acc + pointsPerHand[meHand] + 3;
    } else if (hands[hands.indexOf(opponentHand) + 1] === meHand) {
      // win
      return acc + pointsPerHand[meHand] + 6;
    } else {
      // lose
      return acc + pointsPerHand[meHand] + 0;
    }
  }, 0);

  return total;
}

// part 2

export function solvePart2(input) {
  const entries = parseInput(input);


  const total = entries.reduce((acc, [opponent, outcome]) => {
    const opponentHand = codeMapping[opponent];

    if (outcome === "Y") {
      // draw
      return acc + pointsPerHand[opponentHand] + 3;
    } else if (outcome === "Z") {
      // win
      const myHand = hands[hands.indexOf(opponentHand) + 1];

      return acc + pointsPerHand[myHand] + 6;
    } else {
      // lose
      const myHand = hands[hands.lastIndexOf(opponentHand) - 1];

      return acc + pointsPerHand[myHand] + 0;
    }
  }, 0);

  return total;
}
