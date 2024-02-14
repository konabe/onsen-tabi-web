import { Chemical, chemicalDictionary } from "../../../share/onsen";
import Tag from "../../atoms/Tag";

type Props = {
  chemical: Chemical;
};

const ChemicalTag: React.FC<Props> = ({ chemical }) => {
  const colorDictionary: Record<Chemical, string> = {
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
    Rn: "#6c757d",
  };
  const hexColor = colorDictionary[chemical];
  return <Tag text={chemicalDictionary[chemical]} hexColor={hexColor} />;
};

export default ChemicalTag;
