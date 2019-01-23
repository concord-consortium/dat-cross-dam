import * as dam0 from "../data/dam0.json";
import * as dam25 from "../data/dam25.json";
import * as dam50 from "../data/dam50.json";
import * as dam75 from "../data/dam75.json";

export function dataByFlow(flowPercentage: number): SeasonData[] {
  let allData: SeasonData[] = dam0 as SeasonData[];
  if (flowPercentage === 0) allData = dam0 as SeasonData[];
  if (flowPercentage === 25) allData = dam25 as SeasonData[];
  if (flowPercentage === 50) allData = dam50 as SeasonData[];
  if (flowPercentage === 75) allData = dam75 as SeasonData[];
  return allData;
}
export function dataByFlowByYear(flowPercentage: number, year: number): SeasonData[] {
  let allData: SeasonData[] = dam0 as SeasonData[];
  if (flowPercentage === 0) allData = dam0 as SeasonData[];
  if (flowPercentage === 25) allData = dam25 as SeasonData[];
  if (flowPercentage === 50) allData = dam50 as SeasonData[];
  if (flowPercentage === 75) allData = dam75 as SeasonData[];
  return allData.filter(d => d.Year <= year);
}
export function dataByFlowForYear(flowPercentage: number, year: number): SeasonData {
  const allData = dataByFlow(flowPercentage);
  const yearData = allData.filter(d => d.Year === year);
  return yearData[1];
}

export function dataByFlowByYearPadded(flowPercentage: number, year: number): SeasonData[] {
  const data = dataByFlowByYear(flowPercentage, year);
  if (year < 10) {
    for (let i = year + 1; i <= 10; i++) {
      data.push(blankSeasonData(i));
    }
  }
  return data;
}

export interface SeasonData {
    Year: number;
    Season: string;
    RiverFlowFarmRiver: number;
    RiverFlowAgriburg: number;
    FarmLakeArea: number;
    FromAgriburgToFarmLake: number;
    FarmvilleResidentialUse: number;
    FarmvilleAgriculturalUse: number;
    AgriburgResidentialUse: number;
    AgriburgAgriculturalUse: number;
    FarmvilleHumanUse: number;
    AgriburgHumanUse: number;
    StartSeasonSurfaceArea: number;
    StartSeasonAverageDepth: number;
    StartSeasonVolume: number;
    GainsFarmvilleRiver: number;
    LossesFarmvilleUse: number;
    LossesFarmvilleResidential: number;
    LossesEvaporation: number;
    LossesGroundwaterTransportTowardsOcean: string;
    TotalLossOverWholeSeason: number;
    EndSeasonVolume: number;
    EndSeasonAverageDepth: number;
    EndSeasonSurfaceArea: number;
    CornYieldFarmville: number;
    CornYieldAgriburg: number;
    Farmville: number;
    Agriburg: number;
    WaterDemandCorn: number;
    WaterNeeded: number;
}
function blankSeasonData(year: number): SeasonData {
  const blankData: SeasonData = {
    Year: year,
    Season: "Summer",
    RiverFlowFarmRiver: 0,
    RiverFlowAgriburg: 0,
    FarmLakeArea: 0,
    FromAgriburgToFarmLake: 0,
    FarmvilleResidentialUse: 0,
    FarmvilleAgriculturalUse: 0,
    AgriburgResidentialUse: 0,
    AgriburgAgriculturalUse: 0,
    FarmvilleHumanUse: 0,
    AgriburgHumanUse: 0,
    StartSeasonSurfaceArea: 0,
    StartSeasonAverageDepth: 0,
    StartSeasonVolume: 0,
    GainsFarmvilleRiver: 0,
    LossesFarmvilleUse: 0,
    LossesFarmvilleResidential: 0,
    LossesEvaporation: 0,
    LossesGroundwaterTransportTowardsOcean: "",
    TotalLossOverWholeSeason: 0,
    EndSeasonVolume: 0,
    EndSeasonAverageDepth: 0,
    EndSeasonSurfaceArea: 0,
    CornYieldFarmville: 0,
    CornYieldAgriburg: 0,
    Farmville: 0,
    Agriburg: 0,
    WaterDemandCorn: 0,
    WaterNeeded: 0
  };
  return blankData;
}

interface DataMinMax {
  Max: number;
  Min: number;
}

function getMinMaxCropsAgriburg(flowPercentage: number): DataMinMax {
  const data = dataByFlow(flowPercentage);
  const maxCrops = Math.max(...data.map(p => p.CornYieldAgriburg));
  const minCrops = Math.min(...data.map(p => p.CornYieldAgriburg));
  return { Max: maxCrops, Min: minCrops };
}

function getMinMaxCropsFarmville(flowPercentage: number): DataMinMax {
  const data = dataByFlow(flowPercentage);
  const maxCrops = Math.max(...data.map(p => p.CornYieldFarmville));
  const minCrops = Math.min(...data.map(p => p.CornYieldFarmville));
  return { Max: maxCrops, Min: minCrops };
}

function getMinMaxLakeArea(flowPercentage: number): DataMinMax {
  const data = dataByFlow(flowPercentage);
  const maxArea = Math.max(...data.map(p => p.EndSeasonSurfaceArea));
  const minArea = Math.min(...data.map(p => p.EndSeasonSurfaceArea));
  return { Max: maxArea, Min: minArea };
}

export function getCurrentCropPercentageAgriburg(flowPercentage: number, year: number): number {
  const minmax = getMinMaxCropsAgriburg(flowPercentage);
  const currentValue = dataByFlowForYear(flowPercentage, year).CornYieldAgriburg;
  return calcValue(minmax, currentValue);
}
export function getCurrentCropPercentageFarmville(flowPercentage: number, year: number): number {
  const minmax = getMinMaxCropsFarmville(flowPercentage);
  const currentValue = dataByFlowForYear(flowPercentage, year).CornYieldFarmville;
  return calcValue(minmax, currentValue);
}
export function getCurrentLakeArea(flowPercentage: number, year: number): number {
  const minmax = getMinMaxLakeArea(flowPercentage);
  const currentValue = dataByFlowForYear(flowPercentage, year).EndSeasonSurfaceArea;
  return calcValue(minmax, currentValue);
}

function calcValue(minmax: DataMinMax, currentValue: number): number {
  const range = minmax.Max - minmax.Min;
  return (currentValue - minmax.Min) / range * 100;
}
