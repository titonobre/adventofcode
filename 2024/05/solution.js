// prepare

function parseInput(input) {
  const [rulesRaw, updatesRaw] = input
    .trim()
    .split("\n\n");

  const rules = rulesRaw.split("\n").map((rule) => rule.split("|").map(Number));
  const updates = updatesRaw.split("\n").map((update) => update.split(",").map(Number));

  return { rules, updates };
}

// utils

function checkUpdate(update, rules) {
  const pages = new Map(update.map((page, i) => [page, i]));

  const allRulesMatch = rules.every(([before, after]) => {
    const beforeIndex = pages.get(before);
    const afterIndex = pages.get(after);

    if (beforeIndex === undefined || afterIndex === undefined) {
      return true;
    }

    return beforeIndex < afterIndex;
  });
  return allRulesMatch;
}

function calculateMiddlePagesSum(updates) {

  return updates
    .map((update) => update[Math.floor(update.length / 2)])
    .reduce((acc, val) => acc + val, 0);
}

function sortUpdate(update, rules) {
  const pages = new Map(update.map((page, i) => [page, i]));

  rules.forEach(([before, after]) => {
    const beforeIndex = pages.get(before);
    const afterIndex = pages.get(after);

    if (beforeIndex === undefined || afterIndex === undefined) {
      return;
    }

    if (beforeIndex >= afterIndex) {
      pages.set(after, beforeIndex);
      pages.set(before, afterIndex);
    }
  });

  const result = Array.from(pages.entries())
    .sort((a, b) => a[1] - b[1])
    .map(([page]) => page);

  if (!checkUpdate(result, rules)) {
    return sortUpdate(result, rules);
  }

  return result;
}

// part1

export function solvePart1(input) {
  const { rules, updates } = parseInput(input);

  const sortedUpdates = updates.filter((update) => checkUpdate(update, rules));

  return calculateMiddlePagesSum(sortedUpdates);
}

// part 2

export function solvePart2(input) {
  const { rules, updates } = parseInput(input);

  const unsortedUpdates = updates.filter((update) => !checkUpdate(update, rules));

  const sortedUpdates = unsortedUpdates.map(update => sortUpdate(update, rules));

  return calculateMiddlePagesSum(sortedUpdates);
}
