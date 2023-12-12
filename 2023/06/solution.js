// prepare

function parseInput(input) {
  return input.trim().split("\n");
}

// utils

function calculateWaysToWin(time, record) {
  // https://www.wolframalpha.com/input?i=solve+d+%3C+%28x+-+t%29+*+t+for+t
  // solve d < (x - t) * t for t

  // to avoid whole numbers
  const error = 0.000001;

  const min = Math.ceil((1 / 2) * (time - Math.sqrt(Math.pow(time, 2) - 4 * record)) + error);
  const max = Math.floor((1 / 2) * (time + Math.sqrt(Math.pow(time, 2) - 4 * record)) - error);

  const waysToWin = max - min + 1;

  return waysToWin;
}

function calculateWaysToWinBruteForce(time, record) {
  let waysToWin = 0;

  for (let tPress = 1; tPress <= time; tPress++) {
    const tTravel = time - tPress;
    const speed = tPress;

    const distance = tTravel * speed;
    const beatsRecord = distance > record;

    if (beatsRecord) {
      waysToWin++;
    }
  }

  return waysToWin;
}

// part1

function getPart1Races(input) {
  const lines = parseInput(input);

  return lines
    .map((line) =>
      line
        .split(":")
        .at(1)
        .trim()
        .split(/\s+/)
        .map((value) => Number(value)),
    )
    .reduce((acc, entry) => {
      // zip values
      if (!acc.length) {
        acc.push(...entry.map((value) => [value]));
      } else {
        entry.forEach((value, i) => acc[i].push(value));
      }
      return acc;
    }, []);
}

export function solvePart1(input) {
  const races = getPart1Races(input);

  const waysToWinPerRace = races.map(([time, record], r) => calculateWaysToWin(time, record));

  const waysToWinAllRaces = waysToWinPerRace.reduce((acc, value) => acc * value, 1);
  return waysToWinAllRaces;
}

// part 2

export function solvePart2(input) {
  const lines = parseInput(input);

  const bigRace = lines.map((line) => Number(line.split(":").at(1).replaceAll(/\s/g, "")));

  const waysToWinBigRace = calculateWaysToWin(...bigRace);

  return waysToWinBigRace;
}
