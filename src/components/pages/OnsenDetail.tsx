import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import headerCoverJpg from "../../header_cover.jpg";
import styled from "styled-components";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import Description from "../molecules/Description";
import OnsenForm from "../organisims/OnsenForm";
import { OnsenEntity } from "../../domain/models/onsen";
import { CommonPageProps } from "../../App";
import ChemicalTag from "../molecules/onsen/ChemicalTag";
import Article from "../organisims/Article";
import RelatedContents from "../organisims/RelatedContents";
import { OnsenRepository } from "../../infrastructure/repositories/onsenRepository";

const OnsenDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const onsenRepository = new OnsenRepository();

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [onsen, setOnsen] = useState<OnsenEntity | undefined>(undefined);
  const simillarSearchLink = `/onsens?chemicals=${onsen?.chemicals.join(",")}`;

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const onsenEntity = await onsenRepository.read(Number(id));
          setOnsen(onsenEntity);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onOnsenSubmitClick = async (onsen: OnsenEntity) => {
    try {
      await onsenRepository.update(Number(id), onsen);
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
            <Article emoji="♨" title={`${onsen?.name}`}>
              <img src={headerCoverJpg} alt={onsen?.name + "の画像"}></img>
              <Description text={onsen?.description ?? ""} />
              <RelatedContents title="温泉データ">
                <a href={onsen?.url} target="_blank" rel="noreferrer">
                  リンク
                </a>
                <Info>
                  <InfoTitle>泉質</InfoTitle>
                  <span>
                    {onsen?.springQuality}{" "}
                    {onsen?.springQualityUser !== ""
                      ? `(${onsen?.springQualityUser})`
                      : ""}
                  </span>
                </Info>
                <Info>
                  <InfoTitle>成分タグ</InfoTitle>
                  <span>
                    <ChemicalTagContainer>
                      {onsen?.chemicals.map((c) => (
                        <ChemicalTag chemical={c} key={c} />
                      )) ?? "情報なし"}
                    </ChemicalTagContainer>
                  </span>
                  <SimillaryOnsenAnchor href={simillarSearchLink}>
                    類似の温泉を探す
                  </SimillaryOnsenAnchor>
                </Info>
                <Info>
                  <InfoTitle>液性</InfoTitle>
                  <span>{onsen?.getLiquidText() ?? "情報なし"}</span>
                </Info>
                <Info>
                  <InfoTitle>浸透圧</InfoTitle>
                  <span>{onsen?.getOsmoticPressureText() ?? "情報なし"}</span>
                </Info>
                <Info>
                  <InfoTitle>営業形態</InfoTitle>
                  <span>{onsen?.getFormText() ?? "情報なし"}</span>
                </Info>
                {onsen?.isDayUse ?? false ? (
                  <Info>
                    <InfoTitle>日帰り入浴</InfoTitle>
                    <span>あり</span>
                  </Info>
                ) : undefined}
              </RelatedContents>
            </Article>
          </div>
          {isSignedIn ? (
            <div>
              <OnsenForm value={onsen} onSubmitClick={onOnsenSubmitClick} />
            </div>
          ) : undefined}
        </>
      )}
    </SContents>
  );
};

export default OnsenDetail;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;

const Info = styled.span`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  gap: 8px;
`;

const InfoTitle = styled.span`
  font-weight: 700;
`;

const ChemicalTagContainer = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 8px;
`;

const SimillaryOnsenAnchor = styled.a`
  font-size: 12px;
`;
