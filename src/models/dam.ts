import { types, Instance } from "mobx-state-tree";
import * as dam0 from "../data/dam0.json";
import * as dam25 from "../data/dam25.json";
import * as dam50 from "../data/dam50.json";
import * as dam75 from "../data/dam75.json";

const dataByFlow = (flowPercentage: number): SeasonData[] => {
  let allData: SeasonData[];
  switch (flowPercentage) {
    case 0:
      allData = dam0 as SeasonData[];
    case 25:
      allData = dam25 as SeasonData[];
    case 50:
      allData = dam50 as SeasonData[];
    case 75:
      allData = dam75 as SeasonData[];
    default:
      allData = dam0 as SeasonData[];
  }
  return allData;
};

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

export const DamModel = types
  .model("Dam", {
    flowPercentage: 0,
    currentYear: 1,
    currentSeason: "Spring"
  })
  .views(self => ({
    get allCurrentData(): SeasonData[] {
      return dataByFlow(self.flowPercentage);
    },
    get currentYearData(): SeasonData[] {
      const allData = dataByFlow(self.flowPercentage);
      return allData.filter(d => d.Year === self.currentYear && d.Season === self.currentSeason);
    }
  }))
  .actions(self => ({
    setFlowPercentage(flow: number) {
      self.flowPercentage = flow;
    },
    setYear(year: number) {
      self.currentYear = year;
    },
    setSeason(season: string) {
      self.currentSeason = season;
    }
  }))
  ;

export type DamModelType = Instance<typeof DamModel>;
