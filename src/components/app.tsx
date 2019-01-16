import { inject, observer } from "mobx-react";
import * as React from "react";
import { SizeMe } from "react-sizeme";

import { BaseComponent, IBaseProps } from "./base";
import { ChartDisplay } from "./charts/chart-display";
import { SimulationControls } from "./simulation-controls";
import { DamData } from "./dam-data";
import { PictureArea } from "./picture/picture-area";

import "./app.sass";

import { CheckBox } from "./controls/check-box";
import { getRelativePath } from "mobx-state-tree";

export interface IPictureParams {
  showLabels: boolean;
  showDam: boolean;
  populationAgriburg: number;         // 0..99
  populationFarmville: number;        // 0..99
  cropsArgiburg: number;              // 0..99
  cropsFarmville: number;             // 0..99
  waterDivertedToFarmRiver: number;   // 0..3 for 0%, 25%, 50%, & 75%.
  lakeArea: number;                   // 0..99
}

interface IProps extends IBaseProps {}

interface IState {
  pictureParams: IPictureParams;
}

interface ISize {     // Used by SizeMe to pass the resized parent's details
  size: {             // to it's children.
    width?: number;
  };
}

@inject("stores")
@observer
export class AppComponent extends BaseComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      pictureParams: {
        showLabels: false,
        showDam: true,
        populationAgriburg: 99,
        populationFarmville: 99,
        cropsArgiburg: 20,
        cropsFarmville: 70,
        waterDivertedToFarmRiver: 1,
        lakeArea: 50
      }
    };
  }

  public render() {

    const {ui} = this.stores;

    const pictureAreaStyle: React.CSSProperties = {
      position: "relative",
      margin: 5,
    };

    const onChangePictureParams = (newPictureParams: IPictureParams) => {
      // tslint:disable no-console
      // console.log("*** OnChangePictureParams:  " + JSON.stringify(newPictureParams));
      // tslint:enable no-console
      this.setState({pictureParams: newPictureParams});
    };

    return (
      <div className="app">
          {/* <div style={controlAreaStyle}>
            <ControlArea pictureParams={this.state.pictureParams} onChange={onChangePictureParams} />
          </div> */}
        <div className="controls">
          <SimulationControls />
        </div>
        {ui.displayMode === "Simulation" &&
          <div className="section simulation">
            <div style={pictureAreaStyle}>
              <SizeMe>
                { ( {size}: ISize ) =>
                  <PictureArea width={size.width ? size.width : 600} pictureParams={this.state.pictureParams} />
                }
              </SizeMe>
            </div>
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
