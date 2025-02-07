import UniverseLogo from "../../data/images/universe_logo.svg";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

function Header() {
  return (
    <StyledHeader className="app-header">
      <img src={UniverseLogo} alt="React logo" />
      <h2>Interstellar Quiz</h2>
    </StyledHeader>
  );
}

export default Header;
