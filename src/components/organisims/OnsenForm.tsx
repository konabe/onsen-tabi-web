import { useEffect, useState } from "react";
import styled from "styled-components";

import { AreaEntity } from "../../domain/models/area";
import { OnsenEntity } from "../../domain/models/onsen";
import {
  BusinessForm,
  FormOption,
  FormOptions,
} from "../../domain/models/onsen/businessForm";
import {
  Chemical,
  ChemicalOption,
  ChemicalsOptions as chemicalsOptions,
} from "../../domain/models/onsen/chemical";
import {
  Liquid,
  LiquidValueOption,
  LiquidValueOptions,
} from "../../domain/models/onsen/liquid";
import {
  OsmoticPressure,
  OsmoticPressureOption,
  OsmoticPressureOptions,
} from "../../domain/models/onsen/osmoticPressure";
import {
  Temperature,
  TemperatureOption,
  TemperatureOptions,
} from "../../domain/models/onsen/temperature";
import Button from "../atoms/Button";
import { subColor } from "../atoms/colors";
import Select from "../atoms/Select";
import SingleCheckBox from "../atoms/SingleCheckBox";
import TextArea from "../atoms/TextArea";
import TextField from "../atoms/TextField";

type Props = {
  formTitle?: string;
  value: OnsenEntity | undefined;
  areas: AreaEntity[];
  onChange?: (onsen: OnsenEntity) => void;
  onSubmitClick?: (onsen: OnsenEntity) => Promise<void>;
};

