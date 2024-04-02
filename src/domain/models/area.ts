import { AreaName } from "./area/areaName";

export type AreaEntityParameter = {
  id: number;
  name: string;
  prefecture: string;
  nationalResort: boolean;
  village: string | undefined;
  url: string;
  description: string;
  onsenIds: number[];
};

export class AreaEntity {
  readonly id: number;
  readonly _name: AreaName;
  readonly prefecture: string;
  readonly isNationalResort: boolean;
  readonly village: string | undefined;
  readonly url: string;
  readonly description: string;
  readonly onsenIds: number[];

  constructor({
    id,
    name,
    prefecture,
    nationalResort,
    village,
    url,
    description,
    onsenIds,
  }: AreaEntityParameter) {
    this.id = id;
    this._name = new AreaName(name);
    this.prefecture = prefecture;
    this.isNationalResort = nationalResort;
    this.village = village;
    this.url = url;
    this.description = description;
    this.onsenIds = onsenIds;
  }

  get name() {
    return this._name.value;
  }

  displayingName() {
    return this._name.displayingName();
  }
}
