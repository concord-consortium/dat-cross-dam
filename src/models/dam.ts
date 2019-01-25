import { types, Instance } from "mobx-state-tree";
import {
  getCurrentCropPercentageAgriburg,
  getCurrentCropPercentageFarmville,
  getCurrentLakeArea,
  getCurrentPercentageAgriburgResidentialUse,
  getCurrentPercentageFarmvilleResidentialUse
} from "../data/dam-data-utility";

export const DamModel = types
  .model("Dam", {
    flowPercentage: 0,
    currentYear: 1,
    currentSeason: "Spring",
    dataView: "lake",
    isPlaying: false
  })
  .views((self) => {
    return {
      getCropsAgriburg() {
        return (getCurrentCropPercentageAgriburg(self.flowPercentage, self.currentYear));
      },
      getCropsFarmville() {
        return (getCurrentCropPercentageFarmville(self.flowPercentage, self.currentYear));
      },
      getCurrentLakeArea() {
        return (getCurrentLakeArea(self.flowPercentage, self.currentYear));
      },
      getResidentialUseAgriburg() {
        return (getCurrentPercentageAgriburgResidentialUse(self.flowPercentage, self.currentYear));
      },
      getResidentialUseFarmville() {
        return (getCurrentPercentageFarmvilleResidentialUse(self.flowPercentage, self.currentYear));
      }

    };
  })
  .actions(self => ({
    setFlowPercentage(flow: number) {
      self.flowPercentage = flow;
    },
    setYear(year: number) {
      self.currentYear = year;
    },
    setSeason(season: string) {
      self.currentSeason = season;
    },
    setDataView(dataView: string) {
      self.dataView = dataView;
    },
    setIsPlaying(isPlaying: boolean) {
      self.isPlaying = isPlaying;
    }
  }))
  ;

export type DamModelType = Instance<typeof DamModel>;