const OnsenForm: React.FC<Props> = ({
  formTitle,
  value,
  areas,
  onSubmitClick,
  onChange,
}) => {
  const [name, setName] = useState<string>("");
  const [quality, setQuality] = useState<string>("");
  const [chemicals, setChemicals] = useState<string[]>([]);
  const [otherSpringQuality, setOtherSpringQuality] = useState<string>("");
  const [osmoticPressure, setOsmoticPressure] = useState<
    OsmoticPressureOption | ""
  >("");
  const [liquid, setLiquid] = useState<LiquidValueOption | "">("");
  const [temperature, setTemperature] = useState<TemperatureOption | "">("");
  const [form, setForm] = useState<FormOption>("sotoyu");
  const [isDayUse, setIsDayUse] = useState<boolean>(false);
  const [areaId, setAreaId] = useState<number | undefined>(undefined);
  const [url, setURL] = useState<string>("");
  const [imgURL, setImgURL] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const chemicalsValueOptions = chemicalsOptions.map((v) => ({
    value: v,
    label: new Chemical(v).getText(),
  }));
  const chemicalsCurrentValue = chemicals?.map((v) =>
    chemicalsValueOptions.find((c) => c.value === v)
  );

  const osmoticPressureValueOptions = [
    ...OsmoticPressureOptions,
    "" as const,
  ].map((v) => {
    const label =
      v === "" ? "選択なし" : new OsmoticPressure(v).getTextWithInstruction();
    return {
      value: v,
      label,
    };
  });
  const osmoticPressureCurrentValue = osmoticPressureValueOptions.find(
    (v) => v.value === osmoticPressure
  );

  const liquidValueOptions = [...LiquidValueOptions, "" as const].map((v) => {
    const label =
      v === "" ? "選択なし" : new Liquid(v).getTextWithInstruction();
    return {
      value: v,
      label,
    };
  });
  const liquidCurrentValue = liquidValueOptions.find((v) => v.value === liquid);

  const temperatureOptions = [...TemperatureOptions, "" as const].map((v) => {
    const label =
      v === "" ? "選択なし" : new Temperature(v).getTextWithInstruction();
    return {
      value: v,
      label,
    };
  });
  const temperatureCurrentValue = temperatureOptions.find(
    (v) => v.value === temperature
  );

  const formOptions = [...FormOptions].map((v) => {
    return {
      value: v,
      label: new BusinessForm(v).getText(),
    };
  });
  const formCurrentValue = formOptions.find((v) => v.value === form);

  const areaOptions = [...areas, undefined].map((v) => {
    const label = v?.name ?? "選択なし";
    return {
      value: v?.id,
      label,
    };
  });
  const areaCurrentValue = areaOptions.find((v) => v.value === areaId);

  const onClick = async () => {
    const selectedArea =
      areaId !== undefined ? areas.find((v) => v.id === areaId) : undefined;
    const selectedAreaProp =
      selectedArea !== undefined
        ? {
            id: selectedArea.id,
            name: selectedArea.name,
          }
        : undefined;
    console.log(selectedAreaProp);
    await onSubmitClick?.(
      new OnsenEntity({
        id: -1,
        name,
        generatedSpringQuality: quality,
        otherSpringQuality: otherSpringQuality,
        chemicals: (chemicals ?? []) as ChemicalOption[],
        osmoticPressure: osmoticPressure !== "" ? osmoticPressure : undefined,
        liquid: liquid !== "" ? liquid : undefined,
        temperature: temperature !== "" ? temperature : undefined,
        form,
        isDayUse,
        url,
        imgURL: imgURL === "" ? null : imgURL,
        description,
        area: selectedAreaProp,
      })
    );
    setName("");
    setOtherSpringQuality("");
    setQuality("");
    setChemicals([]);
    setOsmoticPressure("");
    setLiquid("");
    setTemperature("");
    setForm("sotoyu");
    setAreaId(undefined);
    setURL("");
    setImgURL("");
    setDescription("");
  };

  useEffect(() => {
    onChange?.(
      new OnsenEntity({
        id: -1,
        name,
        generatedSpringQuality: quality,
        otherSpringQuality: otherSpringQuality,
        chemicals: (chemicals ?? []) as ChemicalOption[],
        osmoticPressure: osmoticPressure !== "" ? osmoticPressure : undefined,
        liquid: liquid !== "" ? liquid : undefined,
        temperature: temperature !== "" ? temperature : undefined,
        form,
        isDayUse,
        url,
        imgURL: imgURL === "" ? null : imgURL,
        description,
        area: undefined,
      })
    );
  }, [
    description,
    form,
    isDayUse,
    osmoticPressure,
    liquid,
    temperature,
    name,
    onChange,
    otherSpringQuality,
    quality,
    url,
    chemicals,
    imgURL,
  ]);

  useEffect(() => {
    setName(value?.name ?? "");
    setChemicals(value?.chemicals ?? []);
    setOtherSpringQuality(value?.otherSpringQuality ?? "");
    setQuality(value?.generatedSprintQuality ?? "");
    setOsmoticPressure(value?.osmoticPressure ?? "");
    setLiquid(value?.liquid ?? "");
    setTemperature(value?.temperature ?? "");
    setForm(value?.form ?? "sotoyu");
    setIsDayUse(value?.isDayUse ?? false);
    setAreaId(value?.area?.id ?? undefined);
    setURL(value?.url ?? "");
    setImgURL(value?.imgURL ?? "");
    setDescription(value?.description ?? "");
  }, [value]);

  return (
    <SCreateCormContainer>
      <SFieldSet>
        {formTitle !== undefined ? <legend>{formTitle}</legend> : undefined}
        <div>
          <TextField
            label="名前"
            value={name}
            onChange={(value) => setName(value)}
          />
        </div>
        <div>
          <Select
            name="chemicals"
            label="成分"
            options={chemicalsValueOptions}
            value={chemicalsCurrentValue}
            isMulti={true}
            defaultValue={[]}
            onChange={(v) => setChemicals(v.map((c: any) => c.value))}
          />
        </div>
        <div>
          <TextField
            label="その他泉質"
            value={otherSpringQuality}
            onChange={(value) => setOtherSpringQuality(value)}
          />
        </div>
        <div>
          <Select
            name="osmotic-pressure"
            label="浸透圧"
            options={osmoticPressureValueOptions}
            value={osmoticPressureCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) =>
              setOsmoticPressure((v?.value ?? "") as OsmoticPressureOption | "")
            }
          />
        </div>
        <div>
          <Select
            name="liquid"
            label="液性"
            options={liquidValueOptions}
            value={liquidCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) =>
              setLiquid((v?.value ?? "") as LiquidValueOption | "")
            }
          />
        </div>
        <div>
          <Select
            name="temperature"
            label="温度"
            options={temperatureOptions}
            value={temperatureCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) =>
              setTemperature((v?.value ?? "") as TemperatureOption | "")
            }
          />
        </div>
        <div>
          <Select
            name="form"
            label="形態"
            options={formOptions}
            value={formCurrentValue}
            isMulti={false}
            defaultValue={formOptions[0]}
            onChange={(v) => setForm(v.value as FormOption)}
          />
        </div>
        <div>
          <SingleCheckBox
            label="日帰り入浴あり"
            value={isDayUse}
            onChange={(v) => setIsDayUse(v)}
          />
        </div>
        <div>
          <Select
            name="area"
            label="エリア"
            options={areaOptions}
            value={areaCurrentValue}
            isMulti={false}
            defaultValue={undefined}
            onChange={(v) => {
              const areaId = v.value;
              const numAreaId = Number(areaId);
              setAreaId(numAreaId);
            }}
          />
        </div>
        <div>
          <TextField
            label="URL"
            value={url}
            onChange={(value) => setURL(value)}
          />
        </div>
        <div>
          <TextField
            label="画像URL"
            value={imgURL}
            onChange={(value) => setImgURL(value)}
          />
        </div>
        <div>
          <TextArea
            label="説明"
            value={description}
            onChange={async (v) => setDescription(v)}
          />
        </div>
        <Button title="送信" onClick={onClick} />
      </SFieldSet>
    </SCreateCormContainer>
  );
};

export default OnsenForm;

const SCreateCormContainer = styled.div`
  margin-top: 20px;
`;

const SFieldSet = styled.fieldset`
  border-color: ${subColor};
  padding: 16px;

  display: flex;
  flex-direction: column;
  row-gap: 8px;
`;
