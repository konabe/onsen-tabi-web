import { Link, useLocation } from "react-router";
import styled from "styled-components";

import { mainColor, subColor } from "../atoms/colors";

type Props = {
  path: string;
  text: string;
};

export const NavItem: React.FC<Props> = ({ path, text }) => {
  const location = useLocation();
  return (
    <Link to={path}>
      <SNavItem selected={location.pathname === path}>{text}</SNavItem>
    </Link>
  );
};

const SNavItem = styled.button<{ selected: boolean }>`
  height: 100%;
  box-shadow: none;
  border: none;
  outline: none;
  color: white;
  padding: 0px 20px;
  background-color: ${({ selected }) => (selected ? mainColor : subColor)};
  opacity: 1;
  box-sizing: border-box;

  &:hover {
    opacity: 0.3;
  }
`;

export default NavItem;
