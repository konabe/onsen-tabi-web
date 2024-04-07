export class HotelID {
  _areaIdBrand: unknown;

  constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  copy() {
    return new HotelID(this._value);
  }
}

export type HotelEntityParameter = {
  id: number;
  name: string;
  hasWashitsu: boolean;
  soloAvailable: boolean;
  url: string;
  description: string;
};

export class HotelEntity {
  readonly _id: HotelID;
  readonly name: string;
  readonly hasWashitsu: boolean;
  readonly soloAvailable: boolean;
  readonly url: string;
  readonly description: string;

  constructor({
    id,
    name,
    hasWashitsu,
    soloAvailable,
    url,
    description,
  }: HotelEntityParameter) {
    this._id = new HotelID(id);
    this.name = name;
    this.hasWashitsu = hasWashitsu;
    this.soloAvailable = soloAvailable;
    this.url = url;
    this.description = description;
  }

  get id() {
    return this._id.copy();
  }
}
