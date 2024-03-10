import styled, { keyframes } from "styled-components";

import { subColor } from "./colors";

type Props = {
  title: string;
  onClick: () => void;
};

const Button: React.FC<Props> = ({ title, onClick }) => {
  return (
    <SButton type="button" onClick={onClick}>
      {title}
    </SButton>
  );
};

export default Button;

const fadeIn = keyframes`
  from {
    box-shadow: none;
  }
  to {
    box-shadow: 0px 0px 8px black;
  }
`;

const SButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  color: white;
  background-color: ${subColor};
  opacity: 0.95;

  &:hover {
    animation: ${fadeIn} 0.2s ease-in-out;
    box-shadow: 0px 0px 8px black;
  }
`;
