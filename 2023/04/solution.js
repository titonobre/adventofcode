// prepare

const separators = /\:|\|/g;
const numbersSeparator = /\s+/;

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [card, winningNumbersRaw, myNumbersRaw] = line.split(separators);

      const winningNumbers = winningNumbersRaw
        .trim()
        .split(numbersSeparator)
        .map((value) => Number(value));
      const myNumbers = myNumbersRaw
        .trim()
        .split(numbersSeparator)
        .map((value) => Number(value));

      const myNumbersSet = new Set(myNumbers);
      const winningNumbersSet = new Set(winningNumbers);

      const matchingNumbers = new Set([...myNumbersSet].filter((i) => winningNumbersSet.has(i)));

      const matches = matchingNumbers.size;

      return {
        card,
        matches,
      };
    });
}

// part 1

export function solvePart1(input) {
  const cards = parseInput(input);

  return cards.reduce((acc, card) => {
    return acc + (card.matches > 0 ? Math.pow(2, card.matches) / 2 : 0);
  }, 0);
}

// part 2

export function solvePart2(input) {
  const cards = parseInput(input);

  const cardsCounts = cards.map((card) => ({ ...card, count: 1 }));

  for (let i = 0; i < cardsCounts.length; i++) {
    const card = cardsCounts[i];

    for (let j = 0; j < card.matches; j++) {
      const otherCard = cardsCounts[i + j + 1];

      if (otherCard) {
        otherCard.count += card.count;
      }
    }
  }

  return cardsCounts.reduce((acc, card) => acc + card.count, 0);
}
