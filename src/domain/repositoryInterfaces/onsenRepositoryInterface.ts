import { OnsenEntity } from "../models/onsen";

export interface IOnsenRepository {
  create: (onsen: OnsenEntity) => Promise<OnsenEntity>;
  readAll: (areaId?: number, hotelId?: number) => Promise<OnsenEntity[]>;
  read: (id: number) => Promise<OnsenEntity>;
  update: (id: number, onsen: OnsenEntity) => Promise<void>;
}
