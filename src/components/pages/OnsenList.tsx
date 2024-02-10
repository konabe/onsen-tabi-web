import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getOnsens,
  OnsenResponse,
  postOnsen,
} from "../../infrastructure/api/OnsenApiModel";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import OnsenForm from "../organisims/OnsenForm";
import { OnsenModel } from "../../share/onsen";
import { CommonPageProps } from "../../App";
import Head from "../atoms/Head";

const OnsenList: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [onsens, setOnsens] = useState<OnsenResponse[]>([]);

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const onsens = await getOnsens();
          setOnsens(onsens);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onOnsenSubmitClick = async (onsen: OnsenModel) => {
    try {
      await postOnsen(onsen);
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
          <Head emoji="♨" title="温泉一覧" />
          <SListContainer>
            {onsens.map((v) => (
              <div key={v.id}>
                <Link to={`/onsen/${v.id}`}>{v.name}</Link>
              </div>
            ))}
          </SListContainer>
          {isSignedIn ? (
            <>
              <OnsenForm
                formTitle="温泉の追加"
                onSubmitClick={onOnsenSubmitClick}
              />
            </>
          ) : undefined}
        </>
      )}
    </>
  );
};

export default OnsenList;

const SListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4px;
`;
