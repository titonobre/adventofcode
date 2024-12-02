// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce((reports, line) => {
      const levels = line.split(" ").map(Number);

      reports.push(levels);

      return reports;
    }, []);
}

// utils

function areLevelsSafe(levels) {
  let initialTrend = 0;

  return levels.every((level, i, arr) => {
    if (i === 0) return true;

    const difference = level - arr[i - 1];
    const trend = difference > 0 ? 1 : difference < 0 ? -1 : 0;

    if (trend === 0) {
      return false;
    }

    if (initialTrend === 0) {
      initialTrend = trend;
    }

    const absDifference = Math.abs(difference);

    return initialTrend === trend && absDifference >= 1 && absDifference <= 3;
  });
}

function areLevelsSafeWithProblemDampener(levels) {
  const areSafe = areLevelsSafe(levels);

  if (areSafe) {
    return true;
  }

  for (let i = 0; i < levels.length; i++) {
    const beforeI = levels.slice(0, i);
    const afterI = levels.slice(i + 1);

    const levelsWithoutI = [...beforeI, ...afterI];

    if (areLevelsSafe(levelsWithoutI)) {
      return true;
    }
  }
}

// part1

export function solvePart1(input) {
  const reports = parseInput(input);

  const safeReports = reports.filter(areLevelsSafe);

  return safeReports.length;
}

// part 2

export function solvePart2(input) {
  const reports = parseInput(input);

  const safeReports = reports.filter(areLevelsSafeWithProblemDampener);

  return safeReports.length;
}
