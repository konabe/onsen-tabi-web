import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HotelResponse, getHotel } from "../../infrastructure/api";

const Hotel: React.FC = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const hotel = await getHotel(Number(id));
      setHotel(hotel);
    })();
  }, []);
  return (
    <div>
      {hotel?.name}, 和室{hotel?.hasWashitsu ? "あり" : "なし"}
    </div>
  );
};

export default Hotel;
