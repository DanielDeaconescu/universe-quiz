import styled from "styled-components";

const StyledProgress = styled.progress`
  position: relative;
  z-index: 10;
`;

const StyledParagraphQuestion = styled.p`
  position: relative;
  z-index: 10;
`;

const StyledParagraphPoints = styled.p`
  position: relative;
  z-index: 10;
`;

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <header className="progress">
      <StyledProgress
        max={numQuestions}
        value={index + Number(answer !== null)}
      />
      <StyledParagraphQuestion>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </StyledParagraphQuestion>

      <StyledParagraphPoints>
        <strong>{points}</strong> / {maxPossiblePoints}
      </StyledParagraphPoints>
    </header>
  );
}

export default Progress;
