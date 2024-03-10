import styled from "styled-components";
import { subColor } from "../atoms/colors";
import { ReactNode } from "react";

type Props = {
  leftNav?: ReactNode;
  rightNav?: ReactNode;
};

const NavBar: React.FC<Props> = ({ leftNav, rightNav }) => {
  return (
    <SNav data-testid="nav-bar">
      <SLeftNav>{leftNav}</SLeftNav>
      <SRightNav>{rightNav}</SRightNav>
    </SNav>
  );
};

export default NavBar;

const SNav = styled.nav`
  height: 40px;
  background-color: ${subColor};
`;

const SLeftNav = styled.div`
  float: left;
  height: 100%;
`;

const SRightNav = styled.div`
  float: right;
  height: 100%;
`;
