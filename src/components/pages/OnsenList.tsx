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
import Article from "../organisims/Article";

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
      await postOnsen({
        ...onsen,
        springQuality: onsen.springQualityUser,
        chemicals: {
          naIon: onsen.chemicals.includes("NaIon"),
          caIon: onsen.chemicals.includes("CaIon"),
          mgIon: onsen.chemicals.includes("MgIon"),
          clIon: onsen.chemicals.includes("ClIon"),
          hco3Ion: onsen.chemicals.includes("HCO3Ion"),
          so4Ion: onsen.chemicals.includes("SO4Ion"),
          co2Ion: onsen.chemicals.includes("CO2"),
          feIon: onsen.chemicals.includes("FeIon"),
          hIon: onsen.chemicals.includes("HIon"),
          iIon: onsen.chemicals.includes("IIon"),
          s: onsen.chemicals.includes("S"),
          rn: onsen.chemicals.includes("Rn"),
        },
      });
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
