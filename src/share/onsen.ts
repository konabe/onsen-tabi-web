export type LiquidValueOption =
  | "acidic"
  | "mildly_acidic"
  | "neutral"
  | "mildly_alkaline"
  | "alkaline";
export type OsmoticPressureOption = "hypotonic" | "isotonic" | "hypertonic";
export type FormOption = "uchiyu" | "sotoyu";

export type OnsenModel = {
  name: string;
  springQuality: string;
  liquid: LiquidValueOption | null;
  osmoticPressure: OsmoticPressureOption | null;
  form: FormOption;
  isDayUse: boolean | undefined;
  url: string;
  description: string;
};
