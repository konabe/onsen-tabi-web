import { useState } from "react";
import { useNavigate } from "react-router";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import { CommonPageProps } from "../../App";
import { HotelEntity } from "../../domain/models/hotel";
import { IHotelRepository } from "../../domain/repositoryInterfaces/hotelRepositoryInterface";
import Loading from "../atoms/Loading";
import MyHelmet from "../atoms/MyHelmet";
import Article from "../organisims/Article";
import HotelCard from "../organisims/HotelCard";
import HotelForm from "../organisims/HotelForm";

type HotelListDependencies = {
  dependencies: {
    hotelRepository: IHotelRepository;
  };
};

const HotelList: React.FC<CommonPageProps & HotelListDependencies> = ({
  isSignedIn,
  dependencies: { hotelRepository },
}) => {
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
      <MyHelmet title={"宿一覧"} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Article emoji="🏕️" title="宿一覧">
              <SListContainer>
                {hotels.map((v) => (
                  <SListItemContainer key={v.id.value}>
                    <HotelCard hotel={v} />
                  </SListItemContainer>
                ))}
              </SListContainer>
            </Article>
          </div>
          {isSignedIn ? (
            <div>
              <HotelForm
                formTitle="ホテルの追加"
                value={undefined}
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
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
  column-gap: 16px;
  row-gap: 16px;
`;

const SListItemContainer = styled.div`
  flex: 0 0 300px;
  width: 300px;
  @media screen and (max-width: 767px) {
    flex: 0 0 auto;
    width: 100%;
  }
`;
