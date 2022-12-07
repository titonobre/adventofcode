// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .filter((line) => line.length > 0)
    .reduce((acc, line) => {
      const match = line.match(/\$ (ls|cd)(?: (.*))?/);

      if (match) {
        switch (match[1]) {
          case "cd":
            return [...acc, { command: "cd", arg: match[2] }];

          case "ls":
            return [...acc, { command: "ls", list: [] }];
        }
      } else {
        const lastCommand = acc.at(-1);

        if (lastCommand.command === "ls") {
          const lsMatch = line.match(/(?:(dir) (.*)?)|(?:(\d+) (.+))/);

          if (lsMatch[1] === "dir") {
            lastCommand.list.push({ type: "dir", name: lsMatch[2] });
          } else {
            lastCommand.list.push({
              type: "file",
              name: lsMatch[4],
              size: parseInt(lsMatch[3]),
            });
          }
        }

        return acc;
      }
    }, []);
}

// utils

function getDir(fs, path) {
  return path.reduce((acc, name) => {
    return acc.contents[name];
  }, fs);
}

function updateDirSize(dir) {
  const contents = Object.values(dir.contents).reduce((acc, item) => {
    if (item.type === "dir") {
      return {
        ...acc,
        [item.name]: updateDirSize(item),
      };
    }

    return { ...acc, [item.name]: item };
  }, {});

  const size = Object.values(contents).reduce((acc, item) => {
    return acc + item.size;
  }, 0);

  return { ...dir, size, contents };
}

function getAllDirs(dir) {
  const dirs = Object.values(dir.contents)
    .filter((item) => item.type === "dir")
    .reduce((acc, item) => {
      return [...acc, ...getAllDirs(item)];
    }, []);

  return [dir, ...dirs];
}

function buildStateFromCommands(commands) {
  const initialState = {
    cd: [],
    fs: {
      contents: {
        "/": {
          type: "dir",
          name: "/",
          contents: {},
        },
      },
    },
    pointers: {},
  };

  const state = commands.reduce((acc, command) => {
    switch (command.command) {
      case "cd":
        switch (command.arg) {
          case "/":
            acc.cd = ["/"];
            break;
          case "..":
            acc.cd.pop();
            break;
          default:
            acc.cd.push(command.arg);
        }
        break;

      case "ls":
        const dir = getDir(acc.fs, acc.cd);
        command.list.forEach((item) => {
          switch (item.type) {
            case "dir":
              dir.contents[item.name] = { ...item, contents: {} };
              break;
            case "file":
              dir.contents[item.name] = item;
              break;
          }
        });
      default:
        break;
    }
    return acc;
  }, initialState);

  // calculate the size of all the dirs

  state.fs = updateDirSize(state.fs);

  return state;
}


// part1

export function solvePart1(input) {
  const commands = parseInput(input);
  const state = buildStateFromCommands(commands);
  const allDirs = getAllDirs(state.fs);

  const totalSizeOfDirsUnder100K = allDirs.filter((dir) => dir.size <= 100000).reduce((acc, dir) => acc + dir.size, 0);

  return totalSizeOfDirsUnder100K;
}

// part 2

export function solvePart2(input) {
  const commands = parseInput(input);
  const state = buildStateFromCommands(commands);
  const allDirs = getAllDirs(state.fs);

  const totalSize = 70000000;
  const requiredFreeSize = 30000000;
  const usedSize = state.fs.contents["/"].size;
  const freeSize = totalSize - usedSize;

  const sizeToFree = requiredFreeSize - freeSize;

  const dirToRemove = allDirs.sort((a, b) => a.size - b.size).find((dir) => dir.size >= sizeToFree);

  const sizeOfDirectoryToRemove = dirToRemove.size;

  return sizeOfDirectoryToRemove;
}
