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

  const onHotelSubmitClick = async (hotel: HotelModel) => {
    await postHotel(hotel);
  };

  useEffectOnce(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const hotels = await getHotels();
            setHotels(hotels);
          })(),
        ]);
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
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
              <HotelForm onSubmitClick={onHotelSubmitClick} />
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
