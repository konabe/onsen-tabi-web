export type HotelEntityParameter = {
  id: number;
  name: string;
  hasWashitsu: boolean;
  soloAvailable: boolean;
  url: string;
  description: string;
};

export class HotelEntity {
  readonly id: number;
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
    this.id = id;
    this.name = name;
    this.hasWashitsu = hasWashitsu;
    this.soloAvailable = soloAvailable;
    this.url = url;
    this.description = description;
  }
}
