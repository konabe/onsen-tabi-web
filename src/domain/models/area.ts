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
  readonly name: string;
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
    this.name = name;
    this.prefecture = prefecture;
    this.isNationalResort = nationalResort;
    this.village = village;
    this.url = url;
    this.description = description;
    this.onsenIds = onsenIds;
  }

  displayingName() {
    return new AreaName(this.name).displayingName();
  }
}
