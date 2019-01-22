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

    const { ui, appMode } = this.stores;

    return (
      <div className="app-container">
        <div className="controls-and-content-container">
          <div className="main-content">
            <div className="section simulation">
              <div className="subsection simulation">
                <SizeMe monitorHeight={true}>
                  {({ size }: ISize) =>
                    <PictureArea
                      parentWidth={size.width ? size.width : 0} parentHeight={size.height ? size.height : 1} />
                  }
                </SizeMe>
              </div>
              {appMode === "dev" &&
                <div className="subsection sim-controls">
                  <div className="controls-bottom">
                    <SimulationControls>
                      <ControlArea />
                    </SimulationControls>
                  </div>
                </div>
              }
            </div>
            <div className="section chart-table">
              <div className="subsection table">
                <SizeMe monitorHeight={true}>
                  {({ size }: ISize) =>
                    <DamData parentWidth={size.width ? size.width : 0}
                      parentHeight={size.height ? size.height : 1} />
                  }
                </SizeMe>
              </div>
              <div className="subsection chart">
                <SizeMe monitorHeight={true}>
                  {({ size }: ISize) =>
                    <ChartDisplay parentWidth={size.width ? size.width : 0}
                      parentHeight={size.height ? size.height : 1} />
                  }
                </SizeMe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
