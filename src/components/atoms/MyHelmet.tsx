import { Helmet } from "react-helmet";

const MyHelmet: React.FC<{ title: string }> = ({ title }) => {
  const siteName = "静かに温泉旅がしたい！";
  const specificTitle = title !== "" ? `${title} | ` : "";
  return (
    <Helmet>
      <title>
        {specificTitle}
        {siteName}
      </title>
    </Helmet>
  );
};

export default MyHelmet;
