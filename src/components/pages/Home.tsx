import { useEffect, useState } from "react";
import styled from "styled-components";
import headerCoverJpg from "../../header_cover.jpg";
import { AreaResponse, getAreas } from "../../infrastructure/api/AreaApiModel";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "../organisims/OnsenAreaList";
import HotelForm from "../organisims/HotelForm";
import OnsenForm from "../organisims/OnsenForm";
import { getToken } from "../../infrastructure/LocalStorage";

const Home: React.FC = () => {
  const [areas, setAreas] = useState<AreaResponse[]>([]);
  const isSignedIn = getToken() !== null;
  useEffect(() => {
    (async () => {
      (async () => {
        const areas = await getAreas();
        setAreas(areas);
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
      <OnsenAreaList areas={areas} prefectures={prefectures()} />
      {isSignedIn ? (
        <>
          <HotelForm />
          <OnsenForm />
        </>
      ) : undefined}
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

export default Home;
