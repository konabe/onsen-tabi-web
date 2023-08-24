import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import headerCoverJpg from "../../header_cover.jpg";
import {
  OnsenResponse,
  getFormText,
  getLiquidText,
  getOnsen,
  getOsmoticPressureText,
  putOnsenDescription,
} from "../../infrastructure/api/OnsenApiModel";
import styled from "styled-components";
import { getToken } from "../../infrastructure/LocalStorage";
const OnsenDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [onsen, setOnsen] = useState<OnsenResponse | undefined>(undefined);
  const [description, setDescription] = useState<string>("");

  const splittedDescription: string[] = (onsen?.description ?? "").split("\n");
  const isSignedIn = getToken() !== null;

  const onClickChangeTextButton = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // e.preventDefault();
    await putOnsenDescription(Number(id), description);
    (async () => {
      try {
        // setIsLoading(true);
        await Promise.all([
          (async () => {
            const onsen = await getOnsen(Number(id));
            setOnsen(onsen);
            setDescription(onsen.description);
          })(),
        ]);
        // setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const onsen = await getOnsen(Number(id));
            setOnsen(onsen);
            setDescription(onsen.description);
          })(),
        ]);
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  }, [id, navigate]);

  return (
    <div>
      {isLoading ? (
        <div>ローディング中 ...</div>
      ) : (
        <>
          <h1>{onsen?.name}</h1>
          <img src={headerCoverJpg} alt={onsen?.name + "の画像"}></img>
          {splittedDescription.map((v) => (
            <p key={v}>{v}</p>
          ))}
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
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols={50}
                rows={10}
              ></textarea>
              <button type="button" onClick={onClickChangeTextButton}>
                説明変更
              </button>
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
