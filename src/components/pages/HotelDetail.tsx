import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  HotelResponse,
  getHotel,
  putHotel,
} from "../../infrastructure/api/HotelApiModel";
import { getOnsens } from "../../infrastructure/api/OnsenApiModel";
import { OnsenResponse } from "../../infrastructure/api/OnsenApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import Description from "../molecules/Description";
import HotelForm from "../organisims/HotelForm";
import { HotelModel } from "../../share/hotel";
import { CommonPageProps } from "../../App";

const HotelDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>([]);

  const loadPage = async () => {
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
  };

  const onHotelSubmitClick = async (hotel: HotelModel) => {
    try {
      await putHotel(Number(id), hotel);
      if (hotel !== undefined) {
        setHotel({ ...hotel, id: Number(id) });
      }
    } catch {
      navigate("/error");
    }
  };

  useEffectOnce(() => {
    (async () => {
      loadPage();
    })();
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h1>{`🛏 ${hotel?.name}`}</h1>
          <SContent>
            和室{hotel?.hasWashitsu ? "あり" : "なし"}
            <a href={hotel?.url} target="_blank" rel="noreferrer">
              リンク
            </a>
            <Description text={hotel?.description ?? ""} />
          </SContent>
          <h2>温泉</h2>
          <SContent>
            {onsens?.map((onsen) => (
              <div key={onsen.id}>
                <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
              </div>
            ))}
            {isSignedIn ? (
              <div style={{ marginTop: 20 }}>
                <HotelForm value={hotel} onSubmitClick={onHotelSubmitClick} />
              </div>
            ) : undefined}
          </SContent>
        </div>
      )}
    </>
  );
};

export default HotelDetail;

const SContent = styled.div`
  margin-bottom: 20px;
`;
