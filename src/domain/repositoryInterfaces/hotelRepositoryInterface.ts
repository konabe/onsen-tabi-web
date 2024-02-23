import { HotelEntity } from "../models/hotel";

export interface IHotelRepository {
  create: (hotel: HotelEntity) => Promise<HotelEntity>;
  readAll: (areaId?: number) => Promise<HotelEntity[]>;
  read: (id: number) => Promise<HotelEntity>;
  update: (id: number, hotel: HotelEntity) => Promise<void>;
}
