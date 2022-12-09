// prepare

function parseInput(input) {
  const stepPattern = /(?<direction>U|D|L|R) (?<steps>\d+)/;

  return input
    .trim()
    .split("\n")
    .filter((line) => line.length > 0)
    .reduce((acc, line) => {
      const match = stepPattern.exec(line);

      const { direction, steps } = match.groups;

      return [
        ...acc,
        {
          direction,
          steps: parseInt(steps),
        },
      ];
    }, []);
}

// utils


const directions = [
  [0, 1], // top
  [1, 1], // top right
  [1, 0], // right
  [1, -1], // bottom right
  [0, -1], // bottom
  [-1, -1], // bottom left
  [-1, 0], // left
  [-1, 1], // top left
];

function moveHead(head, direction) {
  const { x, y } = head;

  switch (direction) {
    case "U":
      return { x, y: y - 1 };
    case "D":
      return { x, y: y + 1 };
    case "L":
      return { x: x - 1, y };
    case "R":
      return { x: x + 1, y };
  }
}

function getDistance(head, tail) {
  return Math.sqrt(Math.pow(head.x - tail.x, 2) + Math.pow(head.y - tail.y, 2));
}

function updateTailSegment(tailSegment, previousSegment) {
  const distance = getDistance(previousSegment, tailSegment);

  if (distance > 1.5) {
    // find which tail neighbor is closest to the previous segment
    const neighbors = directions
      .map((direction) => {
        const position = {
          x: tailSegment.x + direction[0],
          y: tailSegment.y + direction[1],
        };

        return {
          direction,
          position,
          distance: getDistance(previousSegment, position),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    return neighbors[0].position; // closest neighbor
  }

  return tailSegment;
}

function updateTail(tail, head) {
  const elements = [head, ...tail];

  for (let i = 1; i < elements.length; i++) {
    elements[i] = updateTailSegment(elements[i], elements[i - 1]);
  }

  return elements.slice(1);
}

function updatePlane(plane, head) {
  return {
    x: {
      min: Math.min(plane.x.min, head.x),
      max: Math.max(plane.x.max, head.x),
    },
    y: {
      min: Math.min(plane.y.min, head.y),
      max: Math.max(plane.y.max, head.y),
    },
  };
}

function updateTailTrail(tailTrail, tail) {
  return [...tailTrail, tail.at(-1)];
}

function applyMove(state, direction, steps) {
  return [...Array(steps)].reduce((acc) => {
    const head = moveHead(acc.head, direction);
    const plane = updatePlane(acc.plane, head);
    const tail = updateTail(acc.tail, head);
    const tailTrail = updateTailTrail(acc.tailTrail, tail);

    const newState = {
      ...acc,
      head,
      tail,
      tailTrail,
      plane,
    };

    return newState;
  }, state);
}

function applyMoves(state, moves) {
  return moves.reduce((acc, move) => {
    const { direction, steps } = move;

    return applyMove(acc, direction, steps);
  }, state);
}

// debugging and logging functions

function getGridSize(plane) {
  return {
    width: Math.abs(plane.x.min) + plane.x.max + 1,
    height: Math.abs(plane.y.min) + plane.y.max + 1,
  };
}

function getTailTrailSet(state) {
  return new Set([...state.tailTrail.map(({ x, y }) => `${x},${y}`)]);
}

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function generateBaseGrid(width, height) {
  return `${".".repeat(width)}\n`.repeat(height);
}

function printGrid(state) {
  const { head, tail, tailTrail, plane } = state;
  const { width, height } = getGridSize(plane);

  const offsetX = Math.abs(plane.x.min);
  const offsetY = Math.abs(plane.y.min);

  const gridLineWidth = width + 1; // new line

  let grid = generateBaseGrid(width, height);

  const setGridValue = (x, y, value) => {
    const tX = x + offsetX;
    const tY = y + offsetY;

    const index = gridLineWidth * tY + tX;

    grid = setCharAt(grid, index, value);
  };

  setGridValue(0, 0, "+");

  tailTrail.forEach((t, i) => {
    setGridValue(t.x, t.y, "#");
  });

  tail.forEach((t, i) => {
    setGridValue(t.x, t.y, i + 1);
  });

  setGridValue(head.x, head.y, "H");

  console.log(grid);
}

// part1

export function solvePart1(input) {
  const moves = parseInput(input);

  const initialStatePart1 = {
    head: {
      x: 0,
      y: 0,
    },
    tail: [{ x: 0, y: 0 }],
    tailTrail: [],
    plane: {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 },
    },
  };

  const finalStatePart1 = applyMoves(initialStatePart1, moves);

  return getTailTrailSet(finalStatePart1).size;
}

// part 2

export function solvePart2(input) {
  const moves = parseInput(input);

  const initialStatePart2 = {
    head: {
      x: 0,
      y: 0,
    },
    tail: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    tailTrail: [],
    plane: {
      x: { min: 0, max: 0 },
      y: { min: 0, max: 0 },
    },
  };

  const finalStatePart2 = applyMoves(initialStatePart2, moves);

  return getTailTrailSet(finalStatePart2).size;
}
