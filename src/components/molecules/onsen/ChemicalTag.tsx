import { text } from "../../../domain/models/display/text";
import {
  ChemicalTagModel,
  ChemicalTagOption,
} from "../../../domain/models/onsen/chemicalTagModel";
import Tag from "../../atoms/Tag";

type Props = {
  chemical: ChemicalTagModel;
  isOmitted?: boolean;
};

const ChemicalTag: React.FC<Props> = ({ chemical, isOmitted }) => {
  const colorDictionary: Record<ChemicalTagOption, string> = {
    NaIon: "#007bff",
    CaIon: "#28a745",
    MgIon: "#17a2b8",
    ClIon: "#ffc107",
    HCO3Ion: "#dc3545",
    SO4Ion: "#6610f2",
    CO2: "#6f42c1",
    FeIon: "#e83e8c",
    HIon: "#20c997",
    IIon: "#17a2b8",
    S: "#343a40",
    Rn: "#6c7500",
    Simple: "#6c757d",
  };
  const hexColor = colorDictionary[chemical.value];
  const displayingText = text(chemical, isOmitted ?? false) ?? "";
  return <Tag text={displayingText} hexColor={hexColor} />;
};

export default ChemicalTag;
