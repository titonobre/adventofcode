// prepare

function parseInput(input) {
  const grid = input
    .trim()
    .split("\n")
    .map(line => line.split(""));

  const initialPosition = findInitialPosition(grid);

  const initialDirection = { x: 0, y: -1 };

  return { grid, initialPosition, initialDirection };
}

// utils

function findInitialPosition(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "^") {
        return { x, y };
      }
    }
  }
}

function stepKey(position, direction) {
  return `${position.x},${position.y}:${direction.x},${direction.y}`;
}

function positionKey(position) {
  return `${position.x},${position.y}`;
}

function countDistinctPositions(path) {
  return new Set(path.map((position) => positionKey(position))).size;
}

function getDistinctPositions(path) {
  return [...new Map(path.map((position) => [positionKey(position), position])).values()];
}

function turnRight(direction) {
  return {
    x: -direction.y,
    y: direction.x
  };
}

function walkOff(grid, position, direction) {
  let currentPosition = position;
  let currentDirection = direction;

  const path = [currentPosition];

  while (true) {
    const nextPosition = {
      x: currentPosition.x + currentDirection.x,
      y: currentPosition.y + currentDirection.y
    };

    // out of grid
    if (nextPosition.x < 0 || nextPosition.x >= grid[0].length || nextPosition.y < 0 || nextPosition.y >= grid.length) {
      break;
    }

    // obstacle
    if (grid[nextPosition.y][nextPosition.x] === "#") {
      currentDirection = turnRight(currentDirection);
      continue;
    }

    currentPosition = nextPosition;

    path.push(currentPosition);
  }

  return path;
}

function hasLoop(grid, position, direction) {
  let currentPosition = position;
  let currentDirection = direction;

  const steps = new Set();

  steps.add(stepKey(currentPosition, currentDirection));

  while (true) {
    const nextPosition = {
      x: currentPosition.x + currentDirection.x,
      y: currentPosition.y + currentDirection.y
    };

    // out of grid
    if (nextPosition.x < 0 || nextPosition.x >= grid[0].length || nextPosition.y < 0 || nextPosition.y >= grid.length) {
      break;
    }

    // obstacle
    if (grid[nextPosition.y][nextPosition.x] === "#") {
      currentDirection = turnRight(currentDirection);
      continue;
    }

    const nextStep = stepKey(nextPosition, currentDirection);

    if (steps.has(nextStep)) {
      return true;
    }

    steps.add(nextStep);
    currentPosition = nextPosition;
  }

  return false;
}

function placeObstacle(grid, position) {
  return grid.map((row, y) => row.map((cell, x) => x === position.x && y === position.y ? "#" : cell));
}

function findLoopsWithObstaclesAlongPath(grid, path, initialPosition, initialDirection) {
  const distinctPositions = getDistinctPositions(path);

  const newObstaclePositions = [];

  for (const position of distinctPositions) {
    const newGrid = placeObstacle(grid, position);

    if (hasLoop(newGrid, initialPosition, initialDirection)) {
      newObstaclePositions.push(position);
    }
  }

  return newObstaclePositions;
}

// part1

export function solvePart1(input) {
  const { grid, initialPosition, initialDirection } = parseInput(input);

  const path = walkOff(grid, initialPosition, initialDirection);

  return countDistinctPositions(path);
}

// part 2

export function solvePart2(input) {
  const { grid, initialPosition, initialDirection } = parseInput(input);

  const path = walkOff(grid, initialPosition, initialDirection);

  const pathWithoutInitialPosition = path.slice(1);

  const newObstaclePositions = findLoopsWithObstaclesAlongPath(grid, pathWithoutInitialPosition, initialPosition, initialDirection);

  return newObstaclePositions.length;
}
