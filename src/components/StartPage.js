import React from "react"

export default function StartPage(props) {
  return (
    <div className="quiz-container">
      <div className="start-page">
        <h1 className="quiz-title">Quizzical</h1>
        <p className="quiz-description">A simple quiz with 5 questions</p>
        <button className="quiz-button" onClick={props.startQuiz}>Start quiz</button>
      </div>
    </div>
  );
}
