import React from "react"

export default function StartPage(props) {
  return (
    <div className="quiz-container">
      <div>
        <h1>Quizzical</h1>
        <button className="quiz-button" onClick={props.startQuiz}>Start quiz</button>
      </div>
    </div>
  );
}