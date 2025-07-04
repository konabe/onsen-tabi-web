import React from "react";
import { Link } from "react-router";
import styled from "styled-components";

import { AreaEntity, AreaID } from "../../domain/models/area";
import { Prefecture } from "../../share/prefecture";

type Props = {
  areas: AreaEntity[];
  prefectures: Record<string, Prefecture>;
};

const OnsenAreaList: React.FC<Props> = ({ areas, prefectures }) => {
  const areasByPrefecture: Record<string, AreaEntity[]> = {};
  areas.forEach((area) => {
    if (areasByPrefecture[area.prefecture] === undefined) {
      areasByPrefecture[area.prefecture] = [area];
      return;
    }
    areasByPrefecture[area.prefecture]?.push(area);
  });

  const AreaLink: React.FC<{ area: AreaEntity }> = ({
    area,
  }: {
    area: AreaEntity;
  }) => {
    const areaID: AreaID = area.id;
    return (
      <div>
        <Link to={`/area/${areaID.value}`}>{area.displayingName()}</Link>
      </div>
    );
  };

  const PrefectureRow: React.FC<{
    prefecture: string;
    areas: AreaEntity[];
  }> = ({ prefecture, areas }) => {
    return (
      <SPrefectureOnsenContainer>
        <SPrefectureContainer>{prefecture}</SPrefectureContainer>
        <SOnsenListContainer>
          {areas.map((area: AreaEntity) => (
            <AreaLink key={area.id.value} area={area} />
          ))}
        </SOnsenListContainer>
      </SPrefectureOnsenContainer>
    );
  };

  return (
    <SContainer>
      {Object.keys(prefectures).map((prefectureKey) => {
        const areaLinks = areasByPrefecture[prefectureKey];
        if (areaLinks === undefined) {
          return undefined;
        }
        return (
          <PrefectureRow
            prefecture={prefectureKey}
            areas={areaLinks}
            key={prefectureKey}
          />
        );
      })}
    </SContainer>
  );
};

export default OnsenAreaList;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const SPrefectureOnsenContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const SPrefectureContainer = styled.div`
  flex-shrink: 0;
  width: 4em;

  font-weight: 700;
`;

const SOnsenListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 0px;
`;
