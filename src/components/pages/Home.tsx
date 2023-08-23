import { useEffect, useState } from "react";
import { AreaResponse, getAreas } from "../../infrastructure/api/AreaApiModel";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "../organisims/OnsenAreaList";
import HotelForm from "../organisims/HotelForm";
import OnsenForm from "../organisims/OnsenForm";
import { getToken } from "../../infrastructure/LocalStorage";

const Home: React.FC = () => {
  const [areas, setAreas] = useState<AreaResponse[]>([]);
  const isSignedIn = getToken() !== null;
  useEffect(() => {
    (async () => {
      (async () => {
        const areas = await getAreas();
        setAreas(areas);
      })();
    })();
  }, []);
  return (
    <div>
      <h1>🏞温泉エリア一覧</h1>
      {areas.length === 0 ? (
        <div>ローディング中 ...</div>
      ) : (
        <OnsenAreaList areas={areas} prefectures={prefectures()} />
      )}
      {isSignedIn ? (
        <>
          <HotelForm />
          <OnsenForm />
        </>
      ) : undefined}
    </div>
  );
};

export default Home;
