import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
const OnsenDetail: React.FC = () => {
  const { id } = useParams();
  const [onsen, setOnsen] = useState<OnsenResponse | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const splittedDescription: string[] = (onsen?.description ?? "").split("\n");
  const onClickButton = () => putOnsenDescription(Number(id), description);
  useEffect(() => {
    (async () => {
      const onsen = await getOnsen(Number(id));
      setOnsen(onsen);
      setDescription(onsen.description);
    })();
  }, [id]);

  return (
    <div>
      {onsen !== undefined ? (
        <>
          <h1>{onsen.name}</h1>
          <img src={headerCoverJpg} alt={onsen?.name + "の画像"}></img>
          {splittedDescription.map((v) => (
            <p key={v}>{v}</p>
          ))}
          <h1>温泉データ</h1>
          <a href={onsen.url} target="_blank" rel="noreferrer">
            リンク
          </a>
          <Info>
            <InfoTitle>泉質</InfoTitle>
            <span>{onsen.springQuality}</span>
          </Info>
          <Info>
            <InfoTitle>液性</InfoTitle>
            <span>
              {onsen.liquid !== null ? getLiquidText(onsen.liquid) : "情報なし"}
            </span>
          </Info>
          <Info>
            <InfoTitle>浸透圧</InfoTitle>
            <span>
              {onsen.osmoticPressure !== null
                ? getOsmoticPressureText(onsen.osmoticPressure)
                : "情報なし"}
            </span>
          </Info>
          <Info>
            <InfoTitle>営業形態</InfoTitle>
            <span>
              {onsen.form !== null ? getFormText(onsen.form) : "情報なし"}
            </span>
          </Info>
          <form style={{ marginTop: 20 }}>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols={50}
              rows={10}
            ></textarea>
            <button onClick={onClickButton}>説明変更</button>
          </form>
        </>
      ) : (
        <div>Not Found</div>
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
