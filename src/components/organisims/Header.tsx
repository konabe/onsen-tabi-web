import styled from "styled-components";

import headerCoverJpg from "../../header_cover.jpg";

const Header: React.FC = () => {
  return (
    <SHeader id="header" style={{ backgroundImage: `url(${headerCoverJpg})` }}>
      <SHeaderText>
        <SHeaderIcon src="/img/logo.png" alt="サイトアイコン" />
        静かに温泉旅がしたい！
      </SHeaderText>
    </SHeader>
  );
};

export default Header;

const SHeader = styled.header`
  height: 30vh;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const SHeaderIcon = styled.img`
  vertical-align: bottom;
  height: 36px;
  margin-right: 8px;
  border-radius: 10px;

  @media screen and (max-width: 767px) {
    height: 24px;
    border-radius: 6px;
  }
`;

const SHeaderText = styled.div`
  color: white;
  background-color: rgba(1, 1, 1, 0.5);
  padding: 8px 16px;
  font-size: 36px;
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-family: "BIZ UDPMincho";
  font-weight: 400;

  @media screen and (max-width: 767px) {
    font-size: 24px;
  }
`;
