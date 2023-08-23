import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HotelResponse,
  getHotel,
} from "../../infrastructure/api/HotelApiModel";
import { getOnsens } from "../../infrastructure/api/OnsenApiModel";
import { OnsenResponse } from "../../infrastructure/api/OnsenApiModel";

const HotelDetail: React.FC = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const hotel = await getHotel(Number(id));
      setHotel(hotel);
    })();
    (async () => {
      const onsens = await getOnsens(undefined, Number(id));
      setOnsens(onsens);
    })();
  }, [id]);
  return (
    <>
      {hotel === undefined || onsens === undefined ? (
        <div>ローディング中 ...</div>
      ) : (
        <div>
          <h2>ホテル</h2>
          {hotel.name}, 和室{hotel?.hasWashitsu ? "あり" : "なし"}
          <a href={hotel?.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          <div>
            {onsens.map((onsen) => (
              <div>
                <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HotelDetail;
