import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import headerCoverJpg from "../../header_cover.jpg";
import { HotelResponse, getHotels } from "../../infrastructure/api";

const HotelList: React.FC = () => {
  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  useEffect(() => {
    (async () => {
      (async () => {
        const hotels = await getHotels();
        setHotels(hotels);
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
        <h1>🛏宿一覧</h1>
        {hotels.map((v) => (
          <div key={v.id}>
            <Link to={`/hotel/${v.id}`}>{v.name}</Link>
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

export default HotelList;
