import { types, Instance } from "mobx-state-tree";

export const DamModel = types
  .model("Dam", {
    flowPercentage: 0,
    currentYear: 1,
    currentSeason: "Spring",
    dataView: "lake"
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
    }
  }))
  ;

export type DamModelType = Instance<typeof DamModel>;
