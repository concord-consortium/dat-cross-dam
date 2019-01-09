import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "../base";
import { Chart, ChartType } from "./chart";

interface IProps extends IBaseProps {}
interface IState {
  chartType: ChartType;
}

@inject("stores")
@observer
export class ChartTestDisplay extends BaseComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { chartType: "bar" };
  }

  public render() {
    const { chartType } = this.state;
    const { chartData } = this.stores;
    return (
      <div className="chart-test-panel">
        <div className="content">
          <select value={chartType} onChange={this.handleChangeSelection} data-test="chart-type">
            <option value={"line"} data-test="line-option">Line</option>
            <option value={"horizontalBar"} data-test="horizontalBar-option">Horizontal Bar</option>
            <option value={"bar"} data-test="bar-option">Bar</option>
          </select>
          <div>
            <Chart title="Chart Test" chartData={chartData.currentData} chartType={chartType} isPlaying={false} />
          </div>
        </div>
        <div className="footer"/>
      </div>
    );
  }

  private handleChangeSelection = (e: any) => {
    const selectedValue = e.currentTarget.value ? e.currentTarget.value : "bar";
    if (selectedValue !== this.state.chartType) {
      this.setState({ chartType:  selectedValue });
    }
  }

}
