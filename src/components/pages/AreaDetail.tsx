import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AreaResponse,
  getArea,
  putArea,
} from "../../infrastructure/api/AreaApiModel";
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
import { mainColor } from "../atoms/colors";
import Head from "../atoms/Head";

const AreaDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
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
          const area = await getArea(Number(id));
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
      await putArea(Number(id), area);
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
                <STag>国民保養温泉地</STag>
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

const STag = styled.span`
  display: inline-block;
  background-color: ${mainColor};
  color: white;
  font-size: 12px;
  padding: 4px;
  box-sizing: border-box;
`;
