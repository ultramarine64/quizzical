import React from "react"
import StartPage from "./components/StartPage"
import QuizPage from "./components/QuizPage"
import {Oval} from "react-loader-spinner"

export default function App() {
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [quizInProgress, setQuizInProgress] = React.useState(false);
  const [quizData, setQuizData] = React.useState(null);

  function startQuiz() {
    setQuizStarted(true);
    setQuizInProgress(true);
  }

  function toggleQuizProgress() {
    setQuizInProgress(prevState => !prevState);
  }

  React.useEffect(() => {
    // fetch in background
    if (!quizInProgress) {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(response => response.json())
        .then(data => setQuizData(data.results));
    }
  }, [quizInProgress]);

  return (
      quizStarted
      ?
        quizData
        ?
          <QuizPage quizData={quizData} quizInProgress={quizInProgress} toggleQuizProgress={toggleQuizProgress} />
        :
          <Oval
            color="#293264"
            secondaryColor="#000000"
            height="30vh"
            width="30vh"
            wrapperStyle={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "35vh"
            }}
          />
      :
        <StartPage startQuiz={startQuiz} />
  );
}
