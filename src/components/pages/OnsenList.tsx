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
                  <div key={v.id}>
                    <Link to={`/onsen/${v.id}`}>{v.name}</Link>
                  </div>
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
  flex-direction: column;
  row-gap: 4px;
`;
