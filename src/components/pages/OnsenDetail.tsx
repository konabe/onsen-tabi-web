import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import { CommonPageProps } from "../../App";
import { OnsenEntity } from "../../domain/models/onsen";
import { ChemicalTagModel } from "../../domain/models/onsen/chemicalTagModel";
import { OnsenRepository } from "../../infrastructure/repositories/onsenRepository";
import { grey2 } from "../atoms/colors";
import Loading from "../atoms/Loading";
import Description from "../molecules/Description";
import ChemicalTag from "../molecules/onsen/ChemicalTag";
import Article from "../organisims/Article";
import OnsenForm from "../organisims/OnsenForm";
import RelatedContents from "../organisims/RelatedContents";

const OnsenDetail: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const onsenRepository = new OnsenRepository();

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [onsen, setOnsen] = useState<OnsenEntity | undefined>(undefined);
  const simillarSearchLink = `/onsens?chemicals=${onsen
    ?.getChemicalTags()
    .join(",")}`;
  const imageURL = onsen?.imgURL ?? "/img/onsen_default.png";
  const imageAlt =
    onsen?.imgURL !== undefined ? onsen.name + "の画像" : "温泉のイメージ画像";

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
              <TopContentsContainer>
                <TopContentsMainContainer>
                  <OnsenImg src={imageURL} alt={imageAlt} />
                </TopContentsMainContainer>
                <TopContentsSubContainer>
                  <div>
                    <Description text={onsen?.description ?? ""} />
                  </div>
                  <div>
                    <RelatedContents title="温泉データ">
                      <InfoContainer>
                        <Info>
                          <InfoTitle>泉質</InfoTitle>
                          <InfoValueContainer>
                            {onsen?.getQualityText() ?? "情報なし"}
                          </InfoValueContainer>
                        </Info>
                        <Info>
                          <InfoTitle>成分タグ</InfoTitle>
                          <InfoValueContainer>
                            <ChemicalTagContainer>
                              {onsen
                                ?.getChemicalTags()
                                .map((c) => (
                                  <ChemicalTag
                                    chemical={new ChemicalTagModel(c)}
                                    isOmitted={false}
                                    key={c}
                                  />
                                )) ?? "情報なし"}
                              <div>
                                <SimillaryOnsenAnchor href={simillarSearchLink}>
                                  類似の温泉を探す
                                </SimillaryOnsenAnchor>
                              </div>
                            </ChemicalTagContainer>
                          </InfoValueContainer>
                        </Info>
                        <Info>
                          <InfoTitle>浸透圧</InfoTitle>
                          <InfoValueContainer>
                            {onsen?.getOsmoticPressureText() ?? "情報なし"}
                          </InfoValueContainer>
                        </Info>
                        <Info>
                          <InfoTitle>液性</InfoTitle>
                          <InfoValueContainer>
                            {onsen?.getLiquidText() ?? "情報なし"}
                          </InfoValueContainer>
                        </Info>
                        <Info>
                          <InfoTitle>温度</InfoTitle>
                          <InfoValueContainer>
                            {onsen?.getTemperatureText() ?? "情報なし"}
                          </InfoValueContainer>
                        </Info>
                        <Info>
                          <InfoTitle>営業形態</InfoTitle>
                          <InfoValueContainer>
                            {onsen?.getFormText() ?? "情報なし"}
                          </InfoValueContainer>
                        </Info>
                        {onsen?.isDayUse ?? false ? (
                          <Info>
                            <InfoTitle>日帰り入浴</InfoTitle>
                            <InfoValueContainer>あり</InfoValueContainer>
                          </Info>
                        ) : undefined}
                        <Info>
                          <InfoTitle>外部サイト</InfoTitle>
                          <InfoValueContainer>
                            {onsen?.url === "" ? (
                              "情報なし"
                            ) : (
                              <a
                                href={onsen?.url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                {onsen?.url}
                              </a>
                            )}
                          </InfoValueContainer>
                        </Info>
                      </InfoContainer>
                    </RelatedContents>
                  </div>
                </TopContentsSubContainer>
              </TopContentsContainer>
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

const TopContentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  column-gap: 48px;
  @media screen and (max-width: 979px) {
    flex-direction: column;
  }
`;

const TopContentsMainContainer = styled.div`
  flex-grow: 0;
  min-width: 400px;
  max-width: 800px;
  @media screen and (max-width: 979px) {
    min-width: 100%;
  }
`;

const TopContentsSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  @media screen and (max-width: 979px) {
    margin-top: 20px;
  }

  flex-grow: 1;
`;

const OnsenImg = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-top: 16px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 64px;
  @media screen and (max-width: 767px) {
    gap: 16px;
  }

  padding-bottom: 2px;
  border-bottom: 2px solid ${grey2};
`;

const InfoTitle = styled.div`
  flex-shrink: 0;
  width: 5em;
  text-align: left;
  font-weight: 700;
`;

const InfoValueContainer = styled.div``;

const ChemicalTagContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`;

const SimillaryOnsenAnchor = styled.a`
  font-size: 12px;
`;
