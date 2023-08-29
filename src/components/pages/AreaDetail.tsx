import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  AreaResponse,
  getArea,
  putAreaDescription,
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
import TextArea from "../atoms/TextArea";
import { Button } from "../atoms/Button";
import styled from "styled-components";
import Description from "../molecules/Description";
import { CommonPageProps } from "../../App";

const AreaDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [area, setArea] = useState<AreaResponse | undefined>(undefined);
  const [hotels, setHotels] = useState<HotelResponse[] | undefined>(undefined);
  const [onsens, setOnsens] = useState<OnsenResponse[] | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  useEffectOnce(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const area = await getArea(Number(id));
            setArea(area);
            setDescription(area.description);
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
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  });

  const onClickChangeTextButton = async () => {
    try {
      const sentDescription = description;
      await putAreaDescription(Number(id), description);
      if (area !== undefined) {
        setArea({ ...area, description: sentDescription });
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
        <>
          <h1>{`🏞 ${area?.name}温泉 (${area?.prefecture})`}</h1>
          <SContent>
            <a href={area?.url} target="_blank" rel="noreferrer">
              リンク
            </a>
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
              <div>
                <TextArea
                  value={description}
                  onChange={async (e) => setDescription(e.target.value)}
                />
              </div>
              <Button title={"説明変更"} onClick={onClickChangeTextButton} />
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
