import React from "react"
import { nanoid } from 'nanoid'
import QuizQuestion from "./QuizQuestion"

export default function QuizPage(props) {
  const [quizQuestions, setQuizQuestions] = React.useState([]);

  React.useEffect(() => {
    if (props.quizInProgress) {
      setQuizQuestions(generateQuizQuestions());
    }
  }, [props.quizInProgress]);

  function generateQuizQuestionsElems() {
    return quizQuestions.map(quizQuestion => {
             return (<QuizQuestion question={quizQuestion.question}
                                   answers={quizQuestion.answers}
                                   correct_answer={quizQuestion.correct_answer}
                                   selected_answer={quizQuestion.selected_answer}
                                   is_answered={!props.quizInProgress}
                                   key={quizQuestion.id}
                                   handleButtonClick={(selected_answer) => handleButtonClick(selected_answer, quizQuestion.id)}
                     />);
             });
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  function generateQuizQuestions() {
    return props.quizData.map(item => {
      let answers = [...item.incorrect_answers, item.correct_answer];
      shuffleArray(answers);
      return ({
                question: item.question,
                answers: answers,
                correct_answer: item.correct_answer,
                selected_answer: "",
                is_answered: false,
                id: nanoid()
      });
    });
  }

  function handleButtonClick(selectedAnswer, id) {
    setQuizQuestions(prevQuizQuestions => prevQuizQuestions.map(question => {
      if (question.id != id) {
        return question;
      } else {
        question.selected_answer = selectedAnswer;
        return question;
      }
    }));
  }

  function toggleCheckButton() {
    props.toggleQuizProgress();
  }

  let quizQuestionElems = generateQuizQuestionsElems();

  console.log(quizQuestions);

  return (
    <div className="quiz-container">
      <div>
        {quizQuestionElems}
      </div>
      <div>
        <button className="quiz-button" onClick={toggleCheckButton}>{props.quizInProgress ? "Check answers" : "Play again"}</button>
      </div>
    </div>
  );
}