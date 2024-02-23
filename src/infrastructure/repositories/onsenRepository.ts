import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import {
  Chemical,
  FormOption,
  LiquidValueOption,
  OnsenModel,
  OsmoticPressureOption,
} from "../../share/onsen";
import { APIClient } from "../api/ApiClient";

export type OnsenResponse = {
  id: number;
  quality?: {
    name: string;
    chemicals: Chemical[];
  };
} & OnsenModel;

export type OnsenRequest = {
  name: string;
  springQuality: string;
  chemicals: {
    naIon: boolean;
    caIon: boolean;
    mgIon: boolean;
    clIon: boolean;
    hco3Ion: boolean;
    so4Ion: boolean;
    co2Ion: boolean;
    feIon: boolean;
    hIon: boolean;
    iIon: boolean;
    s: boolean;
    rn: boolean;
  } | null;
  liquid: LiquidValueOption | null;
  osmoticPressure: OsmoticPressureOption | null;
  form: FormOption;
  isDayUse: boolean | undefined;
  url: string;
  description: string;
};

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
