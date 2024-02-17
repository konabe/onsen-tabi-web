import { AreaEntity } from "../models/area";

export interface IAreaRepository {
  create: (area: AreaEntity) => Promise<AreaEntity>;
  readAll: () => Promise<AreaEntity[]>;
  read: (id: number) => Promise<AreaEntity>;
  update: (id: number, area: AreaEntity) => Promise<void>;
}
