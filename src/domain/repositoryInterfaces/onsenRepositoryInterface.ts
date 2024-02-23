import {
  OnsenRequest,
  OnsenResponse,
} from "../../infrastructure/api/OnsenApiModel";

export interface IOnsenRepository {
  create: (onsen: OnsenRequest) => Promise<OnsenResponse>;
  readAll: (areaId?: number, hotelId?: number) => Promise<OnsenResponse[]>;
  read: (id: number) => Promise<OnsenResponse>;
  update: (id: number, onsen: OnsenRequest) => Promise<void>;
}
