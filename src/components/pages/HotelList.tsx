import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HotelResponse,
  getHotels,
  postHotel,
} from "../../infrastructure/api/HotelApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import HotelForm from "../organisims/HotelForm";
import { CommonPageProps } from "../../App";
import { HotelModel } from "../../share/hotel";

const HotelList: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [hotels, setHotels] = useState<HotelResponse[]>([]);

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const hotels = await getHotels();
          setHotels(hotels);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onHotelSubmitClick = async (hotel: HotelModel) => {
    try {
      await postHotel(hotel);
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
          <h1>🛏 宿一覧</h1>{" "}
          <SListContainer>
            {hotels.map((v) => (
              <div key={v.id}>
                <Link to={`/hotel/${v.id}`}>{v.name}</Link>
              </div>
            ))}
          </SListContainer>
          {isSignedIn ? (
            <>
              <HotelForm
                formTitle="ホテルの追加"
                onSubmitClick={onHotelSubmitClick}
              />
            </>
          ) : undefined}
        </>
      )}
    </>
  );
};

export default HotelList;

const SListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
