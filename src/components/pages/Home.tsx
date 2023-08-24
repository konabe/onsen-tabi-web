import { useEffect, useState } from "react";
import { AreaResponse, getAreas } from "../../infrastructure/api/AreaApiModel";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "../organisims/OnsenAreaList";
import HotelForm from "../organisims/HotelForm";
import OnsenForm from "../organisims/OnsenForm";
import { getToken } from "../../infrastructure/LocalStorage";
import { useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<AreaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isSignedIn = getToken() !== null;

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        await Promise.all([
          (async () => {
            const areas = await getAreas();
            setAreas(areas);
          })(),
        ]);
        setIsLoading(false);
      } catch {
        navigate("/error");
      }
    })();
  }, [navigate]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>🏞温泉エリア一覧</h1>
          <OnsenAreaList areas={areas} prefectures={prefectures()} />
          {isSignedIn ? (
            <>
              <HotelForm />
              <OnsenForm />
            </>
          ) : undefined}
        </>
      )}
    </div>
  );
};

export default Home;
