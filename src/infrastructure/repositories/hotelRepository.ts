import { HotelEntity } from "../../domain/models/hotel";
import { IHotelRepository } from "../../domain/repositoryInterfaces/hotelRepositoryInterface";
import { APIClient } from "../api/ApiClient";

export type HotelResponse = {
  id: number;
  name: string;
  hasWashitsu: boolean;
  soloAvailable: boolean;
  url: string;
  description: string;
};

export type HotelRequest = {
  name: string;
  hasWashitsu: boolean;
  soloAvailable: boolean;
  url: string;
  description: string;
};

export class HotelRepository implements IHotelRepository {
  constructor(private _apiClient: APIClient = new APIClient()) {}

  async create(hotel: HotelEntity): Promise<HotelEntity> {
    const request: HotelRequest = {
      ...hotel,
    };
    const response: HotelResponse = await this._apiClient.send(
      "POST",
      "/hotel",
      request
    );
    return new HotelEntity(response);
  }

  async readAll(areaId?: number): Promise<HotelEntity[]> {
    const response: HotelResponse[] = await this._apiClient.send(
      "GET",
      "/hotel",
      {
        area_id: areaId,
      }
    );
    return response.map((hotel) => new HotelEntity(hotel));
  }

  async read(id: number): Promise<HotelEntity> {
    const response: HotelResponse = await this._apiClient.send(
      "GET",
      `/hotel/${id}`
    );
    return new HotelEntity(response);
  }

  async update(id: number, hotel: HotelEntity): Promise<void> {
    const request: HotelRequest = {
      ...hotel,
    };
    await this._apiClient.send("PUT", `/hotel/${id}`, request);
  }
}
