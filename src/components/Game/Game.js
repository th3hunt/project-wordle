import React, { useState } from "react";

import GuessResults from "../GuessResults";
import Input from "../Input";
import Keyboard from "../Keyboard";
import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, WORD_LENGTH } from "../../constants";
import { checkGuess, initialState } from "../../game-helpers";
import { LossBanner, WinBanner } from "../GameOver";

const GAME_IN_PROGRESS = 0;
const GAME_WON = 1;
const GAME_LOST = 2;

function Game() {
  const [answer, setAnswer] = useState(() => {
    const nextAnswer = sample(WORDS);
    console.info("answer: %s", nextAnswer);
    return nextAnswer;
  });
  const [guesses, setGuesses] = useState(initialState);
  const [counter, setCounter] = useState(0);
  const [letterMap, setLetterMap] = useState(new Map());
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

    const nextLetterMap = new Map(letterMap);
    letters.forEach((letter) => {
      nextLetterMap.set(letter.letter, letter.status);
    });
    setLetterMap(nextLetterMap);

    if (word === answer) {
      setGameStatus(GAME_WON);
      return;
    }

    if (nextCounter === NUM_OF_GUESSES_ALLOWED) {
      setGameStatus(GAME_LOST);
      return;
    }
  }

  function restartGame() {
    setGuesses(initialState);
    setCounter(0);
    setGameStatus(GAME_IN_PROGRESS);
    setAnswer(sample(WORDS));
    setLetterMap(new Map());
  }

  return (
    <>
      <GuessResults guesses={guesses} />
      <Input
        onSubmit={onGuessSubmit}
        disabled={gameStatus !== GAME_IN_PROGRESS}
      />
      <Keyboard letterMap={letterMap} />
      {gameStatus === GAME_WON && (
        <WinBanner numOfGuesses={counter} onRestartClick={restartGame} />
      )}
      {gameStatus === GAME_LOST && (
        <LossBanner answer={answer} onRestartClick={restartGame} />
      )}
    </>
  );
}

export default Game;
