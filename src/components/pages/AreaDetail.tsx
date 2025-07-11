import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import { CommonPageProps } from "../../App";
import { AreaEntity } from "../../domain/models/area";
import { HotelEntity, HotelID } from "../../domain/models/hotel";
import { OnsenEntity, OnsenID } from "../../domain/models/onsen";
import { IAreaRepository } from "../../domain/repositoryInterfaces/areaRepositoryInterface";
import { IHotelRepository } from "../../domain/repositoryInterfaces/hotelRepositoryInterface";
import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import Loading from "../atoms/Loading";
import MyHelmet from "../atoms/MyHelmet";
import Tag from "../atoms/Tag";
import Description from "../molecules/Description";
import AreaForm from "../organisims/AreaForm";
import Article from "../organisims/Article";
import RelatedContents from "../organisims/RelatedContents";

type AreaDetailDependencies = {
  dependencies: {
    areaRepository: IAreaRepository;
    onsenRepository: IOnsenRepository;
    hotelRepository: IHotelRepository;
  };
};

const AreaDetail: React.FC<CommonPageProps & AreaDetailDependencies> = ({
  isSignedIn,
  dependencies: { areaRepository, onsenRepository, hotelRepository },
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [area, setArea] = useState<AreaEntity | undefined>(undefined);
  const [hotels, setHotels] = useState<HotelEntity[] | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenEntity[] | undefined>(undefined);

  const villageText = area?.village != null ? `${area.village}温泉郷、` : "";

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const areaEntity = await areaRepository.read(Number(id));
          setArea(areaEntity);
        })(),
        (async () => {
          const hotels = await hotelRepository.readAll(Number(id));
          setHotels(hotels);
        })(),
        (async () => {
          const onsens = await onsenRepository.readAll(Number(id));
          setOnsens(onsens);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onAreaSubmitClick = async (area: AreaEntity) => {
    try {
      await areaRepository.update(Number(id), area);
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

  const HotelLink = ({ hotel }: { hotel: HotelEntity }) => {
    const hotelID: HotelID = hotel.id;
    return <a href={`/hotel/${hotelID.value}`}>{hotel.name}</a>;
  };

  const OnsenLink = ({ onsen }: { onsen: OnsenEntity }) => {
    const onsenID: OnsenID = onsen.id;
    return <a href={`/onsen/${onsenID.value}`}>{onsen.name}</a>;
  };

  return (
    <SContents>
      <MyHelmet title={area?.displayingName() ?? ""} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Article
              emoji="🏞️"
              title={`${area?.displayingName()} (${villageText}${area?.prefecture})`}
            >
              <div>
                <a href={area?.url} target="_blank" rel="noreferrer">
                  リンク
                </a>
                {(area?.isNationalResort ?? false) ? (
                  <STagContainer>
                    <Tag text={"国民保養温泉地"} hexColor={undefined} />
                  </STagContainer>
                ) : undefined}
                <DescriptionContainer>
                  <Description text={area?.description ?? ""} />
                </DescriptionContainer>
                {area?.access ? (
                  <DescriptionContainer>
                    <Description text={area?.access ?? ""} />
                  </DescriptionContainer>
                ) : undefined}
              </div>
            </Article>
          </div>
          <div>
            <RelatedContents title="ホテル">
              <div>
                {hotels?.map((hotel) => (
                  <div key={hotel.id.value}>
                    <HotelLink hotel={hotel} />
                  </div>
                ))}
              </div>
            </RelatedContents>
          </div>
          <div>
            <RelatedContents title="温泉">
              <div>
                {onsens?.map((onsen) => (
                  <div key={onsen.id.value}>
                    <OnsenLink onsen={onsen} />
                  </div>
                ))}
              </div>
            </RelatedContents>
          </div>
          <div>
            {isSignedIn ? (
              <AreaForm value={area} onSubmitClick={onAreaSubmitClick} />
            ) : undefined}
          </div>
        </>
      )}
    </SContents>
  );
};

export default AreaDetail;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const STagContainer = styled.div`
  margin-top: 8px;
`;

const DescriptionContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;
