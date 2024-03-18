import { ValueObject } from "../../ddd";

export const FormOptions = ["uchiyu", "sotoyu"] as const;
export type FormOption = (typeof FormOptions)[number];

export class BusinessForm extends ValueObject implements OmittableText {
  constructor(private readonly _value: FormOption) {
    super();
  }

  get value(): FormOption {
    return this._value;
  }

  getText(): string {
    // 内風呂、露天風呂とは区別すること
    switch (this._value) {
      case "uchiyu":
        return "内湯";
      case "sotoyu":
        return "外湯";
    }
  }

  getOmittedText(): string | undefined {
    switch (this._value) {
      case "uchiyu":
        return "内";
      case "sotoyu":
        return "外";
    }
  }

  equals(vo: BusinessForm): boolean {
    return this._value === vo.value;
  }

  copy(): BusinessForm {
    return new BusinessForm(this._value);
  }
}
