import { IAreaRepository } from "../../domain/repositoryInterfaces/areaRepositoryInterface";
import { AreaEntity } from "../../domain/models/area";
import { APIClient } from "../api/ApiClient";

type AreaRequest = {
  name: string;
  prefecture: string;
  nationalResort: boolean;
  village: string | undefined;
  url: string;
  description: string;
};

type AreaResponse = {
  id: number;
  name: string;
  prefecture: string;
  nationalResort: boolean;
  village: string | undefined;
  url: string;
  description: string;
  onsenIds: number[];
};

export class AreaRepository implements IAreaRepository {
  constructor(private _apiClient: APIClient = new APIClient()) {}

  async create(area: AreaEntity): Promise<AreaEntity> {
    const request: AreaRequest = {
      name: area.name,
      prefecture: area.prefecture,
      nationalResort: area.isNationalResort,
      village: area.village,
      url: area.url,
      description: area.description,
    };
    const response: AreaResponse = await this._apiClient.send(
      "POST",
      "/area",
      request
    );
    return new AreaEntity(response);
  }

  async readAll(): Promise<AreaEntity[]> {
    const response: AreaResponse[] = await this._apiClient.send("GET", "/area");
    return response.map((area) => new AreaEntity(area));
  }

  async read(id: number): Promise<AreaEntity> {
    const response: AreaResponse = await this._apiClient.send(
      "GET",
      `/area/${id}`
    );
    return new AreaEntity(response);
  }

  async update(id: number, area: AreaEntity): Promise<void> {
    const request: AreaRequest = {
      name: area.name,
      prefecture: area.prefecture,
      nationalResort: area.isNationalResort,
      village: area.village,
      url: area.url,
      description: area.description,
    };
    return await this._apiClient.send("PUT", `/area/${id}`, request);
  }
}
