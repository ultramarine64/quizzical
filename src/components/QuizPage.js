import React from "react"
import { nanoid } from 'nanoid'
import QuizQuestion from "./QuizQuestion"

export default function QuizPage(props) {
  const [quizQuestions, setQuizQuestions] = React.useState([]);
  const [rightAnswersCount, setRightAnswersCount] = React.useState(0);

  React.useEffect(() => {
    if (props.quizInProgress) {
      setQuizQuestions(generateQuizQuestions());
    }
  }, [props.quizInProgress]);

  function generateQuizQuestionsElems() {
    return quizQuestions.map(quizQuestion => {
             return (<QuizQuestion question={quizQuestion.question}
                                   answers={quizQuestion.answers}
                                   correctAnswer={quizQuestion.correctAnswer}
                                   selectedAnswer={quizQuestion.selectedAnswer}
                                   isAnswered={!props.quizInProgress}
                                   key={quizQuestion.id}
                                   handleButtonClick={(selectedAnswer) => handleButtonClick(selectedAnswer, quizQuestion.id)}
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
                correctAnswer: item.correct_answer,
                selectedAnswer: "",
                isAnswered: false,
                id: nanoid()
      });
    });
  }

  function handleButtonClick(selectedAnswer, id) {
    setQuizQuestions(prevQuizQuestions => prevQuizQuestions.map(question => {
      if (question.id != id) {
        return question;
      } else {
        question.selectedAnswer = selectedAnswer;
        return question;
      }
    }));
  }

  function toggleCheckButton() {
    if (props.quizInProgress) {
      let rightAnswersCount = 0;
      for (let quizQuestion of quizQuestions) {
        if (quizQuestion.selectedAnswer === quizQuestion.correctAnswer) {
          rightAnswersCount++;
        }
      }
      setRightAnswersCount(rightAnswersCount);
    }
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
        {!props.quizInProgress && <span className="quiz-results">You scored {rightAnswersCount}/5 correct answers</span>}
        <button className="quiz-button" onClick={toggleCheckButton}>{props.quizInProgress ? "Check answers" : "Play again"}</button>
      </div>
    </div>
  );
}