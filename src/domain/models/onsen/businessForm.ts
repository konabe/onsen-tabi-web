import { ValueObject } from "../../ddd";

export type FormOption = "uchiyu" | "sotoyu";

export class BusinessForm extends ValueObject {
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

  equals(vo: BusinessForm): boolean {
    return this._value === vo.value;
  }

  copy(): BusinessForm {
    return new BusinessForm(this._value);
  }
}
