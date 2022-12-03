import { readFile } from "fs/promises";

const input = await readFile(new URL("./input.txt", import.meta.url), "utf8");

const lowerCaseInitialCode = "a".charCodeAt(0);
const upperCaseInitialCode = "A".charCodeAt(0);

function getItemPriority(item) {
  const repeatedItemCode = item?.charCodeAt(0);

  const sequenceInitialCode =
    repeatedItemCode > lowerCaseInitialCode
      ? lowerCaseInitialCode
      : upperCaseInitialCode;

  const priorityBaseCode = repeatedItemCode > lowerCaseInitialCode ? 1 : 27;

  return repeatedItemCode - sequenceInitialCode + priorityBaseCode;
}

const rucksacks = input.split("\n").filter((line) => line.length > 0);

// part 1

const sumPriorities = rucksacks.reduce((acc, rucksack) => {
  const half = Math.ceil(rucksack.length / 2);

  const compartment1 = rucksack.slice(0, half);
  const comportment2 = rucksack.slice(half);

  const repeatedItem = [...compartment1].find((item) =>
    comportment2.includes(item)
  );

  const priority = getItemPriority(repeatedItem);

  return acc + priority;
}, 0);

console.log(sumPriorities);

// part 2

let sumPrioritiesGroups = 0;

for (let i = 0; i < rucksacks.length; i += 3) {
  const group = rucksacks.slice(i, i + 3);

  const repeatedItem = [...group[0]].find(
    (item) => group[1].includes(item) && group[2].includes(item)
  );

  const priority = getItemPriority(repeatedItem);

  sumPrioritiesGroups += priority;
}

console.log(sumPrioritiesGroups);
