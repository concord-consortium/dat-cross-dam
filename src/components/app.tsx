import { inject, observer } from "mobx-react";
import * as React from "react";
import { SizeMe } from "react-sizeme";
import { BaseComponent } from "./base";
import { ChartDisplay } from "./charts/chart-display";
import { SimulationControls } from "./controls/simulation-controls";
import { DataControls } from "./controls/data-controls";
import { DamData } from "./dam-data";
import { PictureArea } from "./picture/picture-area";
import { ControlArea } from "./controls/control-area";
import { Attribution } from "./attribution";

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
              <SizeMe monitorHeight={true}>
                {({ size }: ISize) =>
                  <PictureArea
                    parentWidth={size.width ? size.width : 600} parentHeight={size.height ? size.height : 340} />
                }
              </SizeMe>
              <Attribution />
            </div>
            <div className="section chart-table">
              <div className="subsection header">
                <DataControls />
              </div>
              <div className="subsection table">
                <SizeMe monitorHeight={false}>
                  {({ size }: ISize) =>
                    <DamData parentWidth={size.width ? size.width : 0}
                      parentHeight={size.height ? size.height : 385} />
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
