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

interface ISize {     // Used by SizeMe to pass the resized parent's details
  size: {             // to it's children.
    width?: number;
  };
}

@inject("stores")
@observer
export class AppComponent extends BaseComponent<{}, {}> {

  public render() {

    const {ui} = this.stores;

    const pictureAreaStyle: React.CSSProperties = {
      position: "relative",
      margin: 5,
    };

    return (
      <div className="app-container">
        <div className="top-bar">DAT Cross Dam</div>
        <div className="controls-and-content-container">
        <div className="left-panel">
          <div className="controls">
          <SimulationControls>
            <ControlArea />
          </SimulationControls>
          </div>
        </div>
        <div className="main-content">
          <div className="section simulation">
            <div style={pictureAreaStyle}>
            <SizeMe>
              { ({size}: ISize ) => <PictureArea width={size.width ? size.width : 600} /> }
            </SizeMe>
          </div>
          </div>
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
        </div>
      </div>
    );
  }
}
