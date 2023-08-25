import { Link } from "react-router-dom";
import { Prefecture } from "../../share/prefecture";
import styled from "styled-components";

type Props = {
  areas: { id: number; name: string; prefecture: string }[];
  prefectures: Record<string, Prefecture>;
};

const OnsenAreaList: React.FC<Props> = ({ areas, prefectures }) => {
  let areasByPrefecture: Record<string, { id: number; name: string }[]> = {};
  areas.forEach((area) => {
    if (areasByPrefecture[area.prefecture] === undefined) {
      areasByPrefecture[area.prefecture] = [area];
      return;
    }
    areasByPrefecture[area.prefecture].push(area);
  });
  return (
    <Container>
      {Object.keys(prefectures).map((prefectureKey) => {
        const areas = areasByPrefecture[prefectureKey];
        if (areas === undefined) {
          return undefined;
        }
        return (
          <SPrefectureOnsenContainer key={prefectureKey}>
            <SPrefectureContainer>{prefectureKey}</SPrefectureContainer>
            <OnsenListContainer>
              {areas.map((area) => (
                <div key={area.id}>
                  <Link to={`/area/${area.id}`}>{area.name}温泉</Link>
                </div>
              ))}
            </OnsenListContainer>
          </SPrefectureOnsenContainer>
        );
      })}
    </Container>
  );
};

export default OnsenAreaList;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;

const SPrefectureOnsenContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

const SPrefectureContainer = styled.div`
  font-weight: 700;
  width: 80px;
`;

const OnsenListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 10px;
  row-gap: 0px;
`;
