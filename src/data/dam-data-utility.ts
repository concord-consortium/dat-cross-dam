import * as dam0 from "../data/dam0.json";
import * as dam25 from "../data/dam25.json";
import * as dam50 from "../data/dam50.json";
import * as dam75 from "../data/dam75.json";

// Workaround for chart rendering:
// Data for CropYieldAgriburg at 75% diversion is actually zero in the data,
// but the bar chart displays the year instead of the data when it sees this as the
// value for the data point in the second dataset. I've changed the value to 0.01
// in all instances in the JSON to ensure the bars are no longer rendered incorrectly.
// This may be an erroneous data type(perhaps 0 is read as a boolean ?) but further
// investigation would be needed to know for sure.

// Only used for min/max value calculations
function _allData(): SeasonData[] {
  const allFlowData: SeasonData[] = dam0 as SeasonData[];
  allFlowData.concat(dam25 as SeasonData[]).concat(dam50 as SeasonData[]).concat(dam75 as SeasonData[]);
  return allFlowData;
}

export function dataByFlow(flowPercentage: number): SeasonData[] {
  let allData: SeasonData[] = dam0 as SeasonData[];
  if (flowPercentage === 0) allData = dam0 as SeasonData[];
  if (flowPercentage === 25) allData = dam25 as SeasonData[];
  if (flowPercentage === 50) allData = dam50 as SeasonData[];
  if (flowPercentage === 75) allData = dam75 as SeasonData[];
  return allData;
}
export function dataByFlowUpToYear(flowPercentage: number, year: number): SeasonData[] {
  let allData: SeasonData[] = dam0 as SeasonData[];
  if (flowPercentage === 0) allData = dam0 as SeasonData[];
  if (flowPercentage === 25) allData = dam25 as SeasonData[];
  if (flowPercentage === 50) allData = dam50 as SeasonData[];
  if (flowPercentage === 75) allData = dam75 as SeasonData[];
  return allData.filter(d => d.Year <= year);
}
export function dataByFlowForSpecificYear(flowPercentage: number, year: number): SeasonData {
  const allData = dataByFlow(flowPercentage);
  const yearData = allData.filter(d => d.Year === year);
  return yearData[1];
}

export function dataByFlowByYearPadded(flowPercentage: number, year: number): SeasonData[] {
  const data = dataByFlowUpToYear(flowPercentage, year);
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

function getMinMaxCropsAgriburg(): DataMinMax {
  const data = _allData();
  const maxCrops = Math.max(...data.map(p => p.CornYieldAgriburg));
  const minCrops = Math.min(...data.map(p => p.CornYieldAgriburg));
  return { Max: maxCrops, Min: minCrops };
}

function getMinMaxCropsFarmville(): DataMinMax {
  const data = _allData();
  const maxCrops = Math.max(...data.map(p => p.CornYieldFarmville));
  const minCrops = Math.min(...data.map(p => p.CornYieldFarmville));
  return { Max: maxCrops, Min: minCrops };
}

function getMinMaxLakeArea(): DataMinMax {
  const data = _allData();
  const maxArea = Math.max(...data.map(p => p.EndSeasonSurfaceArea));
  const minArea = Math.min(...data.map(p => p.EndSeasonSurfaceArea));
  return { Max: maxArea, Min: minArea };
}

function getMinMaxResidentialUseAgriburg(): DataMinMax {
  const data = _allData();
  const maxResidentialUse = Math.max(...data.map(p => p.AgriburgResidentialUse));
  const minResidentialUse = Math.min(...data.map(p => p.AgriburgResidentialUse));
  return { Max: maxResidentialUse, Min: minResidentialUse};
}

function getMinMaxResidentialUseFarmville(): DataMinMax {
  const data = _allData();
  const maxResidentialUse = Math.max(...data.map(p => p.FarmvilleResidentialUse));
  const minResidentialUse = Math.min(...data.map(p => p.FarmvilleResidentialUse));
  return { Max: maxResidentialUse, Min: minResidentialUse};
}

export function getCurrentCropPercentageAgriburg(flowPercentage: number, year: number): number {
  const minmax = getMinMaxCropsAgriburg();
  const currentValue = dataByFlowForSpecificYear(flowPercentage, year).CornYieldAgriburg;
  return calcValue(minmax, currentValue);
}
export function getCurrentCropPercentageFarmville(flowPercentage: number, year: number): number {
  const minmax = getMinMaxCropsFarmville();
  const currentValue = dataByFlowForSpecificYear(flowPercentage, year).CornYieldFarmville;
  return calcValue(minmax, currentValue);
}
export function getCurrentLakeArea(flowPercentage: number, year: number): number {
  const minmax = getMinMaxLakeArea();
  const currentValue = dataByFlowForSpecificYear(flowPercentage, year).EndSeasonSurfaceArea;
  return calcValue(minmax, currentValue);
}

export function getCurrentPercentageAgriburgResidentialUse(flowPercentage: number, year: number): number {
  const minmax = getMinMaxResidentialUseAgriburg();
  const currentValue = dataByFlowForSpecificYear(flowPercentage, year).AgriburgResidentialUse;
  return calcValue(minmax, currentValue);
}

export function getCurrentPercentageFarmvilleResidentialUse(flowPercentage: number, year: number): number {
  const minmax = getMinMaxResidentialUseFarmville();
  const currentValue = dataByFlowForSpecificYear(flowPercentage, year).FarmvilleResidentialUse;
  return calcValue(minmax, currentValue);
}

function calcValue(minmax: DataMinMax, currentValue: number): number {
  const range = minmax.Max - minmax.Min;
  return Math.min(100, Math.max(0, (currentValue - minmax.Min) / range) * 100);
}
