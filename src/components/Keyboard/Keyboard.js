import React from "react";
import { keyboardLayout } from "../../data";

function keyClass(letterMap, key) {
  const status = letterMap.get(key);
  const statusClass = status || "";
  return `keyboard-key ${statusClass}`.trim();
}

export default function Keyboard({ letterMap = new Map() }) {
  return (
    <div className="keyboard">
      {keyboardLayout.map((row, index) => (
        <div className="keyboard-row" key={index}>
          {row.map((key) => (
            <button key={key} className={keyClass(letterMap, key)}>
              {key}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
