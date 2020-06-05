import { deck, dealCards } from "./deck";
import { getBestHand, getName } from "./hands";

let bestPlayer = null;
let bestHand = null;

const players = [{ name: "PlayerOne" }, { name: "PlayerTwo" }];

const gameDeck = deck;

const getPlayerWithBestHand = () => {
  bestPlayer = null;
  bestHand = null;
  let player1 = [];
  let player2 = [];

  for (let i = 0; i < players.length; i++) {
    let playerCards = dealCards(5);

    if (i === 0) {
      player1 = playerCards;
    } else if (i === 1) {
      player2 = playerCards;
    }

    const hand = getBestHand(playerCards);

    if (!bestPlayer || !bestHand) {
      bestPlayer = players[i];
      bestHand = hand;
    }

    if (hand.value > bestHand.value) {
      bestPlayer = players[i];
      bestHand = hand;
    }
  }

  return { bestPlayer, player1, player2 };
};

const echoBestPlayer = () => {
  const { bestPlayer, player1, player2 } = getPlayerWithBestHand();
  
  const handName = getName(bestHand.value);
  return { handName, bestPlayer, player1, player2 };
};

for (let i = 0; i < players.length; i++) {
  players[i].pocketCards = gameDeck.splice(0, 2);
}

export { echoBestPlayer, getPlayerWithBestHand };
