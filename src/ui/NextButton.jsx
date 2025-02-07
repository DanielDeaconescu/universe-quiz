import styled from "styled-components";

const StyledButton = styled.button`
  position: relative;
  z-index: 10;
`;

function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <StyledButton
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </StyledButton>
    );

  if (index === numQuestions - 1)
    return (
      <StyledButton
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </StyledButton>
    );
}

export default NextButton;
