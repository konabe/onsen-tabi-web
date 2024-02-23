import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import headerCoverJpg from "../../header_cover.jpg";
import {
  getFormText,
  getLiquidText,
  getOsmoticPressureText,
} from "../../share/onsen";
import styled from "styled-components";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import Description from "../molecules/Description";
import OnsenForm from "../organisims/OnsenForm";
import { OnsenModel } from "../../share/onsen";
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

  const [onsen, setOnsen] = useState<OnsenModel | undefined>(undefined);

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const onsenResponse = await onsenRepository.read(Number(id));
          setOnsen({
            ...onsenResponse,
            chemicals: onsenResponse?.quality?.chemicals ?? [],
            springQuality: onsenResponse?.quality?.name ?? "",
            springQualityUser: onsenResponse?.springQuality ?? "",
          });
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };

  const onOnsenSubmitClick = async (onsen: OnsenModel) => {
    try {
      await onsenRepository.update(Number(id), {
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
                </Info>
                <Info>
                  <InfoTitle>液性</InfoTitle>
                  <span>
                    {onsen?.liquid != null
                      ? getLiquidText(onsen.liquid)
                      : "情報なし"}
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
                {onsen?.isDayUse != null ? (
                  <Info>
                    <InfoTitle>日帰り入浴</InfoTitle>
                    <span>{onsen.isDayUse ? "あり" : "なし"}</span>
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
  flex-direction: row;
  gap: 8px;
`;

const InfoTitle = styled.span`
  font-weight: 700;
`;

const ChemicalTagContainer = styled.span`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
