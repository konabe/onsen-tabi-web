export class AreaName {
  readonly _value: string;

  constructor(value: string) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  displayingName() {
    return `${this._value}温泉`;
  }
}
