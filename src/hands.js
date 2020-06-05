import { getValue } from "./deck";

const HIGH_CARD = 0;
const PAIR = 1;
const TWO_PAIR = 2;
const THREE_OF_A_KIND = 3;
const STRAIGHT = 4;
const FLUSH = 5;
const FULL_HOUSE = 6;
const FOUR_OF_A_KIND = 7;
const STRAIGHT_FLUSH = 8;
const ROYAL_FLUSH = 9;

const HANDS = [
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  STRAIGHT_FLUSH,
  ROYAL_FLUSH,
];

const getName = (val) => {
  switch (val) {
    case 0:
      return "High Card";
    case 1:
      return "Pair";
    case 2:
      return "Two Pair";
    case 3:
      return "Three Of A Kind";
    case 4:
      return "Straight";
    case 5:
      return "Flush";
    case 6:
      return "Full House";
    case 7:
      return "Four Of A Kind";
    case 8:
      return "Straight Flush";
    case 9:
      return "royal flush";
    default:
      break;
  }
};

const getBestHand = (cards) => {
  let hand = getRoyalFlush(cards);

  if (!hand) {
    hand = getStraightFlush(cards);
  }

  if (!hand) {
    hand = getFourOfAKind(cards);
  }

  if (!hand) {
    hand = getFullHouse(cards);
  }

  if (!hand) {
    hand = getFlush(cards);
  }

  if (!hand) {
    hand = getStraight(cards);
  }

  if (!hand) {
    hand = getThreeOfAKind(cards);
  }

  if (!hand) {
    hand = getTwoPair(cards);
  }

  if (!hand) {
    hand = getPair(cards);
  }

  if (!hand) {
    hand = getHighCard(cards);
  }

  return hand;
};

const getRoyalFlush = (cards) => {
  const straightFlush = getStraightFlush(cards);
  if (!straightFlush) {
    return null;
  }

  if (
    straightFlush.cards[0].value === getValue("10") &&
    straightFlush.cards[4].value === getValue("1")
  ) {
    return { value: ROYAL_FLUSH, cards: straightFlush.cards };
  }

  return null;
};

const getStraightFlush = (cards) => {
  let flush = getFlush(cards);
  let straight = getStraight(cards);

  if (!flush || !straight) {
    return null;
  }

  flush = flush.cards;
  straight = straight.cards;

  flush = sort(flush);
  for (let i = 0; i < straight.length; i++) {
    if (
      flush[i].value === straight[i].value &&
      flush[i].suit === straight[i].suit
    ) {
      continue;
    }
    return null;
  }

  return { value: STRAIGHT_FLUSH, cards: straight };
};

const getFullHouse = (cards) => {
  let matches = {};

  cards.forEach((card) => {
    if (!matches[card.value]) {
      matches[card.value] = [];
    }

    matches[card.value].push(card);
  });

  let threeOfAKind = null;
  let twoOfAKind = null;

  Object.keys(matches).forEach((val) => {
    if (matches[val].length === 2) {
      twoOfAKind = matches[val];
      return;
    }

    if (matches[val].length === 3) {
      threeOfAKind = matches[val];
      return;
    }
  });

  if (threeOfAKind && twoOfAKind) {
    let winningCards = threeOfAKind.slice(0);
    winningCards.push.apply(winningCards, twoOfAKind);

    return { value: FULL_HOUSE, cards: winningCards };
  }

  return null;
};

const getFlush = (cards) => {
  let suits = {};
  cards.forEach((card) => {
    if (!suits[card.suit]) {
      suits[card.suit] = [];
    }

    suits[card.suit].push(card);
  });

  let flush = null;
  Object.keys(suits).forEach((suit) => {
    let cards = suits[suit];

    if (cards.length < 5) {
      return;
    }

    if (cards.length > 5) {
      cards = cards.slice(cards.length - 5);
    }

    flush = { value: FLUSH, cards: cards };
  });

  return flush;
};

const sort = (cards) => {
  let sorted = cards.sort((obj1, obj2) => {
    if (obj1.value < obj2.value) {
      return -1;
    } else if (obj1.value > obj2.value) {
      return 1;
    }
    return 0;
  });

  return sorted;
};

const getStraight = (cards) => {
  let sorted = sort(cards);
  let consecutive = [];

  for (let i = 0; i < sorted.length; i++) {
    if (consecutive.length === 0) {
      consecutive.push(sorted[i]);
      continue;
    }

    let card = sorted[i];
    let lastCard = consecutive[consecutive.length - 1];

    if (card.value - 1 === lastCard.value) {
      consecutive.push(card);
    } else if (consecutive.length < 5) {
      consecutive = [];
      consecutive.push(card);
    }
  }

  if (consecutive.length > 5) {
    consecutive = consecutive.slice(consecutive.length - 5);
  }

  if (consecutive.length === 5) {
    return { value: STRAIGHT, cards: consecutive };
  }

  return null;
};

const getFourOfAKind = (cards) => {
  let matches = {};

  for (let i = 0; i < cards.length; i++) {
    if (!matches[cards[i].value]) {
      matches[cards[i].value] = [];
    }
    matches[cards[i].value].push(cards[i]);
  }

  let pair = null;

  Object.keys(matches).forEach((val, idx) => {
    let cards = matches[val];
    if (cards.length === 4) {
      pair = cards;
      return;
    }
  });

  if (pair && pair.length === 3) {
    return { value: FOUR_OF_A_KIND, cards: pair };
  }

  return null;
};

const getThreeOfAKind = (cards) => {
  let matches = {};

  for (let i = 0; i < cards.length; i++) {
    if (!matches[cards[i].value]) {
      matches[cards[i].value] = [];
    }
    matches[cards[i].value].push(cards[i]);
  }

  let pair = null;

  Object.keys(matches).forEach((val, idx) => {
    let cards = matches[val];
    if (cards.length === 3) {
      pair = cards;
      return;
    }
  });

  if (pair && pair.length === 3) {
    return { value: THREE_OF_A_KIND, cards: pair };
  }

  return null;
};

const getTwoPair = (cards) => {
  let matches = {};

  for (let i = 0; i < cards.length; i++) {
    if (!matches[cards[i].value]) {
      matches[cards[i].value] = [];
    }
    matches[cards[i].value].push(cards[i]);
  }

  let pairs = [];

  Object.keys(matches).forEach((val, idx) => {
    let cards = matches[val];
    if (cards.length === 2) {
      pairs.push(cards[0]);
      pairs.push(cards[1]);
      return;
    }
  });

  if (pairs && pairs.length === 4) {
    return { value: TWO_PAIR, cards: pairs };
  }

  return null;
};

const getPair = (cards) => {
  let matches = {};

  for (let i = 0; i < cards.length; i++) {
    if (!matches[cards[i].value]) {
      matches[cards[i].value] = [];
    }
    matches[cards[i].value].push(cards[i]);
  }

  let pair = null;

  Object.keys(matches).forEach((val, idx) => {
    let cards = matches[val];
    if (cards.length === 2) {
      pair = cards;
      return;
    }
  });

  if (pair && pair.length === 2) {
    return { value: PAIR, cards: pair };
  }

  return null;
};

const getHighCard = (cards) => {
  let idx = -1;
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].value > idx) {
      idx = i;
    }
  }

  return { value: HIGH_CARD, cards: [cards[idx]] };
};

export {
  HANDS,
  HIGH_CARD,
  PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  STRAIGHT_FLUSH,
  ROYAL_FLUSH,
  getBestHand,
  getName,
};
