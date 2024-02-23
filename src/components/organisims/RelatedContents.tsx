import SubHead from "../atoms/SubHead";

const RelatedContents: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <div>
      <SubHead title={title} />
      {children}
    </div>
  );
};

export default RelatedContents;
