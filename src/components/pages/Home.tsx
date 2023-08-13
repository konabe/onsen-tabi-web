import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import headerCoverJpg from "../../header_cover.jpg";
import {
  AreaResponse,
  HotelResponse,
  OnsenResponse,
  getAreas,
  getHotels,
  getOnsens,
} from "../../infrastructure/api";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "../organisims/OnsenAreaList";

const Home: React.FC = () => {
  const [areas, setAreas] = useState<AreaResponse[]>([]);
  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  const [onsens, setOnsens] = useState<OnsenResponse[]>([]);
  useEffect(() => {
    (async () => {
      (async () => {
        const areas = await getAreas();
        setAreas(areas);
      })();
      (async () => {
        const hotels = await getHotels();
        setHotels(hotels);
      })();
      (async () => {
        const onsens = await getOnsens();
        setOnsens(onsens);
      })();
    })();
  }, []);
  return (
    <div>
      <header id="header" style={{ backgroundImage: `url(${headerCoverJpg})` }}>
        <div id="header-title">Nの温泉旅記録</div>
      </header>
      <OnsenAreaList areas={areas} prefectures={prefectures()} />
      <main>
        <h1>♨温泉一覧</h1>
        {onsens.map((v) => (
          <div key={v.id}>
            <Link to={`/onsen/${v.id}`}>{v.name}</Link>
          </div>
        ))}
      </main>
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

export default Home;
