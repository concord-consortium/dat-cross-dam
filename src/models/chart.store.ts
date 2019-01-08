import { types, Instance } from "mobx-state-tree";
import { rngData } from "./charts/chart-sample-data";
import { ChartDataModelType, ChartDataModel } from "./charts/chart-data";

// we may not need this once we have data from the simulation
export const ChartStoreModel = types
  .model("Dam", {
    isPlaying: false
  })
  .extend(self => {
    return {
      views: {
        get currentData(): ChartDataModelType {
          const chartData: ChartDataModelType = ChartDataModel.create({
            name: "Samples",
            // We will be getting data from the actual simulation store
            // TODO: Rip out this rng placeholder once we have live data
            dataSets: rngData(),
            labels: []
          });
          return chartData;
        }
      }
    };
  });

export type ChartStoreModelType = Instance<typeof ChartStoreModel>;
