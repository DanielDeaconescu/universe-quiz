import { useEffect, useReducer, useState } from "react";
import Header from "./ui/Header";
import Main from "./ui/Main";
import Loader from "./ui/Loader";
import Error from "./ui/Error";
import StartScreen from "./ui/StartScreen";
import Question from "./ui/Question";
import NextButton from "./ui/NextButton";
import Progress from "./ui/Progress";
import FinishScreen from "./ui/FinishScreen";
import Footer from "./ui/Footer";
import Timer from "./ui/Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: Number(localStorage.getItem("highscore")) || 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish": {
      const newHighscore =
        state.points > state.highscore ? state.points : state.highscore;

      localStorage.setItem("highscore", newHighscore);

      return {
        ...state,
        status: "finished",
        highscore: newHighscore,
      };
    }
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [difficulty, setDifficulty] = useState("easy");

  function handleDifficulty(givenDifficulty) {
    setDifficulty(givenDifficulty);
  }

  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(
    function () {
      if (difficulty === "easy") {
        fetch("http://localhost:8001/questions-easy")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch(() => dispatch({ type: "dataFailed" }));
      }

      if (difficulty === "medium") {
        fetch("http://localhost:8002/questions-medium")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch(() => dispatch({ type: "dataFailed" }));
      }

      if (difficulty === "hard") {
        fetch("http://localhost:8003/questions-hard")
          .then((res) => res.json())
          .then((data) => dispatch({ type: "dataReceived", payload: data }))
          .catch(() => dispatch({ type: "dataFailed" }));
      }
    },
    [difficulty]
  );

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numQuestions={numQuestions}
            dispatch={dispatch}
            handleDifficulty={handleDifficulty}
            difficulty={difficulty}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </Footer>
          </>
        )}

        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
