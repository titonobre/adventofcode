// part1

export function solvePart1(input) {
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }
  }

  return floor;
}

// part 2

export function solvePart2(input) {
  let floor = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "(") {
      floor++;
    } else if (input[i] === ")") {
      floor--;
    }

    if (floor === -1) {
      return i + 1;
    }
  }
}
