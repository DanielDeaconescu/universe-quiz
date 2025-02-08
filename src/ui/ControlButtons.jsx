import styled from "styled-components";

const StyledButton = styled.button`
  position: relative;
  z-index: 10;
`;

function ControlButtons({ dispatch, answers = [], index, numQuestions }) {
  const hasAnswered = answers.length > 0 && answers[index] !== null; // Check if the current question has been answered

  return (
    <>
      {index < numQuestions - 1 && (
        <StyledButton
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
          disabled={!hasAnswered}
        >
          Next
        </StyledButton>
      )}

      {index > 0 && (
        <StyledButton
          className="btn btn-ui"
          onClick={() => dispatch({ type: "prevQuestion" })}
        >
          Previous
        </StyledButton>
      )}

      {index === numQuestions - 1 && (
        <StyledButton
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finish" })}
          disabled={!hasAnswered}
        >
          Finish
        </StyledButton>
      )}
    </>
  );
}

export default ControlButtons;
