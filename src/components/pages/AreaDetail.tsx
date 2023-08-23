import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AreaResponse, getArea } from "../../infrastructure/api/AreaApiModel";
import {
  HotelResponse,
  getHotels,
} from "../../infrastructure/api/HotelApiModel";
import {
  OnsenResponse,
  getOnsens,
} from "../../infrastructure/api/OnsenApiModel";

const AreaDetail: React.FC = () => {
  const { id } = useParams();
  const [area, setArea] = useState<AreaResponse | undefined>(undefined);
  const [hotels, setHotels] = useState<HotelResponse[] | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const area = await getArea(Number(id));
      setArea(area);
    })();
    (async () => {
      const hotels = await getHotels(Number(id));
      setHotels(hotels);
    })();
    (async () => {
      const onsens = await getOnsens(Number(id));
      setOnsens(onsens);
    })();
  }, [id]);
  return (
    <>
      {area === undefined || hotels === undefined || onsens === undefined ? (
        <div>ローディング中 ...</div>
      ) : (
        <>
          <h1>{area?.name + "温泉"}</h1>
          <p>{area?.prefecture}</p>
          <a href={area?.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          <h2>ホテル</h2>
          <div>
            {hotels.map((hotel) => (
              <div>
                <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
              </div>
            ))}
          </div>
          <h2>温泉</h2>
          <div>
            {onsens.map((onsen) => (
              <div>
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
