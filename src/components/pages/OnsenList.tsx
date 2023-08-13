import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerCoverJpg from "../../header_cover.jpg";
import { OnsenResponse, getOnsens } from "../../infrastructure/api";

const OnsenList: React.FC = () => {
  const [onsens, setOnsens] = useState<OnsenResponse[]>([]);
  useEffect(() => {
    (async () => {
      (async () => {
        const onsens = await getOnsens();
        setOnsens(onsens);
      })();
    })();
  }, []);
  return (
    <div>
      <SHeader
        id="header"
        style={{ backgroundImage: `url(${headerCoverJpg})` }}
      >
        <SHeaderText id="header-title">Nの温泉旅記録</SHeaderText>
      </SHeader>
      <main>
        <h1>♨温泉一覧</h1>
        {onsens.map((v) => (
          <div key={v.id}>
            <Link to={`/onsen/${v.id}`}>{v.name}</Link>
          </div>
        ))}
      </main>
    </div>
  );
};

const SHeader = styled.header`
  background-color: bisque;
  height: 300px;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
`;

const SHeaderText = styled.div`
  color: white;
  background-color: rgba(1, 1, 1, 0.5);
  font-size: 36px;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export default OnsenList;
