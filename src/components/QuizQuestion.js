import React from "react"

export default function QuizQuestion(props) {
  function generateButtonItems() {
    return props.answers.map(answer => {
      let selectedAnswer = answer === props.selectedAnswer;
      let correctAnswer = answer === props.correctAnswer;
      const fullOpacityRequired = !props.isAnswered || (correctAnswer && props.isAnswered);
      const borderRequired = selectedAnswer || (props.isAnswered && correctAnswer);
      const backgroundColor = (!props.isAnswered && selectedAnswer)                   ? "#D6DBF5" :
                              (props.isAnswered && selectedAnswer && !correctAnswer)  ? "#EB7F7F" :
                              (props.isAnswered && correctAnswer)                     ? "#94D7A2" :
                                                                                        "transparent";
      let styles = {
        backgroundColor: backgroundColor,
        border: borderRequired ? "none" : "2px solid #4D5B9E",
        padding: borderRequired ? "10px 22px" : "8px 20px",
        opacity: fullOpacityRequired ? "1" : "0.3"
      };
      return <li>
               <button style={styles}
                       onClick={() => { if (!props.isAnswered) props.handleButtonClick(answer) }}
                       className="quiz-answer"
               >
                 {window.atob(answer)}
               </button>
            </li>
    })
  }

  return (
    <div className="quiz-question-container">
      <h2 className="quiz-question"><>{window.atob(props.question)}</></h2>
      <ul className="quiz-answers">
        {generateButtonItems()}
      </ul>
      <hr />
    </div>
  );
}