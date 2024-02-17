import {
  AreaRequest,
  AreaResponse,
} from "../../infrastructure/repositories/areaRepository";

export interface IAreaRepository {
  createArea: (request: AreaRequest) => Promise<AreaResponse>;
  readAreaAll: () => Promise<AreaResponse[]>;
  readArea: (id: number) => Promise<AreaResponse>;
  updateArea: (id: number, request: AreaRequest) => Promise<void>;
}
