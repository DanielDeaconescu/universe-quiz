import styled from "styled-components";
import DifficultyPanel from "./DifficultyPanel";

const StyledH3 = styled.h3`
  text-align: center;
  padding-bottom: 2rem;
`;

function StartScreen({ numQuestions, dispatch, handleDifficulty, difficulty }) {
  return (
    <div className="start-screen">
      <h2>Welcome to the Interstellar Quiz!</h2>
      <StyledH3>
        Pick a degree of difficulty and test your general knowledge about the
        universe with {numQuestions} questions
      </StyledH3>
      <DifficultyPanel
        handleDifficulty={handleDifficulty}
        difficulty={difficulty}
      />
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Begin
      </button>
    </div>
  );
}

export default StartScreen;
