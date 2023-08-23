import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HotelResponse,
  getHotel,
} from "../../infrastructure/api/HotelApiModel";
import { getOnsens } from "../../infrastructure/api/OnsenApiModel";
import { OnsenResponse } from "../../infrastructure/api/OnsenApiModel";

const HotelDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>([]);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const hotel = await getHotel(Number(id));
            setHotel(hotel);
          })(),
          (async () => {
            const onsens = await getOnsens(undefined, Number(id));
            setOnsens(onsens);
          })(),
        ]);
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  }, [id, navigate]);

  return (
    <>
      {isLoading ? (
        <div>ローディング中 ...</div>
      ) : (
        <div>
          <h1>{hotel?.name}</h1>
          和室{hotel?.hasWashitsu ? "あり" : "なし"}
          <a href={hotel?.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          <div>
            <h2>温泉</h2>
            {onsens?.map((onsen) => (
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
