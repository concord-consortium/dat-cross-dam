import { types } from "mobx-state-tree";

export const UIModel = types
  .model("UI", {
    displayMode: "Graph",
    showLabels: false,
    showDam: true,
    populationAgriburg: 0,
    populationFarmville: 0,
    cropsArgiburg: 20,
    cropsFarmville: 70,
    lakeArea: 50
  })
  .actions((self) => {
    return {
      setDisplayMode(text: string) {
        self.displayMode = text;
      },
      setLabels(labels: boolean) {
        self.showLabels = labels;
      },
      setDam(dam: boolean) {
        self.showDam = dam;
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
