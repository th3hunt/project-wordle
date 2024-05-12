import React from "react";

export default function RestartButton({ onClick }) {
  return (
    <button className="restart-button" onClick={onClick}>
      <strong>Restart Game</strong>
    </button>
  );
}
