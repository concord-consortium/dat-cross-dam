import { UIModel, UIModelType } from "./ui";
import { DamModel, DamModelType } from "./dam";

export type AppMode = "authed" | "dev" | "test" | "demo" | "qa";

export interface IStores {
  appMode: AppMode;
  ui: UIModelType;
  riverData: DamModelType;
}

export interface ICreateStores {
  appMode?: AppMode;
  ui?: UIModelType;
  riverData?: DamModelType;
}

export function createStores(params?: ICreateStores): IStores {
  return {
    appMode: params && params.appMode ? params.appMode : "dev",
    ui: params && params.ui || UIModel.create({}),
    riverData: params && params.riverData || DamModel.create()
  };
}
