// part1

export function solvePart1(input) {
  let total = 0;
  const digits = [];

  for (const char of input) {
    if (char >= "0" && char <= "9") {
      digits.push(char);
    }
    if (char === "\n") {
      total += Number(`${digits.at(0)}${digits.at(-1)}`);
      digits.length = 0;
    }
  }
  return total;
}

// part 2

const regex = /\d|one|two|three|four|five|six|seven|eight|nine/g;

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};

export function solvePart2(input) {
  return input.split("\n").reduce((acc, line) => {
    let m;

    const matches = [];

    while ((m = regex.exec(line)) !== null) {
      matches.push(m);
      regex.lastIndex = m.index + 1;
    }

    regex.lastIndex = 0;

    if (matches < 1) {
      return acc;
    }

    const digit1 = matches.at(0)[0];
    const digit2 = matches.at(-1)[0];

    const number = Number(`${numbers[digit1] || digit1}${numbers[digit2] || digit2}`);

    return (acc += number);
  }, 0);
}
