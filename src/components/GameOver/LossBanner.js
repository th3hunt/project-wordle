import React from "react";

export default function LossBanner({ answer }) {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
    </div>
  );
}
