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
