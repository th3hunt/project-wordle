import React, { useState } from "react";

import Input from "../Input";
import GuessResults from "../GuessResults";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";
import { checkGuess, initialState } from "../../game-helpers";
import { LossBanner, WinBanner } from "../GameOver";

// Pick a random word on every pageload.
const answer = sample(WORDS);

// To make debugging easier, we'll log the solution in the console.
console.info("answer: %s", answer);

const GAME_IN_PROGRESS = 0;
const GAME_WON = 1;
const GAME_LOST = 2;

function Game() {
  const [guesses, setGuesses] = useState(initialState);
  const [counter, setCounter] = useState(0);
  const [gameStatus, setGameStatus] = useState(GAME_IN_PROGRESS);

  function onGuessSubmit(word) {
    if (counter >= NUM_OF_GUESSES_ALLOWED) {
      console.warn("No more guesses allowed.");
      return;
    }

    if (word.length !== WORD_LENGTH) {
      console.warn(
        'Invalid guess length. "%s" has %d letters',
        word,
        word.length
      );
      return;
    }

    console.info("Submitted guess: %s", word);

    const letters = checkGuess(word, answer);
    const nextGuesses = [...guesses];
    nextGuesses[counter] = { id: Math.random(), word, letters };
    setGuesses(nextGuesses);

    const nextCounter = counter + 1;
    setCounter(nextCounter);

    if (word === answer) {
      setGameStatus(GAME_WON);
      return;
    }

    if (nextCounter === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus(GAME_LOST);
      return;
    }
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      <Input
        onSubmit={onGuessSubmit}
        disabled={gameStatus !== GAME_IN_PROGRESS}
      />
      {gameStatus === GAME_WON && <WinBanner numOfGuesses={counter} />}
      {gameStatus === GAME_LOST && <LossBanner answer={answer} />}
    </>
  );
}

export default Game;
