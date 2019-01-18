import { types } from "mobx-state-tree";

export const UIModel = types
  .model("UI", {
    displayMode: "Graph",
    showLabels: true,
    populationAgriburg: 50,
    populationFarmville: 50,
    cropsArgiburg: 50,
    cropsFarmville: 50,
    lakeArea: 50
  })
  .actions((self) => {
    return {
      setDisplayMode(text: string) {
        self.displayMode = text;
      },
      setShowLabels(showLabelsFlag: boolean) {
        self.showLabels = showLabelsFlag;
      },
      setPopAgriburg(pop: number) {
        self.populationAgriburg = pop;
      },
      setPopFarmville(pop: number) {
        self.populationFarmville = pop;
      },
      setCropsAgriburg(crops: number) {
        self.cropsArgiburg = crops;
      },
      setCropsFarmville(crops: number) {
        self.cropsFarmville = crops;
      },
      setLakeArea(area: number) {
        self.lakeArea = area;
      }
    };
  });

export type UIModelType = typeof UIModel.Type;
