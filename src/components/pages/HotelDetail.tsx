import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import { CommonPageProps } from "../../App";
import { HotelEntity } from "../../domain/models/hotel";
import { OnsenEntity, OnsenID } from "../../domain/models/onsen";
import { IHotelRepository } from "../../domain/repositoryInterfaces/hotelRepositoryInterface";
import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import Loading from "../atoms/Loading";
import MyHelmet from "../atoms/MyHelmet";
import Description from "../molecules/Description";
import Article from "../organisims/Article";
import HotelForm from "../organisims/HotelForm";
import RelatedContents from "../organisims/RelatedContents";

type HotelDetailDependencies = {
  dependencies: {
    onsenRepository: IOnsenRepository;
    hotelRepository: IHotelRepository;
  };
};

const HotelDetail: React.FC<CommonPageProps & HotelDetailDependencies> = ({
  isSignedIn,
  dependencies: { onsenRepository, hotelRepository },
}) => {
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

  const OnsenLink = ({ onsen }: { onsen: OnsenEntity }) => {
    const onsenID: OnsenID = onsen.id;
    return <a href={`/onsen/${onsenID.value}`}>{onsen.name}</a>;
  };

  return (
    <SContents>
      <MyHelmet title={hotel !== undefined ? hotel.name : ""} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Article emoji="🏕️" title={`${hotel?.name}`}>
              <div>
                和室{hotel?.hasWashitsu ? "あり" : "なし"}{" "}
                {hotel?.soloAvailable ? "おひとり様OK" : ""}{" "}
                <a href={hotel?.url} target="_blank" rel="noreferrer">
                  リンク
                </a>
                <DescriptionContainer>
                  <Description text={hotel?.description ?? ""} />
                </DescriptionContainer>
              </div>
            </Article>
          </div>
          <div>
            <RelatedContents title="温泉">
              {onsens?.map((onsen) => (
                <div key={onsen.id.value}>
                  <OnsenLink onsen={onsen} />
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

const DescriptionContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
