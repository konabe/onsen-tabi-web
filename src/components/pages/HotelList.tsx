import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HotelResponse,
  getHotels,
} from "../../infrastructure/api/HotelApiModel";

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
    <>
      <h1>🛏宿一覧</h1>
      {hotels.length === 0 ? (
        <div>ローディング中 ...</div>
      ) : (
        hotels.map((v) => (
          <div key={v.id}>
            <Link to={`/hotel/${v.id}`}>{v.name}</Link>
          </div>
        ))
      )}
    </>
  );
};

export default HotelList;
