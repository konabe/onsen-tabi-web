import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HotelResponse,
  getHotels,
} from "../../infrastructure/api/HotelApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";

const HotelList: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [hotels, setHotels] = useState<HotelResponse[]>([]);
  useEffectOnce(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const hotels = await getHotels();
            setHotels(hotels);
          })(),
        ]);
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>🛏 宿一覧</h1>{" "}
          {hotels.map((v) => (
            <div key={v.id}>
              <Link to={`/hotel/${v.id}`}>{v.name}</Link>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default HotelList;
