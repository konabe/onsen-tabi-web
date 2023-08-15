import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelResponse, getHotel } from "../../infrastructure/api";

const HotelDetail: React.FC = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const hotel = await getHotel(Number(id));
      setHotel(hotel);
    })();
  }, [id]);
  return (
    <div>
      {hotel?.name}, 和室{hotel?.hasWashitsu ? "あり" : "なし"}
      <a href={hotel?.url} target="_blank" rel="noreferrer">
        リンク
      </a>
    </div>
  );
};

export default HotelDetail;
