import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getOnsens,
  OnsenResponse,
} from "../../infrastructure/api/OnsenApiModel";

const OnsenList: React.FC = () => {
  const [onsens, setOnsens] = useState<OnsenResponse[]>([]);
  useEffect(() => {
    (async () => {
      (async () => {
        const onsens = await getOnsens();
        setOnsens(onsens);
      })();
    })();
  }, []);
  return (
    <>
      <h1>♨温泉一覧</h1>
      {onsens.map((v) => (
        <div key={v.id}>
          <Link to={`/onsen/${v.id}`}>{v.name}</Link>
        </div>
      ))}
    </>
  );
};

export default OnsenList;
