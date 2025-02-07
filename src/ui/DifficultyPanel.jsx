import styled from "styled-components";

const StyledDifficultyPanel = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-bottom: 2rem;
`;

const DifficultyButton = styled.button`
  font-size: 2rem;
  border: none;
  padding: 0.75rem;

  &:hover {
    cursor: pointer;
  }
`;

function DifficultyPanel({ handleDifficulty, difficulty }) {
  return (
    <StyledDifficultyPanel>
      <DifficultyButton
        className={difficulty === "easy" ? "selected" : ""}
        onClick={() => handleDifficulty("easy")}
      >
        Easy
      </DifficultyButton>
      <DifficultyButton
        className={difficulty === "medium" ? "selected" : ""}
        onClick={() => handleDifficulty("medium")}
      >
        Medium
      </DifficultyButton>
      <DifficultyButton
        className={difficulty === "hard" ? "selected" : ""}
        onClick={() => handleDifficulty("hard")}
      >
        Hard
      </DifficultyButton>
    </StyledDifficultyPanel>
  );
}

export default DifficultyPanel;
