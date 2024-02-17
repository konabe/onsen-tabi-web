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
import Article from "../organisims/Article";
import RelatedContents from "../organisims/RelatedContents";

const HotelDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [hotel, setHotel] = useState<HotelResponse | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>([]);

  const loadPage = async () => {
    try {
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
    } catch {
      navigate("/error");
    }
  };

  const onHotelSubmitClick = async (hotel: HotelModel) => {
    try {
      await putHotel(Number(id), hotel);
      loadPage();
    } catch {
      navigate("/error");
    }
  };

  useEffectOnce(() => {
    (async () => {
      setIsLoading(true);
      await loadPage();
      setIsLoading(false);
    })();
  });

  return (
    <SContents>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Article emoji="🏕️" title={`${hotel?.name}`}>
              <div>
                和室{hotel?.hasWashitsu ? "あり" : "なし"}
                <a href={hotel?.url} target="_blank" rel="noreferrer">
                  リンク
                </a>
                <Description text={hotel?.description ?? ""} />
              </div>
            </Article>
          </div>
          <div>
            <RelatedContents title="温泉">
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
            </RelatedContents>
          </div>
        </>
      )}
    </SContents>
  );
};

export default HotelDetail;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
