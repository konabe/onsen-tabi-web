import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import headerCoverJpg from "../../header_cover.jpg";
import {
  HotelResponse,
  OnsenResponse,
  getHotels,
  getOnsens,
} from "../../infrastructure/api";

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  const [onsens, setOnsens] = useState<OnsenResponse[]>([]);
  useEffect(() => {
    (async () => {
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
      <main>
        <h1>宿一覧</h1>
        {hotels.map((v) => (
          <div>
            <Link to={`/hotel/${v.id}`}>{v.name}</Link>
          </div>
        ))}
      </main>
      <main>
        <h1>温泉一覧</h1>
        {onsens.map((v) => (
          <div>
            <Link to={`/onsen/${v.id}`}>{v.name}</Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
