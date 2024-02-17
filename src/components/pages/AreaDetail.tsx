import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AreaRepository } from "../../infrastructure/repositories/areaRepository";
import {
  HotelResponse,
  getHotels,
} from "../../infrastructure/api/HotelApiModel";
import {
  OnsenResponse,
  getOnsens,
} from "../../infrastructure/api/OnsenApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import Description from "../molecules/Description";
import { CommonPageProps } from "../../App";
import { AreaEntity } from "../../domain/models/area";
import AreaForm from "../organisims/AreaForm";
import Head from "../atoms/Head";
import Tag from "../atoms/Tag";
import RelatedContents from "../organisims/RelatedContents";
import Article from "../organisims/Article";

const AreaDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const areaRepository = new AreaRepository();

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [area, setArea] = useState<AreaEntity | undefined>(undefined);
  const [hotels, setHotels] = useState<HotelResponse[] | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>(undefined);

  const villageText = area?.village != null ? `${area.village}温泉郷、` : "";

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const areaEntity = await areaRepository.read(Number(id));
          setArea(areaEntity);
        })(),
        (async () => {
          const hotels = await getHotels(Number(id));
          setHotels(hotels);
        })(),
        (async () => {
          const onsens = await getOnsens(Number(id));
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

  return (
    <SContents>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Article
              emoji="🏞️"
              title={`${area?.name}温泉 (${villageText}${area?.prefecture})`}
            >
              <div>
                <a href={area?.url} target="_blank" rel="noreferrer">
                  リンク
                </a>
                {area?.isNationalResort ?? false ? (
                  <STagContainer>
                    <Tag text={"国民保養温泉地"} />
                  </STagContainer>
                ) : undefined}
                <Description text={area?.description ?? ""} />
              </div>
            </Article>
          </div>
          <div>
            <RelatedContents title="ホテル">
              <div>
                {hotels?.map((hotel) => (
                  <div key={hotel.id}>
                    <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
                  </div>
                ))}
              </div>
            </RelatedContents>
          </div>
          <div>
            <RelatedContents title="温泉">
              <div>
                {onsens?.map((onsen) => (
                  <div key={onsen.id}>
                    <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
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
