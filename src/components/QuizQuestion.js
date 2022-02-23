import React from "react"

export default function QuizQuestion(props) {
  const SELECTED_ANSWER_COLOR = "#D6DBF5";
  const WRONG_ANSWER_COLOR = "#EB7F7F";
  const CORRECT_ANSWER_COLOR = "#94D7A2";

  function generateAnswerItems() {
    return props.answers.map(answer => {
      const selectedAnswer = answer === props.selectedAnswer;
      const correctAnswer = answer === props.correctAnswer;
      const fullOpacityRequired = !props.isQuizFinished || (correctAnswer && props.isQuizFinished);
      const borderRequired = selectedAnswer || (props.isQuizFinished && correctAnswer);
      const backgroundColor = (!props.isQuizFinished && selectedAnswer)                   ? SELECTED_ANSWER_COLOR :
                              (props.isQuizFinished && selectedAnswer && !correctAnswer)  ? WRONG_ANSWER_COLOR :
                              (props.isQuizFinished && correctAnswer)                     ? CORRECT_ANSWER_COLOR :
                                                                                        "transparent";
      const styles = {
        backgroundColor: backgroundColor,
        border: borderRequired ? "none" : "2px solid #4D5B9E",
        padding: borderRequired ? "10px 22px" : "8px 20px",
        opacity: fullOpacityRequired ? "1" : "0.3"
      };
      return <li>
               <button style={styles}
                       onClick={() => { if (!props.isQuizFinished) props.handleButtonClick(answer) }}
                       className="quiz-answer"
                       dangerouslySetInnerHTML={{__html: answer}}
               >
               </button>
             </li>
    })
  }

  return (
    <div className="quiz-question-container">
      <h2 className="quiz-question" dangerouslySetInnerHTML={{__html: props.question}}></h2>
      <ul className="quiz-answers">
        {generateAnswerItems()}
      </ul>
      <hr />
    </div>
  );
}
