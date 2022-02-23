import React from "react"

export default function QuizQuestionAnswer(props) {
  const SELECTED_ANSWER_COLOR = "#D6DBF5";
  const WRONG_ANSWER_COLOR = "#EB7F7F";
  const CORRECT_ANSWER_COLOR = "#94D7A2";

  function generateButtonStyle() {
    const selectedAnswer = props.answer === props.selectedAnswer;
    const correctAnswer = props.answer === props.correctAnswer;
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

    return styles;
  }

  return (<button style={generateButtonStyle()}
                    onClick={() => { if (!props.isQuizFinished) props.handleButtonClick(props.answer) }}
                    className="quiz-answer"
                    dangerouslySetInnerHTML={{__html: props.answer}}
          >
          </button>);
}
