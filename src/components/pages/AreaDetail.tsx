import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AreaResponse, getArea } from "../../infrastructure/api/AreaApiModel";
import {
  HotelResponse,
  getHotels,
} from "../../infrastructure/api/HotelApiModel";
import {
  OnsenResponse,
  getOnsens,
} from "../../infrastructure/api/OnsenApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";

const AreaDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [area, setArea] = useState<AreaResponse | undefined>(undefined);
  const [hotels, setHotels] = useState<HotelResponse[] | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>(undefined);

  useEffectOnce(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const area = await getArea(Number(id));
            setArea(area);
            return Promise.resolve();
          })(),
          (async () => {
            const hotels = await getHotels(Number(id));
            setHotels(hotels);
          })(),
          (async () => {
            const onsens = await getOnsens(Number(id));
            setOnsens(onsens);
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
          <h1>{area?.name + "温泉"}</h1>
          <p>{area?.prefecture}</p>
          <a href={area?.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          <h2>ホテル</h2>
          <div>
            {hotels?.map((hotel) => (
              <div key={hotel.id}>
                <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
              </div>
            ))}
          </div>
          <h2>温泉</h2>
          <div>
            {onsens?.map((onsen) => (
              <div key={onsen.id}>
                <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default AreaDetail;
