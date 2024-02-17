import { IAreaRepository } from "../../domain/repositoryInterfaces/areaRepositoryInterface";
import { AreaModel } from "../../share/area";
import { APIClient } from "../api/ApiClient";

export type AreaRequest = AreaModel;

export type AreaResponse = AreaModel & {
  id: number;
  onsenIds: number[];
};

export class AreaRepository implements IAreaRepository {
  constructor(private _apiClient: APIClient = new APIClient()) {}

  async createArea(request: AreaRequest): Promise<AreaResponse> {
    return await this._apiClient.send("POST", `/area/`, request);
  }

  async readAreaAll(): Promise<AreaResponse[]> {
    return await this._apiClient.send("GET", "/area");
  }

  async readArea(id: number): Promise<AreaResponse> {
    return await this._apiClient.send("GET", `/area/${id}`);
  }

  async updateArea(id: number, request: AreaRequest): Promise<void> {
    return await this._apiClient.send("PUT", `/area/${id}`, request);
  }
}
