import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getOnsens,
  OnsenResponse,
} from "../../infrastructure/api/OnsenApiModel";

const OnsenList: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [onsens, setOnsens] = useState<OnsenResponse[]>([]);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const onsens = await getOnsens();
            setOnsens(onsens);
          })(),
        ]);
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  }, [navigate]);

  return (
    <>
      <h1>♨温泉一覧</h1>
      {isLoading ? (
        <div>ローディング中 ...</div>
      ) : (
        onsens.map((v) => (
          <div key={v.id}>
            <Link to={`/onsen/${v.id}`}>{v.name}</Link>
          </div>
        ))
      )}
    </>
  );
};

export default OnsenList;
