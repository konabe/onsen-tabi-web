import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import HotelForm from "../organisims/HotelForm";
import { CommonPageProps } from "../../App";
import { HotelEntity } from "../../domain/models/hotel";
import Article from "../organisims/Article";
import { HotelRepository } from "../../infrastructure/repositories/hotelRepository";

const HotelList: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const hotelRepository = new HotelRepository();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [hotels, setHotels] = useState<HotelEntity[]>([]);

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const hotels = await hotelRepository.readAll();
          setHotels(hotels);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onHotelSubmitClick = async (hotel: HotelEntity) => {
    try {
      await hotelRepository.create(hotel);
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
            <Article emoji="🏕️" title="宿一覧">
              <SListContainer>
                {hotels.map((v) => (
                  <div key={v.id}>
                    <Link to={`/hotel/${v.id}`}>{v.name}</Link>
                  </div>
                ))}
              </SListContainer>
            </Article>
          </div>
          {isSignedIn ? (
            <div>
              <HotelForm
                formTitle="ホテルの追加"
                onSubmitClick={onHotelSubmitClick}
              />
            </div>
          ) : undefined}
        </>
      )}
    </SContents>
  );
};

export default HotelList;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const SListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
