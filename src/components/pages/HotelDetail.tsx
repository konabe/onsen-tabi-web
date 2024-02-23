import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import Description from "../molecules/Description";
import HotelForm from "../organisims/HotelForm";
import { HotelEntity } from "../../domain/models/hotel";
import { CommonPageProps } from "../../App";
import Article from "../organisims/Article";
import RelatedContents from "../organisims/RelatedContents";
import { OnsenRepository } from "../../infrastructure/repositories/onsenRepository";
import { OnsenEntity } from "../../domain/models/onsen";
import { HotelRepository } from "../../infrastructure/repositories/hotelRepository";

const HotelDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const onsenRepository = new OnsenRepository();
  const hotelRepository = new HotelRepository();

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [hotel, setHotel] = useState<HotelEntity | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenEntity[] | undefined>([]);

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const hotel = await hotelRepository.read(Number(id));
          setHotel(hotel);
        })(),
        (async () => {
          const onsens = await onsenRepository.readAll(undefined, Number(id));
          setOnsens(onsens);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onHotelSubmitClick = async (hotel: HotelEntity) => {
    try {
      await hotelRepository.update(Number(id), hotel);
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
