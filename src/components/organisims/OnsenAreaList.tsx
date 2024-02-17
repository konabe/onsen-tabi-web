import { Link } from "react-router-dom";
import styled from "styled-components";
import { Prefecture } from "../../share/prefecture";
import { AreaEntity } from "../../domain/models/area";
import React from "react";

type AreaLinkViewModel = { areaId: number; name: string };

type Props = {
  areas: AreaEntity[];
  prefectures: Record<string, Prefecture>;
};

const OnsenAreaList: React.FC<Props> = ({ areas, prefectures }) => {
  let areasByPrefecture: Record<string, AreaLinkViewModel[]> = {};
  areas.forEach((area) => {
    const areaLinkViewModel: AreaLinkViewModel = {
      areaId: area.id,
      name: area.name,
    };
    if (areasByPrefecture[area.prefecture] === undefined) {
      areasByPrefecture[area.prefecture] = [areaLinkViewModel];
      return;
    }
    areasByPrefecture[area.prefecture].push(areaLinkViewModel);
  });

  const AreaLink: React.FC<AreaLinkViewModel> = ({ areaId, name }) => {
    return (
      <div>
        <Link to={`/area/${areaId}`}>{name}温泉</Link>
      </div>
    );
  };

  const PrefectureRow: React.FC<{
    prefecture: string;
    areaLinks: AreaLinkViewModel[];
  }> = ({ prefecture, areaLinks }) => {
    return (
      <SPrefectureOnsenContainer>
        <SPrefectureContainer>{prefecture}</SPrefectureContainer>
        <SOnsenListContainer>
          {areaLinks.map((areaLink) => (
            <AreaLink
              key={areaLink.areaId}
              areaId={areaLink.areaId}
              name={areaLink.name}
            />
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
            areaLinks={areaLinks}
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
