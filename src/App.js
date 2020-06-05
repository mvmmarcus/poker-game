import React, { useState, useEffect } from "react";
import "./App.css";
import { echoBestPlayer } from "./game";
import { generateDeck, shuffle } from "./deck";

const App = () => {
  const [playerOneName, setPlayerOneName] = useState("Marcus");
  const [playerTwoName, setPlayerTwoName] = useState("Matheus");
  const [playerOneHand, setPlayerOneHand] = useState([]);
  const [playerTwoHand, setPlayerTwoHand] = useState([]);
  const [bestPlayer, setBestPlayer] = useState({});
  const [showPlayers, setShowPlayers] = useState(false);

  const start = () => {
    setShowPlayers(true);
    const { handName, bestPlayer, player1, player2 } = echoBestPlayer();
    setPlayerOneHand(player1);
    setPlayerTwoHand(player2);
    if (bestPlayer.name === "PlayerOne") {
      setBestPlayer({
        name: playerOneName,
        hand: player1,
        handName: handName,
      });
    } else if (bestPlayer.name === "PlayerTwo") {
      setBestPlayer({
        name: playerTwoName,
        hand: player2,
        handName: handName,
      });
    }
  };

  useEffect(() => {
    generateDeck();
    shuffle();
  }, [bestPlayer, playerOneHand, playerTwoHand]);

  return (
    <div className="App">
      <h1>Poker Game</h1>
      <section className="form">
        <label>Player 1</label>
        <input
          type="text"
          value={playerOneName}
          onChange={(e) => setPlayerOneName(e.target.value)}
        />
        <label htmlFor="">Player 2</label>
        <input
          type="text"
          value={playerTwoName}
          onChange={(e) => setPlayerTwoName(e.target.value)}
        />
      </section>
      {showPlayers && (
        <>
          <section className="players">
            {playerOneHand.length > 0 && (
              <>
                <div className="players__one">
                  <span className="players__name">{playerOneName}</span>
                  <ul className="hand">
                    <span className="hand__handle">Mão:</span>
                    <li className="hand__item">
                      {playerOneHand.map((item, idx) => (
                        <span key={idx} className="hand__item__name">
                          {item.name}
                        </span>
                      ))}
                    </li>
                  </ul>
                </div>
              </>
            )}

            {playerOneHand.length > 0 && (
              <>
                <div className="players__two">
                  <span className="players__name">{playerTwoName}</span>
                  <ul className="hand">
                    <span className="hand__handle">Mão:</span>
                    <li className="hand__item">
                      {playerTwoHand.map((item, idx) => (
                        <span key={idx} className="hand__item__name">
                          {item.name}
                        </span>
                      ))}
                    </li>
                  </ul>
                </div>
              </>
            )}
          </section>

          <section className="result">
            <span className="result__winner">
              O vencedor é: <b>{bestPlayer.name}</b>
            </span>
            <span className="resul__hand-winner">
              Com a mão: <b>{bestPlayer.handName}</b>
            </span>
          </section>
        </>
      )}
      <button onClick={() => start()}>Jogar</button>
    </div>
  );
};

export default App;
