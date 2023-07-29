import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import headerCoverJpg from "../../header_cover.jpg";
import { HotelResponse, getHotels } from "../../infrastructure/api";

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  useEffect(() => {
    (async () => {
      const hotels = await getHotels();
      setHotels(hotels);
    })();
  }, []);
  return (
    <div>
      <header id="header" style={{ backgroundImage: `url(${headerCoverJpg})` }}>
        <div id="header-title">Nの温泉旅記録</div>
      </header>
      <h1>宿一覧</h1>
      <main>
        {hotels.map((v) => (
          <div>
            <Link to={`/hotel/${v.id}`}>{v.name}</Link>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
