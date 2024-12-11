// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map(line => line.split(""));
}

// utils

function findWord(grid, word, x, y, dx, dy) {
  if (word.length === 0) {
    return true;
  }

  if (grid[y]?.[x] !== word[0]) {
    return false;
  }

  return findWord(grid, word.slice(1), x + dx, y + dy, dx, dy);
}

function findWords(grid, words, xDirections = [-1, 0, 1], yDirections = [-1, 0, 1]) {
  const found = [];

  for (const word of words) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        for (const dx of xDirections) {
          for (const dy of yDirections) {
            if (dx === 0 && dy === 0) {
              continue;
            }

            if (findWord(grid, word, x, y, dx, dy)) {
              found.push({ word, x, y, dx, dy });
            }
          }
        }
      }
    }
  }

  return found;
}

function crop(grid, x, y, w, h) {
  return grid.slice(y, y + h).map(row => row.slice(x, x + w));
}

function findWordsInSections(grid, words, xDirections = [-1, 0, 1], yDirections = [-1, 0, 1]) {
  const findings = [];

  for (const word of words) {
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        const section = crop(grid, x, y, word.length, word.length);

        if (section.length !== word.length || section[0].length !== word.length) {
          continue;
        }

        const sectionFindings = findWords(section, [word], xDirections, yDirections);

        findings.push({ word, section, findings: sectionFindings });
      }
    }
  }
  return findings;
}

// part1

export function solvePart1(input) {
  const grid = parseInput(input);

  const word = "XMAS";

  const findings = findWords(grid, [word]);

  return findings.length;
}

// part 2

export function solvePart2(input) {
  const grid = parseInput(input);
  const words = ["MAS"];

  const findings = findWordsInSections(grid, words, [-1, 1], [-1, 1]);

  const findings2 = findings.filter(f => f.findings.length === 2);

  return findings2.length;
}
