import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  OnsenResponse,
  getOnsen,
  putOnsenDescription,
} from "../../infrastructure/api";

import headerCoverJpg from "../../header_cover.jpg";
const Hotel: React.FC = () => {
  const { id } = useParams();
  const [onsen, setOnsen] = useState<OnsenResponse | undefined>(undefined);
  const [description, setDescription] = useState<string>("");
  const splittedDescription: string[] = (onsen?.description ?? "").split("\n");
  const onClickButton = () => putOnsenDescription(Number(id), description);
  useEffect(() => {
    (async () => {
      const onsen = await getOnsen(Number(id));
      setOnsen(onsen);
      setDescription(onsen.description);
    })();
  }, []);

  return (
    <div>
      <h1>{onsen?.name}</h1>
      <img src={headerCoverJpg}></img>
      {splittedDescription.map((v) => (
        <p key={v}>{v}</p>
      ))}
      <h1>温泉データ</h1>
      <h2>泉質</h2>
      <p>{onsen?.sprintQuality}</p>
      <h2>液性</h2>
      <p>{onsen?.liquid}</p>
      <h2>浸透圧</h2>
      <p>{onsen?.ostomicPressure}</p>
      <h2>その他</h2>
      <p>{onsen?.form}</p>
      <form style={{ marginTop: 20 }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols={50}
          rows={10}
        ></textarea>
        <button onClick={onClickButton}>説明変更</button>
      </form>
    </div>
  );
};

export default Hotel;
