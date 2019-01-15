import { types } from "mobx-state-tree";

export const UIModel = types
  .model("UI", {
    displayMode: "Graph"
  })
  .actions((self) => {
    return {
      setDisplayMode(text: string) {
        self.displayMode = text;
      }
    };
  });

export type UIModelType = typeof UIModel.Type;
