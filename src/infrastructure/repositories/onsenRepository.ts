import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import { APIClient } from "../api/ApiClient";
import { OnsenRequest, OnsenResponse } from "../api/OnsenApiModel";

export class OnsenRepository implements IOnsenRepository {
  constructor(private _apiClient: APIClient = new APIClient()) {}

  async create(onsen: OnsenRequest): Promise<OnsenResponse> {
    return await this._apiClient.send("POST", "/onsen", onsen);
  }

  async readAll(areaId?: number, hotelId?: number): Promise<OnsenResponse[]> {
    return await this._apiClient.send("GET", "/onsen", {
      area_id: areaId,
      hotel_id: hotelId,
    });
  }

  async read(id: number): Promise<OnsenResponse> {
    return await this._apiClient.send("GET", `/onsen/${id}`);
  }

  async update(id: number, onsen: OnsenRequest): Promise<void> {
    return await this._apiClient.send("PUT", `/onsen/${id}`, onsen);
  }
}
