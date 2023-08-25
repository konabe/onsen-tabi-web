import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HotelResponse,
  getHotel,
  putHotelDescription,
} from "../../infrastructure/api/HotelApiModel";
import { getOnsens } from "../../infrastructure/api/OnsenApiModel";
import { OnsenResponse } from "../../infrastructure/api/OnsenApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import { getToken } from "../../infrastructure/LocalStorage";
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";

const HotelDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>([]);
  const [description, setDescription] = useState<string>("");

  const splittedDescription: string[] = (hotel?.description ?? "").split("\n");
  const isSignedIn = getToken() !== null;

  useEffectOnce(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const hotel = await getHotel(Number(id));
            setHotel(hotel);
            setDescription(hotel.description);
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
  });

  const onClickChangeTextButton = async () => {
    try {
      const sentDescription = description;
      await putHotelDescription(Number(id), description);
      if (hotel !== undefined) {
        setHotel({ ...hotel, description: sentDescription });
      }
    } catch {
      navigate("/error");
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1>{hotel?.name}</h1>
          和室{hotel?.hasWashitsu ? "あり" : "なし"}
          <a href={hotel?.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          {splittedDescription.map((v) => (
            <p key={v}>{v}</p>
          ))}
          <div>
            <h2>温泉</h2>
            {onsens?.map((onsen) => (
              <div key={onsen.id}>
                <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
              </div>
            ))}
          </div>
          {isSignedIn ? (
            <div style={{ marginTop: 20 }}>
              <div>
                <TextArea
                  value={description}
                  onChange={async (e) => setDescription(e.target.value)}
                />
              </div>
              <Button title={"説明変更"} onClick={onClickChangeTextButton} />
            </div>
          ) : undefined}
        </div>
      )}
    </>
  );
};

export default HotelDetail;
