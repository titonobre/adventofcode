// prepare

const seedsListPattern = /seeds\: (.+)/;
const mapHeaderPattern = /(\w+-to-\w+) map:/;
const mapEntryPattern = /(\d+)\s(\d+)\s(\d+)/;

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .reduce(
      (acc, line) => {
        let match;

        if ((match = seedsListPattern.exec(line))) {
          acc.seeds = match[1].split(" ").map((value) => Number(value));
        } else if ((match = mapHeaderPattern.exec(line))) {
          acc.currentMap = match[1];
          acc.maps[acc.currentMap] = [];
          acc.mapsOrder.push(acc.currentMap);
        } else if ((match = mapEntryPattern.exec(line))) {
          acc.maps[acc.currentMap].push({
            destination: Number(match[1]),
            source: Number(match[2]),
            length: Number(match[3]),
          });
        }

        return acc;
      },
      {
        seeds: [],
        currentMap: undefined,
        mapsOrder: [],
        maps: {},
      },
    );
}

// utils

function findRangeBySource(map, source) {
  return map.find((entry) => {
    const start = entry.source;
    const end = entry.source + entry.length;

    return start <= source && source <= end;
  });
}

function findRangeByDestination(map, destination) {
  return map.find((entry) => {
    const start = entry.destination;
    const end = entry.destination + entry.length;

    return start <= destination && destination <= end;
  });
}

function findDestination(map, source) {
  const range = findRangeBySource(map, source);

  if (range) {
    const offset = source - range.source;

    return range.destination + offset;
  }

  return source;
}

function findSource(map, destination) {
  const range = findRangeByDestination(map, destination);

  if (range) {
    const offset = destination - range.destination;

    return range.source + offset;
  }

  return destination;
}

function findSeedLocation(almanac, seed) {
  return almanac.mapsOrder.reduce((acc, map) => {
    return findDestination(almanac.maps[map], acc);
  }, seed);
}

function findSeedForLocation(almanac, location) {
  return almanac.mapsOrder.toReversed().reduce((acc, map) => {
    return findSource(almanac.maps[map], acc);
  }, location);
}

// part 1

export function solvePart1(input) {
  const almanac = parseInput(input);

  const locations = almanac.seeds.map((seed) => {
    return findSeedLocation(almanac, seed);
  });

  return Math.min(...locations);
}

// part 2

export function solvePart2(input) {
  const almanac = parseInput(input);

  const seedRanges = [];

  for (let i = 0; i < almanac.seeds.length; i += 2) {
    seedRanges.push({
      start: almanac.seeds[i],
      end: almanac.seeds[i] + almanac.seeds[i + 1],
    });
  }

  let minLocation;

  for (let location = 0; location < Number.POSITIVE_INFINITY; location++) {
    const seed = findSeedForLocation(almanac, location);

    const match = seedRanges.some(({ start, end }) => start <= seed && seed <= end);

    if (match) {
      minLocation = location;
      break;
    }
  }
  return minLocation;
}
