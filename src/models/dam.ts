import { types, Instance } from "mobx-state-tree";

export const DamModel = types
  .model("Dam", {
    flowPercentage: 0,
    currentYear: 1,
    currentSeason: "Spring"
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
    }
  }))
  ;

export type DamModelType = Instance<typeof DamModel>;
