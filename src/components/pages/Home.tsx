import { useState } from "react";
import { AreaResponse, getAreas } from "../../infrastructure/api/AreaApiModel";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "../organisims/OnsenAreaList";
import HotelForm from "../organisims/HotelForm";
import OnsenForm from "../organisims/OnsenForm";
import { getToken } from "../../infrastructure/LocalStorage";
import { useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<AreaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSignedIn = getToken() !== null;

  useEffectOnce(() => {
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
  });

  return (
    <div>
      <SNotice>
        <h1>📌 お知らせ</h1>
        <p>当サイトへようこそ。</p>
        <p>温泉巡りに出会ってから月１以上は温泉旅行に行くようになりました。</p>
        <p>
          しかし、温泉巡りに関するユーザー投稿型のサイトはなかなか存在せず、自分で作ってしまえと思ったのがこのサイトです。
        </p>
        <p>
          現在は、管理人が訪れた温泉の記録しかできませんが、ゆくゆくはユーザーの評価やコメント、ユーザーの旅行記録機能等、温泉旅という趣味をより楽しめるサイトを目指していきます。
        </p>
        <p>
          ※現在はβ版のため、機能の安定性は保証いたしません。ご了承ください。
        </p>
      </SNotice>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1>🏞 温泉エリア一覧</h1>
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

const SNotice = styled.div`
  margin-bottom: 40px;
`;
