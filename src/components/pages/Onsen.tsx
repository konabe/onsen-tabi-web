import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OnsenResponse, getOnsen } from "../../infrastructure/api";

const Hotel: React.FC = () => {
  const { id } = useParams();
  const [onsen, setOnsen] = useState<OnsenResponse | undefined>(undefined);
  useEffect(() => {
    (async () => {
      const onsen = await getOnsen(Number(id));
      setOnsen(onsen);
    })();
  }, []);
  return (
    <div>
      <h1>{onsen?.name}</h1>
      <h2>泉質</h2>
      <p>{onsen?.sprintQuality}</p>
      <h2>液性</h2>
      <p>{onsen?.liquid}</p>
      <h2>浸透圧</h2>
      <p>{onsen?.ostomicPressure}</p>
      <h2>その他</h2>
      <p>{onsen?.form}</p>
    </div>
  );
};

export default Hotel;
