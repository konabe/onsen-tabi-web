import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import headerCoverJpg from "../../header_cover.jpg";
import {
  OnsenResponse,
  getFormText,
  getLiquidText,
  getOnsen,
  getOsmoticPressureText,
  putOnsen,
} from "../../infrastructure/api/OnsenApiModel";
import styled from "styled-components";
import { getToken } from "../../infrastructure/LocalStorage";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import Description from "../molecules/Description";
import OnsenForm from "../organisims/OnsenForm";
import { OnsenModel } from "../../share/onsen";
const OnsenDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [onsen, setOnsen] = useState<OnsenResponse | undefined>(undefined);

  const isSignedIn = getToken() !== null;

  const loadPage = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        (async () => {
          const onsen = await getOnsen(Number(id));
          setOnsen(onsen);
        })(),
      ]);
      setIsLoading(false);
    } catch {
      navigate("/error");
    }
  };

  const onOnsenSubmitClick = async (onsen: OnsenModel) => {
    try {
      await putOnsen(Number(id), onsen);
      if (onsen !== undefined) {
        setOnsen({ ...onsen, id: Number(id) });
      }
    } catch {
      navigate("/error");
    }
  };

  useEffectOnce(() => {
    (async () => {
      loadPage();
    })();
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>{`♨ ${onsen?.name}`}</h1>
          <img src={headerCoverJpg} alt={onsen?.name + "の画像"}></img>
          <Description text={onsen?.description ?? ""} />
          <h2>温泉データ</h2>
          <a href={onsen?.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          <Info>
            <InfoTitle>泉質</InfoTitle>
            <span>{onsen?.springQuality}</span>
          </Info>
          <Info>
            <InfoTitle>液性</InfoTitle>
            <span>
              {onsen?.liquid != null ? getLiquidText(onsen.liquid) : "情報なし"}
            </span>
          </Info>
          <Info>
            <InfoTitle>浸透圧</InfoTitle>
            <span>
              {onsen?.osmoticPressure != null
                ? getOsmoticPressureText(onsen.osmoticPressure)
                : "情報なし"}
            </span>
          </Info>
          <Info>
            <InfoTitle>営業形態</InfoTitle>
            <span>
              {onsen?.form != null ? getFormText(onsen.form) : "情報なし"}
            </span>
          </Info>
          {isSignedIn ? (
            <div style={{ marginTop: 20 }}>
              <OnsenForm value={onsen} onSubmitClick={onOnsenSubmitClick} />
            </div>
          ) : undefined}
        </>
      )}
    </div>
  );
};

export default OnsenDetail;

const Info = styled.span`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const InfoTitle = styled.span`
  font-weight: 700;
`;
