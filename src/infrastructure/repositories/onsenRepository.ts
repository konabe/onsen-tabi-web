import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import { OnsenEntity } from "../../domain/models/onsen";
import { APIClient } from "../api/ApiClient";
import { LiquidValueOption } from "../../domain/models/onsen/liquid";
import { FormOption } from "../../domain/models/onsen/businessForm";
import { OsmoticPressureOption } from "../../domain/models/onsen/osmoticPressure";
import { ChemicalOption } from "../../domain/models/onsen/chemical";
import { TemperatureOption } from "../../domain/models/onsen/temperature";

export type OnsenResponse = {
  id: number;
  quality?: {
    name: string;
    chemicals: ChemicalOption[];
  };
  name: string;
  springQuality: string;
  springQualityUser: string;
  liquid: LiquidValueOption | null;
  osmoticPressure: OsmoticPressureOption | null;
  temperature: TemperatureOption | null;
  form: FormOption;
  isDayUse: boolean;
  url: string;
  imgUrl: string | null;
  description: string;
};

export type OnsenRequest = {
  name: string;
  springQuality: string;
  chemicals: {
    naIon: number;
    caIon: number;
    mgIon: number;
    clIon: number;
    hco3Ion: number;
    so4Ion: number;
    co2Ion: number;
    feIon: number;
    hIon: number;
    iIon: number;
    s: number;
    rn: number;
  } | null;
  liquid: LiquidValueOption | null;
  osmoticPressure: OsmoticPressureOption | null;
  temperature: TemperatureOption | null;
  form: FormOption;
  isDayUse: boolean;
  url: string;
  imgUrl: string | null;
  description: string;
};

export class OnsenRepository implements IOnsenRepository {
  constructor(private _apiClient: APIClient = new APIClient()) {}

  async create(onsen: OnsenEntity): Promise<OnsenEntity> {
    const request: OnsenRequest = this.createRequest(onsen);
    const response: OnsenResponse = await this._apiClient.send(
      "POST",
      "/onsen",
      request
    );
    return this.createEntity(response);
  }

  async readAll(areaId?: number, hotelId?: number): Promise<OnsenEntity[]> {
    const repsonse: OnsenResponse[] = await this._apiClient.send(
      "GET",
      "/onsen",
      {
        area_id: areaId,
        hotel_id: hotelId,
      }
    );
    return repsonse.map((v: OnsenResponse) => this.createEntity(v));
  }

  async read(id: number): Promise<OnsenEntity> {
    const response: OnsenResponse = await this._apiClient.send(
      "GET",
      `/onsen/${id}`
    );
    return this.createEntity(response);
  }

  async update(id: number, onsen: OnsenEntity): Promise<void> {
    const request: OnsenRequest = this.createRequest(onsen);
    await this._apiClient.send("PUT", `/onsen/${id}`, request);
  }

  private createRequest(onsen: OnsenEntity): OnsenRequest {
    let chemicals = {
      naIon: 0,
      caIon: 0,
      mgIon: 0,
      clIon: 0,
      hco3Ion: 0,
      so4Ion: 0,
      co2Ion: 0,
      feIon: 0,
      hIon: 0,
      iIon: 0,
      s: 0,
      rn: 0,
    };
    onsen.chemicals.forEach((v, i) => {
      if (v === "NaIon") chemicals.naIon = i + 1;
      if (v === "CaIon") chemicals.caIon = i + 1;
      if (v === "MgIon") chemicals.mgIon = i + 1;
      if (v === "ClIon") chemicals.clIon = i + 1;
      if (v === "HCO3Ion") chemicals.hco3Ion = i + 1;
      if (v === "SO4Ion") chemicals.so4Ion = i + 1;
      if (v === "CO2") chemicals.co2Ion = i + 1;
      if (v === "FeIon") chemicals.feIon = i + 1;
      if (v === "HIon") chemicals.hIon = i + 1;
      if (v === "IIon") chemicals.iIon = i + 1;
      if (v === "S") chemicals.s = i + 1;
      if (v === "Rn") chemicals.rn = i + 1;
    });
    return {
      ...onsen,
      liquid: onsen?.liquid ?? null,
      form: onsen.form,
      osmoticPressure: onsen?.osmoticPressure ?? null,
      temperature: onsen?.temperature ?? null,
      springQuality: onsen.userSpringQuality,
      chemicals,
      imgUrl: onsen.imgURL ?? null,
    };
  }

  private createEntity(response: OnsenResponse): OnsenEntity {
    return new OnsenEntity({
      ...response,
      chemicals: response.quality?.chemicals ?? [],
      generatedSpringQuality: response.quality?.name,
      userSpringQuality: response.springQuality,
      imgURL: response.imgUrl,
    });
  }
}
