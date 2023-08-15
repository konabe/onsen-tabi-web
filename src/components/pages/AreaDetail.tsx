import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AreaResponse, getArea } from "../../infrastructure/api";

const AreaDetail: React.FC = () => {
  const { id } = useParams();
  const [area, setArea] = useState<AreaResponse | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const area = await getArea(Number(id));
      setArea(area);
    })();
  }, []);
  return <div>{area?.name}</div>;
};

export default AreaDetail;
