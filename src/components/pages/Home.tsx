import { useState } from "react";
import {
  AreaResponse,
  getAreas,
  postArea,
} from "../../infrastructure/api/AreaApiModel";
import { prefectures } from "../../share/prefecture";
import OnsenAreaList from "../organisims/OnsenAreaList";
import Head from "../atoms/Head";
import { useNavigate } from "react-router-dom";
import Loading from "../atoms/Loading";
import { useEffectOnce } from "react-use";
import styled from "styled-components";
import { CommonPageProps } from "../../App";
import AreaForm from "../organisims/AreaForm";
import { AreaModel } from "../../share/area";

const Home: React.FC<CommonPageProps> = ({ isSignedIn }) => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<AreaResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const noticeSentences = [
    "当サイトへようこそ。",
    "温泉巡りに出会ってから月１以上は温泉旅行に行くようになりました。",
    "しかし、温泉巡りに関するユーザー投稿型のサイトはなかなか存在せず、それなら自分で作ってしまえと思い作ったのがこのサイトです。",
    "現在は、管理人が訪れた温泉の記録しかできませんが、ゆくゆくはユーザーの評価やコメント、ユーザーの旅行記録機能等、温泉旅という趣味をより楽しめるサイトを目指していきます。",
    "※現在はβ版のため、機能の安定性は保証いたしません。ご了承ください。",
  ];

  const loadPage = async () => {
    try {
      await Promise.all([
        (async () => {
          const areas = await getAreas();
          setAreas(areas);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };
  const onAreaSubmitClick = async (area: AreaModel) => {
    try {
      await postArea(area);
      loadPage();
    } catch {
      navigate("/error");
    }
  };

  useEffectOnce(() => {
    (async () => {
      setIsLoading(true);
      await loadPage();
      setIsLoading(false);
    })();
  });

  return (
    <div>
      <SNotice>
        <Head emoji="📌" title="お知らせ" />
        {noticeSentences.map((v, i) => (
          <p key={i}>{v}</p>
        ))}
      </SNotice>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Head emoji="🏞" title="温泉エリア一覧" />
          <OnsenAreaList
            areas={areas.filter((v) => isSignedIn || v.onsenIds.length > 0)}
            prefectures={prefectures()}
          />
        </>
      )}
      {isSignedIn ? <AreaForm onSubmitClick={onAreaSubmitClick} /> : undefined}
    </div>
  );
};

export default Home;

const SNotice = styled.div`
  margin-bottom: 40px;
`;
