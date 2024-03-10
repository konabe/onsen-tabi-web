import { text } from "../../../domain/models/display/text";
import { ChemicalTagModel } from "../../../domain/models/onsen/chemicalTagModel";
import Tag from "../../atoms/Tag";

type Props = {
  chemical: ChemicalTagModel;
  isOmitted: boolean;
};

const ChemicalTag: React.FC<Props> = ({ chemical, isOmitted }) => {
  const hexColor = new ChemicalTagModel(chemical.value).getImageColor();
  const displayingText = text(chemical, isOmitted ?? false) ?? "";
  return <Tag text={displayingText} hexColor={hexColor} />;
};

export default ChemicalTag;
