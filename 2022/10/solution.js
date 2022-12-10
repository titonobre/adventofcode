// prepare

function parseInput(input) {
  const instructionPattern = /(?<instruction>noop|addx)(?: (?<value>-?\d+))?/;

  return input
    .trim()
    .split("\n")
    .filter((line) => line.length > 0)
    .reduce((acc, line, index) => {
      const match = instructionPattern.exec(line);

      const { instruction, value } = match.groups;

      acc.push({ instruction, value: value && parseInt(value), index });

      return acc;
    }, []);
}

// utils

function executeProgram(instructions) {
  const initialState = { x: 1 };

  return instructions
    .reduce(
      (acc, instruction) => {
        const { x, next } = acc.at(-1); // current state

        const newX = next ?? x;

        switch (instruction.instruction) {
          case "noop":
            acc.push({ x: newX, instruction });
            break;
          case "addx":
            acc.push({ x: newX, instruction });
            acc.push({ x: newX, next: newX + instruction.value, instruction });
            break;
        }

        return acc;
      },
      [initialState],
    )
    .slice(1); // remove the initial state
}

function calculateSignalStrength(cycles) {
  return [...Array(6)]
    .map((_, i) => 20 + i * 40)
    .map((i) => {
      return { i, cycle: cycles[i - 1] }; // cycles start in 1
    })
    .map(({ i, cycle }) => {
      return i * cycle.x;
    })
    .reduce((acc, value) => acc + value);
}

function drawPixels(cycles) {
  return cycles.reduce((acc, cycle, index) => {
    const value = cycle.x;

    const diff = value - (index % 40);
    const diffAbs = Math.abs(diff);
    const foo = diffAbs < 2; // sprite radius

    if (foo) {
      acc += "█";
    } else {
      acc += " ";
    }

    if ((index % 40) + 1 === 40) {
      acc += "\n";
    }

    return acc;
  }, "");
}

// part1

export function solvePart1(input) {
  const instructions = parseInput(input);

  const cycles = executeProgram(instructions);

  return calculateSignalStrength(cycles);
}

// part 2

export function solvePart2(input) {
  const instructions = parseInput(input);

  const cycles = executeProgram(instructions);

  return drawPixels(cycles);
}
