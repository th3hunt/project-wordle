import React from "react";
import RestartButton from "./RestartButton";

export default function WinBanner({ numOfGuesses, onRestartClick }) {
  return (
    <div className="happy banner">
      <p>
        <strong>Congratulations!</strong> Got it in{" "}
        <strong>{numOfGuesses} guesses</strong>.
      </p>
      <RestartButton onClick={onRestartClick} />
    </div>
  );
}
