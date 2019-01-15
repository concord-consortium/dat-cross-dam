import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
import { ChartDisplay } from "./charts/chart-display";
import { SimulationControls } from "./simulation-controls";
import { DamData } from "./dam-data";

import "./app.sass";

interface IProps extends IBaseProps {}
interface IState {}

@inject("stores")
@observer
export class AppComponent extends BaseComponent<IProps, IState> {

  public render() {
    const {ui} = this.stores;
    return (
      <div className="app">
        <div className="controls">
          <SimulationControls />
        </div>
        {ui.displayMode === "Simulation" &&
          <div className="section simulation">
            <canvas id="canvas_for_cartoon" width="600" height="340" />
          </div>
        }
        {ui.displayMode === "Graph" &&
          <div className="section chart">
            <ChartDisplay />
          </div>
        }
        {ui.displayMode === "Table" &&
          <div className="section table">
            <DamData />
          </div>
        }
      </div>
    );
  }
}
