import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
// import { Text } from "./text";
import { ControlArea } from "./controls/control-area";
import { ChartTest } from "./charts/chart-test";
import { PictureArea } from "./picture/picture-area";
import "./app.sass";

interface IProps extends IBaseProps {}
interface IState {}

@inject("stores")
@observer
export class AppComponent extends BaseComponent<IProps, IState> {

  public render() {

    const {ui} = this.stores;

    // For the moment, the styles are defined "inline". This is likely to be
    // replaced as the final styles are defined and implemented.
    const containerStyle = {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: "2fr 1fr",
      gridTemplateRows: "1fr 2fr"
    };
    const controlAreaStyle = {
      border: "2px solid green",
    };
    const pictureAreaStyle = {
      border: "2px solid blue",
    };
    const chartAreaStyle = {
      border: "2px solid yellow",
      gridColumn: "2 / 3",
      gridRow: "1 / 3"
    };

    return (
      <div className="app">
        <div style={containerStyle}>
          <div style={controlAreaStyle}>
            <ControlArea />
          </div>
          <div style={chartAreaStyle}>
            <ChartTest />
          </div>
          <div style={pictureAreaStyle}>
            <PictureArea />
          </div>
        </div>
      </div>
    );
  }

}
