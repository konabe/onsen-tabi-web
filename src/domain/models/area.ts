import { AreaName } from "./area/areaName";

export class AreaID {
  _areaIdBrand: unknown;

  constructor(private _value: number) {}

  get value() {
    return this._value;
  }

  copy() {
    return new AreaID(this._value);
  }
}

export type AreaEntityParameter = {
  id: number;
  name: string;
  kana: string;
  prefecture: string;
  nationalResort: boolean;
  village: string | undefined;
  url: string;
  description: string;
  access: string;
  onsenIds: number[];
};

export class AreaEntity {
  readonly _id: AreaID;
  readonly _name: AreaName;
  readonly _kana: string;
  readonly prefecture: string;
  readonly isNationalResort: boolean;
  readonly village: string | undefined;
  readonly url: string;
  readonly description: string;
  readonly _access: string;
  readonly onsenIds: number[];

  constructor({
    id,
    name,
    kana,
    prefecture,
    nationalResort,
    village,
    url,
    description,
    access,
    onsenIds,
  }: AreaEntityParameter) {
    this._id = new AreaID(id);
    this._name = new AreaName(name);
    this._kana = kana;
    this.prefecture = prefecture;
    this.isNationalResort = nationalResort;
    this.village = village;
    this.url = url;
    this.description = description;
    this._access = access;
    this.onsenIds = onsenIds;
  }

  get id() {
    return this._id.copy();
  }

  get name() {
    return this._name.value;
  }

  get kana() {
    return this._kana;
  }

  get access() {
    return this._access;
  }

  displayingName() {
    return this._name.displayingName();
  }
}
