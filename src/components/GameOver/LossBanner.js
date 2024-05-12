import React from "react";
import RestartButton from "./RestartButton";

export default function LossBanner({ answer, onRestartClick }) {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
      <RestartButton onClick={onRestartClick} />
    </div>
  );
}
