import styled from "styled-components";
import Options from "./Options";

const StyledQuestion = styled.div`
  position: relative;
  z-index: 10;
`;

function Question({ question, dispatch, answer }) {
  return (
    <StyledQuestion>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </StyledQuestion>
  );
}

export default Question;
