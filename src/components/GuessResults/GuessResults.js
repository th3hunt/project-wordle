import React from "react";
import Guess from "../Guess/Guess";

export default function GuessResults({ guesses = [] }) {
  return (
    <div className="guess-results">
      {guesses.map((guess) => (
        <Guess guess={guess} key={guess.id} />
      ))}
    </div>
  );
}
