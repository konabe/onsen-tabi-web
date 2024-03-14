import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffectOnce } from "react-use";
import styled from "styled-components";

import { CommonPageProps } from "../../App";
import { AreaEntity } from "../../domain/models/area";
import { IAreaRepository } from "../../domain/repositoryInterfaces/areaRepositoryInterface";
import { prefectures } from "../../share/prefecture";
import Loading from "../atoms/Loading";
import MyHelmet from "../atoms/MyHelmet";
import AreaForm from "../organisims/AreaForm";
import Article from "../organisims/Article";
import OnsenAreaList from "../organisims/OnsenAreaList";

type HomeDependencies = {
  dependencies: {
    areaRepository: IAreaRepository;
  };
};

const Home: React.FC<CommonPageProps & HomeDependencies> = ({
  isSignedIn,
  dependencies: { areaRepository },
}) => {
  const navigate = useNavigate();
  const [areas, setAreas] = useState<AreaEntity[]>([]);
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
          const areas = await areaRepository.readAll();
          setAreas(areas);
        })(),
      ]);
    } catch {
      navigate("/error");
    }
  };
  const onAreaSubmitClick = async (area: AreaEntity) => {
    try {
      await areaRepository.create(area);
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
    <SContents>
      <MyHelmet title={""} />
      <div>
        <Article emoji="📌" title="お知らせ">
          {noticeSentences.map((v, i) => (
            <p key={i}>{v}</p>
          ))}
        </Article>
      </div>
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <Article emoji="🏞️" title="温泉エリア一覧">
            <div>
              <OnsenAreaList
                areas={areas.filter((v) => isSignedIn || v.onsenIds.length > 0)}
                prefectures={prefectures()}
              />
            </div>
          </Article>
        )}
      </div>
      {isSignedIn ? (
        <div>
          <AreaForm value={undefined} onSubmitClick={onAreaSubmitClick} />
        </div>
      ) : undefined}
    </SContents>
  );
};

export default Home;

const SContents = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 32px;
`;
