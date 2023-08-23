import { Link } from "react-router-dom";
import { Prefecture } from "../../share/prefecture";

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
    <div>
      {Object.keys(prefectures).map((prefectureKey) => {
        const areas = areasByPrefecture[prefectureKey];
        if (areas === undefined) {
          return undefined;
        }
        return (
          <div key={prefectureKey}>
            <div style={{ fontWeight: "bold" }}>{prefectureKey}</div>
            <div style={{ display: "flex" }}>
              {areas.map((area) => (
                <div key={area.id} style={{ marginRight: "10px" }}>
                  <Link to={`/area/${area.id}`}>{area.name}温泉</Link>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OnsenAreaList;
