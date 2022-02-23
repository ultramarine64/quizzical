import React from "react"
import QuizQuestionAnswer from "./QuizQuestionAnswer"

export default function QuizQuestion(props) {
  function generateAnswerElems() {
    return props.answers.map(answer => {
      return <li>
               <QuizQuestionAnswer answer={answer}
                                   selectedAnswer={props.selectedAnswer}
                                   correctAnswer={props.correctAnswer}
                                   isQuizFinished={props.isQuizFinished}
                                   handleButtonClick={props.handleButtonClick}
               />
             </li>
    })
  }

  return (
    <div className="quiz-question-container">
      <h2 className="quiz-question" dangerouslySetInnerHTML={{__html: props.question}}></h2>
      <ul className="quiz-answers">
        {generateAnswerElems()}
      </ul>
      <hr />
    </div>
  );
}
