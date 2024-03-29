import { OnsenEntity } from "../../domain/models/onsen";
import { FormOption } from "../../domain/models/onsen/businessForm";
import { ChemicalOption } from "../../domain/models/onsen/chemical";
import { LiquidValueOption } from "../../domain/models/onsen/liquid";
import { OsmoticPressureOption } from "../../domain/models/onsen/osmoticPressure";
import { TemperatureOption } from "../../domain/models/onsen/temperature";
import { IOnsenRepository } from "../../domain/repositoryInterfaces/onsenRepositoryInterface";
import { APIClient } from "../api/ApiClient";

export type OnsenResponse = {
  id: number;
  name: string;
  quality?: {
    name: string;
    chemicals: ChemicalOption[];
    isStrongNaCl: boolean;
    feType: string;
    isWeakRn: boolean;
  };
  otherSpringQuality: string;
  liquid: LiquidValueOption | null;
  osmoticPressure: OsmoticPressureOption | null;
  temperature: TemperatureOption | null;
  form: FormOption;
  isDayUse: boolean;
  url: string;
  imgUrl: string | null;
  description: string;
  area: {
    id: number;
    name: string;
  } | null;
};

export type OnsenRequest = {
  name: string;
  chemicals: {
    naIon: number;
    caIon: number;
    mgIon: number;
    clIon: number;
    hco3Ion: number;
    so4Ion: number;
    co2Ion: number;
    feIon: number;
    alIon: number;
    cuIon: number;
    hIon: number;
    iIon: number;
    s: number;
    rn: number;
    isStrongNaCl: boolean;
    feType: string;
    isWeakRn: boolean;
  } | null;
  otherSpringQuality: string;
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
    let chemicals: OnsenRequest["chemicals"] = {
      naIon: 0,
      caIon: 0,
      mgIon: 0,
      clIon: 0,
      hco3Ion: 0,
      so4Ion: 0,
      co2Ion: 0,
      feIon: 0,
      alIon: 0,
      cuIon: 0,
      hIon: 0,
      iIon: 0,
      s: 0,
      rn: 0,
      isStrongNaCl: false,
      feType: "",
      isWeakRn: false,
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
      if (v === "AlIon") chemicals.alIon = i + 1;
      if (v === "CuIon") chemicals.cuIon = i + 1;
      if (v === "HIon") chemicals.hIon = i + 1;
      if (v === "IIon") chemicals.iIon = i + 1;
      if (v === "S") chemicals.s = i + 1;
      if (v === "Rn") chemicals.rn = i + 1;
    });
    if (onsen.chemicals.includes("StrongNaCl")) {
      chemicals.isStrongNaCl = true;
    }
    if (onsen.chemicals.includes("FeIon")) {
      chemicals.feType = "Normal";
    }
    if (onsen.chemicals.includes("FeIon2")) {
      chemicals.feType = "Two";
    }
    if (onsen.chemicals.includes("FeIon3")) {
      chemicals.feType = "Three";
    }
    if (onsen.chemicals.includes("WeakRn")) {
      chemicals.isWeakRn = true;
    }
    return {
      ...onsen,
      liquid: onsen?.liquid ?? null,
      form: onsen.form,
      osmoticPressure: onsen?.osmoticPressure ?? null,
      temperature: onsen?.temperature ?? null,
      otherSpringQuality: onsen.otherSpringQuality,
      chemicals,
      imgUrl: onsen.imgURL ?? null,
    };
  }

  private createEntity(response: OnsenResponse): OnsenEntity {
    let pureChemicals = response.quality?.chemicals ?? [];
    return new OnsenEntity({
      ...response,
      chemicals: [
        ...pureChemicals,
        ...(response.quality?.isStrongNaCl ? ["StrongNaCl"] : []),
        ...(response.quality?.isWeakRn ? ["WeakRn"] : []),
        ...(response.quality?.feType === "Two" ? ["FeIon2"] : []),
        ...(response.quality?.feType === "Three" ? ["FeIon3"] : []),
      ] as ChemicalOption[],
      generatedSpringQuality: response.quality?.name,
      otherSpringQuality: response.otherSpringQuality,
      imgURL: response.imgUrl,
    });
  }
}
