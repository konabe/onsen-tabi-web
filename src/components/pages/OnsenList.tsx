import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import { CommonPageProps } from "../../App";
import { AreaEntity } from "../../domain/models/area";
import { OnsenEntity } from "../../domain/models/onsen";
import { ChemicalOption } from "../../domain/models/onsen/chemical";
import { ChemicalTagOption } from "../../domain/models/onsen/chemicalTagModel";
import { IAreaRepository } from "../../domain/repositoryInterfaces/areaRepositoryInterface";
import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import Loading from "../atoms/Loading";
import MyHelmet from "../atoms/MyHelmet";
import Select from "../atoms/Select";
import Article from "../organisims/Article";
import OnsenCard from "../organisims/OnsenCard";
import OnsenForm from "../organisims/OnsenForm";

type OnsenListDependencies = {
  dependencies: {
    onsenRepository: IOnsenRepository;
    areaRepository: IAreaRepository;
  };
};

const OnsenList: React.FC<CommonPageProps & OnsenListDependencies> = ({
  isSignedIn,
  dependencies: { onsenRepository, areaRepository },
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [onsens, setOnsens] = useState<OnsenEntity[]>([]);
  const [areas, setAreas] = useState<AreaEntity[]>([]);

  const [chemicals, setChemicals] = useState<ChemicalTagOption[]>([]);
  const chemicalsValueOptions: {
    value: ChemicalTagOption;
    label: string;
  }[] = [
    { value: "NaIon", label: "ナトリウムイオン" },
    { value: "CaIon", label: "カルシウムイオン" },
    { value: "MgIon", label: "マグネシウムイオン" },
    { value: "ClIon", label: "塩化物イオン" },
    { value: "HCO3Ion", label: "炭酸水素イオン" },
    { value: "SO4Ion", label: "硫酸イオン" },
    { value: "CO2", label: "二酸化炭素" },
    { value: "FeIon", label: "鉄イオン" },
    { value: "HIon", label: "水素イオン" },
    { value: "IIon", label: "ヨウ素イオン" },
    { value: "S", label: "硫黄" },
    { value: "Rn", label: "ラドン" },
    { value: "Simple", label: "単純温泉" },
  ];
  const chemicalsCurrentValue = chemicals?.map((v) =>
    chemicalsValueOptions.find((c) => c.value === v)
  );

  const displayingOnsens = onsens.filter((onsen) => {
    if (chemicals.length === 0) {
      return true;
    }
    return chemicals.every((c) => onsen.getChemicalTags().includes(c));
  });

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const onsens = await onsenRepository.readAll();
          setOnsens(onsens);
        })(),
        (async () => {
          const areas = await areaRepository.readAll();
          setAreas(areas);
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
    setChemicals(
      (searchParams.get("chemicals")?.split(",") ?? []) as ChemicalOption[]
    );
    (async () => {
      setIsLoading(true);
      await loadPage();
      setIsLoading(false);
    })();
  });

  return (
    <SContents>
      <MyHelmet title="温泉一覧" />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            <Article emoji="♨" title="温泉一覧">
              <FilterContainer>
                <Select
                  name="chemicals"
                  label="成分タグ"
                  options={chemicalsValueOptions}
                  value={chemicalsCurrentValue}
                  isMulti={true}
                  defaultValue={[]}
                  onChange={(v) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: 型情報を定義したい
                    setChemicals(v.map((c: any) => c.value));
                    if (v.length === 0) {
                      setSearchParams({});
                      return;
                    }
                    setSearchParams({
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- TODO: 型情報を定義したい
                      chemicals: v.map((c: any) => c.value).join(","),
                    });
                  }}
                />
              </FilterContainer>
              <SListContainer>
                {displayingOnsens.map((v) => (
                  <SListItemContainer key={v.id.value}>
                    <OnsenCard onsen={v} />
                  </SListItemContainer>
                ))}
              </SListContainer>
            </Article>
          </div>
          {isSignedIn ? (
            <div>
              <OnsenForm
                formTitle="温泉の追加"
                value={undefined}
                areas={areas}
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

const FilterContainer = styled.div`
  margin-top: 12px;
  margin-bottom: 36px;
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
