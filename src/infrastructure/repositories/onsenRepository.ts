import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import { OnsenEntity } from "../../domain/models/onsen";
import { APIClient } from "../api/ApiClient";
import { LiquidValueOption } from "../../domain/models/onsen/liquid";
import { FormOption } from "../../domain/models/onsen/businessForm";
import { OsmoticPressureOption } from "../../domain/models/onsen/osmoticPressure";
import { ChemicalOption } from "../../domain/models/onsen/chemical";

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
  form: FormOption;
  isDayUse: boolean;
  url: string;
  description: string;
};

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
  isDayUse: boolean;
  url: string;
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
    return {
      ...onsen,
      liquid: onsen?.liquid ?? null,
      form: onsen.form,
      osmoticPressure: onsen?.osmoticPressure ?? null,
      springQuality: onsen.userSpringQuality,
      chemicals: {
        naIon: onsen.chemicals.includes("NaIon"),
        caIon: onsen.chemicals.includes("CaIon"),
        mgIon: onsen.chemicals.includes("MgIon"),
        clIon: onsen.chemicals.includes("ClIon"),
        hco3Ion: onsen.chemicals.includes("HCO3Ion"),
        so4Ion: onsen.chemicals.includes("SO4Ion"),
        co2Ion: onsen.chemicals.includes("CO2"),
        feIon: onsen.chemicals.includes("FeIon"),
        hIon: onsen.chemicals.includes("HIon"),
        iIon: onsen.chemicals.includes("IIon"),
        s: onsen.chemicals.includes("S"),
        rn: onsen.chemicals.includes("Rn"),
      },
    };
  }

  private createEntity(response: OnsenResponse): OnsenEntity {
    return new OnsenEntity({
      ...response,
      chemicals: response.quality?.chemicals ?? [],
      generatedSpringQuality: response.quality?.name,
      userSpringQuality: response.springQuality,
    });
  }
}
