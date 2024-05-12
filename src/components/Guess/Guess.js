import React from "react";

function cellClass(status) {
  const statusClass = status === "empty" ? "" : status;
  return `cell ${statusClass}`.trim();
}

export default function Guess({ guess: { letters } }) {
  return (
    <p className="guess">
      {letters.map(({ letter, status }, index) => (
        <span className={cellClass(status)} key={index}>
          {letter}
        </span>
      ))}
    </p>
  );
}
