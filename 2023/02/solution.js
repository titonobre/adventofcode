// prepare input

function parseInput(input) {
  return input.split("\n").map((line) => {
    const [game, ...sets] = line.split(/:|;|,/);

    return {
      game: Number(game.slice(5)),
      sets: sets.map((set) => {
        const [count, color] = set.trim().split(" ");
        return {
          count: Number(count),
          color,
        };
      }),
    };
  });
}

// part 1

const availableCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

export function solvePart1(input) {
  return parseInput(input)
    .filter((game) => {
      return game.sets.every(({ color, count }) => count <= availableCubes[color]);
    })
    .reduce((acc, { game }) => acc + game, 0);
}

// part 2

export function solvePart2(input) {
  return parseInput(input)
    .map(({ game, sets }) => {
      const minimums = sets.reduce(
        (acc, { color, count }) => {
          return {
            ...acc,
            [color]: Math.max(acc[color], count),
          };
        },
        { red: 0, green: 0, blue: 0 },
      );

      return {
        game,
        minimums,
      };
    })
    .reduce((acc, { minimums }) => acc + minimums.red * minimums.green * minimums.blue, 0);
}
