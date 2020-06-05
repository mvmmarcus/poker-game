let deck = [];
let dealtCards = [];

let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King", "Ace"];
let suits = ["clubs", "diamonds", "spades", "hearts"];

const generateDeck = () => {
  let card = (suit, value) => {
    let name = value + " of " + suit;

    switch (value) {
      case "Jack":
        return { name: name, suit: suit, value: "11" };
      case "Queen":
        return { name: name, suit: suit, value: "12" };
      case "King":
        return { name: name, suit: suit, value: "13" };
      case "Ace":
        return { name: name, suit: suit, value: "1" };
      default:
        break;
    }

    return { name: name, suit: suit, value: value };
  };

  for (let s = 0; s < suits.length; s++) {
    for (let v = 0; v < values.length; v++) {
      deck.push(card(suits[s], values[v]));
    }
  }
};

const shuffle = () => {
  for (let i = deck.length - 1; i >= 0; i--) {
    let tempVal = deck[i];
    let randomIndex = Math.floor(Math.random() * deck.length);

    while (randomIndex === i) {
      randomIndex = Math.floor(Math.random() * deck.length);
    }
    deck[i] = deck[randomIndex];
    deck[randomIndex] = tempVal;
  }
};

const getValue = (valueName) => {
  for (let i = 0; i < values.length; i++) {
    if (values[i] === valueName) {
      return i;
    }
  }

  return -1;
};

const dealCards = (numCards) => {
  let cards = [];

  for (let i = 0; i < numCards; i++) {
    let dealtCard = deck.shift();
    cards.push(dealtCard);
    dealtCards.push(dealtCard);
  }

  return cards;
};

export {
  deck,
  suits,
  values,
  dealCards,
  shuffle,
  getValue,
  generateDeck,
};
