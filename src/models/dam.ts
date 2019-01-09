import { types, Instance } from "mobx-state-tree";

export const DamModel = types
  .model("Dam", {
    isPlaying: false
  })
  .extend(self => {
    return {
      views: {
        get currentData(): string {
          return "hello world";
        }
      }
    };
  });

export type DamModelType = Instance<typeof DamModel>;
