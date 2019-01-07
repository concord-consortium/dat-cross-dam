import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
import { Text } from "./text";

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
        <Text text={ui.sampleText} />
        <canvas id="canvas_for_cartoon" width="600" height="340">
        </canvas>
      </div>
    );
  }
}
