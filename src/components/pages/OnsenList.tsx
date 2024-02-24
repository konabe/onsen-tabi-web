import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import OnsenForm from "../organisims/OnsenForm";
import { OnsenEntity } from "../../domain/models/onsen";
import { CommonPageProps } from "../../App";
import Article from "../organisims/Article";
import { OnsenRepository } from "../../infrastructure/repositories/onsenRepository";
import OnsenCard from "../organisims/OnsenCard";

const OnsenList: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const onsenRepository = new OnsenRepository();

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [onsens, setOnsens] = useState<OnsenEntity[]>([]);

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const onsens = await onsenRepository.readAll();
          setOnsens(onsens);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onOnsenSubmitClick = async (onsen: OnsenEntity) => {
    try {
      await onsenRepository.create(onsen);
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
            <Article emoji="♨" title="温泉一覧">
              <SListContainer>
                {onsens.map((v) => (
                  <SListItemContainer>
                    <OnsenCard key={v.id} onsen={v} />
                  </SListItemContainer>
                ))}
              </SListContainer>
            </Article>
          </div>
          {isSignedIn ? (
            <div>
              <OnsenForm
                formTitle="温泉の追加"
                onSubmitClick={onOnsenSubmitClick}
              />
            </div>
          ) : undefined}
        </>
      )}
    </SContents>
  );
};

export default OnsenList;

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
