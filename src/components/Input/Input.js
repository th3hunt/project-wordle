import React, { useState } from "react";
import { WORD_LENGTH } from "../../constants";

export default function Input({ disabled = false, onSubmit = () => {} }) {
  const [value, setValue] = useState("");

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
        setValue("");
      }}
    >
      <label htmlFor="guess-input">Guess the word:</label>
      <input
        id="guess-input"
        type="text"
        value={value}
        disabled={disabled}
        required={true}
        pattern={`[A-Za-z]{${WORD_LENGTH}}`}
        title={`Enter a ${WORD_LENGTH}-letter word`}
        onChange={(e) => setValue(e.target.value.toUpperCase())}
      />
    </form>
  );
}
