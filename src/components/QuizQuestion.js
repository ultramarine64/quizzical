import React from "react"

export default function QuizQuestion(props) {
  function generateButtonItems() {
    return props.answers.map(answer => {
      let selectedAnswer = answer == props.selected_answer;
      let correctAnswer = answer == props.correct_answer;
      const fullOpacityRequired = !props.is_answered || (correctAnswer && props.is_answered);
      const borderRequired = selectedAnswer || (props.is_answered && correctAnswer);
      const backgroundColor = (!props.is_answered && selectedAnswer)                  ? "#D6DBF5" :
                              (props.is_answered && selectedAnswer && !correctAnswer) ? "#EB7F7F" :
                              (props.is_answered && correctAnswer)                    ? "#94D7A2" :
                                                                                        "transparent";
      let styles = {
        backgroundColor: backgroundColor,
        border: borderRequired ? "none" : "2px solid #4D5B9E",
        padding: borderRequired ? "10px 22px" : "8px 20px",
        opacity: fullOpacityRequired ? "1" : "0.3"
      };
      return <li>
               <button style={styles}
                       onClick={() => { if (!props.is_answered) props.handleButtonClick(answer) }}
                       className="quiz-answer"
               >
                 {window.atob(answer)}
               </button>
            </li>
    })
  }

  return (
    <div>
      <h2 className="quiz-question"><>{window.atob(props.question)}</></h2>
      <ul className="quiz-answers">
        {generateButtonItems()}
      </ul>
      <hr />
    </div>
  );
}