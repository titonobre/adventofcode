// prepare

function parseInput(input) {
  return input
    .trim()
    .split("\n")
    .map((line) => {
      const [hand, bid] = line.split(" ");
      return { hand, bid };
    });
}

// utils

function getCardsStrengthMap() {
  const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];
  return new Map(cards.map((card, i) => [card, i + 1]));
}

function getCardsStrengthMapWithJoker() {
  const cards = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
  return new Map(cards.map((card, i) => [card, i + 1]));
}

function getHandCardsStrength(hand, cardsStrengthMap) {
  return [...hand].map((card) => cardsStrengthMap.get(card));
}

const handStrength = {
  FIVE_OF_A_KIND: 7,
  FOUR_OF_A_KIND: 6,
  FULL_HOUSE: 5,
  THREE_OF_A_KIND: 4,
  TWO_PAIR: 3,
  ONE_PAIR: 2,
  HIGH_CARD: 1,
};

function getHandStrength(hand) {
  const cardCountByType = [...hand].reduce((acc, card) => {
    let count = acc.get(card) ?? 0;
    count++;
    acc.set(card, count);
    return acc;
  }, new Map());

  const counts = [...cardCountByType.values()].toSorted().toReversed();

  switch (counts.length) {
    case 1: // XXXXX
      return handStrength.FIVE_OF_A_KIND;
    case 2: // XXXXY or XXXYY
      return counts[0] === 4 ? handStrength.FOUR_OF_A_KIND : handStrength.FULL_HOUSE;
    case 3: // XXXYZ or XXYYZ
      return counts[0] === 3 ? handStrength.THREE_OF_A_KIND : handStrength.TWO_PAIR;
    case 4: // XXYZW
      return handStrength.ONE_PAIR;
    case 5: // XYZWP
      return handStrength.HIGH_CARD;
  }
}

function calculateHandsStrength(hands, cardsStrengthMap) {
  return hands.map(({ hand, bid }) => {
    const handStrength = getHandStrength(hand);
    const cardsStrength = getHandCardsStrength(hand, cardsStrengthMap);

    return { hand, bid, handStrength, cardsStrength };
  });
}

function sortHandsFirstDifferentCard(handA, handB) {
  for (let i = 0; i < handA.cardsStrength.length; i++) {
    const cardA = handA.cardsStrength[i];
    const cardB = handB.cardsStrength[i];

    const diffCardStrength = cardA - cardB;

    if (diffCardStrength != 0) {
      return diffCardStrength;
    }
  }
}

function sortHands(handA, handB) {
  const diffHandStrength = handA.handStrength - handB.handStrength;

  if (diffHandStrength != 0) {
    return diffHandStrength;
  }

  return sortHandsFirstDifferentCard(handA, handB);
}

function calculateWinnings(hands) {
  return hands.reduce((acc, hand, i) => acc + (i + 1) * hand.bid, 0);
}

function applyJokers(hands) {
  return hands.map((hand) => {
    const cardTypes = new Set([...hand.hand]);

    if (cardTypes.has("J")) {
      cardTypes.delete("J");
      let maxStrength = hand.handStrength;

      for (const card of cardTypes) {
        const newHand = hand.hand.replaceAll("J", card);

        const newStrength = getHandStrength(newHand);

        if (newStrength > maxStrength) {
          maxStrength = newStrength;
        }
      }

      return {
        ...hand,
        handStrength: maxStrength,
      };
    }

    return hand;
  });
}

// part1

export function solvePart1(input) {
  const hands = parseInput(input);

  const cardsStrengthMap = getCardsStrengthMap();

  const handsWithStrengths = calculateHandsStrength(hands, cardsStrengthMap);
  const sortedHands = handsWithStrengths.toSorted(sortHands);

  return calculateWinnings(sortedHands);
}

// part 2

export function solvePart2(input) {
  const hands = parseInput(input);

  const cardsStrengthMap = getCardsStrengthMapWithJoker();

  const handsWithStrengths = calculateHandsStrength(hands, cardsStrengthMap);
  const handsWithJokers = applyJokers(handsWithStrengths);
  const sortedHands = handsWithJokers.toSorted(sortHands);

  return calculateWinnings(sortedHands);
}
