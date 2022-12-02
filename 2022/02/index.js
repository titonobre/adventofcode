import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

const lines = input.split("\n").filter((line) => line.length > 0);

const hands = ["R", "P", "S", "R"];

const pointsPerHand = {
  R: 1, // rock
  P: 2, // paper
  S: 3, // scissors
};

// part 1

const codeMapping = {
  A: "R",
  B: "P",
  C: "S",
  X: "R",
  Y: "P",
  Z: "S",
};

const total1 = lines.reduce((acc, line) => {
  const [opponent, me] = line.split(" ");

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

console.log(total1);

// part 2

const total2 = lines.reduce((acc, line) => {
  const [opponent, outcome] = line.split(" ");

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

console.log(total2);
