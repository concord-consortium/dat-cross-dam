import { inject, observer } from "mobx-react";
import { getRelativePath } from "mobx-state-tree";
import * as React from "react";
import { SizeMe } from "react-sizeme";

import { BaseComponent, IBaseProps } from "./base";
import { ChartDisplay } from "./charts/chart-display";
import { SimulationControls } from "./simulation-controls";
import { DamData } from "./dam-data";
import { PictureArea } from "./picture/picture-area";
import { ControlArea } from "./controls/control-area";

import "./app.sass";

interface ISize {     // Used by SizeMe to pass the resized parent details
  size: {             // to its children.
    width?: number;
    height?: number;
  };
}

@inject("stores")
@observer
export class AppComponent extends BaseComponent<{}, {}> {

  public render() {

    const {ui, appMode} = this.stores;

    return (
      <div className="app-container">
        {appMode !== "embed" &&
          <div className="top-bar">DAT Cross Dam</div>
        }
        <div className="controls-and-content-container">
          {appMode === "dev" &&
            <div className="left-panel">
              <div className="controls">
              <SimulationControls>
                <ControlArea />
              </SimulationControls>
              </div>
            </div>
          }
        <div className="main-content">
            <div className="section simulation">
              <SizeMe monitorHeight={true}>
                {({ size }: ISize) =>
                  <PictureArea width={size.width ? size.width : 0} height={size.height ? size.height : 0} />
                }
              </SizeMe>
          </div>
          {ui.displayMode === "Graph" &&
            <div className="section chart">
              <div className="header">Chart</div>
              <ChartDisplay />
            </div>
          }
          {ui.displayMode === "Table" &&
            <div className="section table">
              <div className="header">Table</div>
              <DamData />
            </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
