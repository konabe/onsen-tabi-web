import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AreaRepository,
  AreaResponse,
} from "../../infrastructure/repositories/areaRepository";
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
import { AreaModel } from "../../share/area";
import AreaForm from "../organisims/AreaForm";
import Head from "../atoms/Head";
import Tag from "../atoms/Tag";

const AreaDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const areaRepository = new AreaRepository();

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [area, setArea] = useState<AreaResponse | undefined>(undefined);
  const [hotels, setHotels] = useState<HotelResponse[] | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>(undefined);

  const villageText = area?.village != null ? `${area.village}温泉郷、` : "";

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const area = await areaRepository.readArea(Number(id));
          setArea(area);
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

  const onAreaSubmitClick = async (area: AreaModel) => {
    try {
      await areaRepository.updateArea(Number(id), area);
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
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Head
            emoji="🏞"
            title={`${area?.name}温泉 (${villageText}${area?.prefecture})`}
          />
          <SContent>
            <a href={area?.url} target="_blank" rel="noreferrer">
              リンク
            </a>
            {area?.nationalResort ?? false ? (
              <STagContainer>
                <Tag text={"国民保養温泉地"} />
              </STagContainer>
            ) : undefined}
            <Description text={area?.description ?? ""} />
          </SContent>
          <h2>ホテル</h2>
          <SContent>
            {hotels?.map((hotel) => (
              <div key={hotel.id}>
                <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
              </div>
            ))}
          </SContent>
          <h2>温泉</h2>
          <SContent>
            {onsens?.map((onsen) => (
              <div key={onsen.id}>
                <a href={`/onsen/${onsen.id}`}>{onsen.name}</a>
              </div>
            ))}
          </SContent>
          {isSignedIn ? (
            <div style={{ marginTop: 20 }}>
              <AreaForm value={area} onSubmitClick={onAreaSubmitClick} />
            </div>
          ) : undefined}
        </>
      )}
    </>
  );
};

export default AreaDetail;

const SContent = styled.div`
  margin-bottom: 20px;
`;

const STagContainer = styled.div`
  margin-top: 8px;
`;
