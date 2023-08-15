import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AreaResponse, getArea } from "../../infrastructure/api/AreaApiModel";

const AreaDetail: React.FC = () => {
  const { id } = useParams();
  const [area, setArea] = useState<AreaResponse | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const area = await getArea(Number(id));
      setArea(area);
    })();
  }, [id]);
  return (
    <div>
      <h1>{area?.name + "温泉"}</h1>
      <p>{area?.prefecture}</p>
      <a href={area?.url} target="_blank" rel="noreferrer">
        リンク
      </a>
    </div>
  );
};

export default AreaDetail;
