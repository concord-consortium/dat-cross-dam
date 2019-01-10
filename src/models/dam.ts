import { types, Instance } from "mobx-state-tree";
import * as dam0 from "../data/dam0.json";
import * as dam25 from "../data/dam25.json";
import * as dam50 from "../data/dam50.json";
import * as dam75 from "../data/dam75.json";

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
    isPlaying: false,
    flowPercentage: 0,
    currentYear: 1,
    currentSeason: "Spring"
  })
  .views(self => ({
    get allCurrentData(): SeasonData[] {
      switch (self.flowPercentage) {
        case 0:
          return dam0 as SeasonData[];
        case 25:
          return dam25 as SeasonData[];
        case 50:
          return dam50 as SeasonData[];
        case 75:
          return dam75 as SeasonData[];
        default:
          return dam0 as SeasonData[];
      }
    },
    get currentYearData(): SeasonData[] {
      let allData: SeasonData[];
      switch (self.flowPercentage) {
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
      return allData.filter(d => d.Year === self.currentYear && d.Season === self.currentSeason);
    }
  }))
  ;

export type DamModelType = Instance<typeof DamModel>;
