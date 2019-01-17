import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "../base";
import { Chart, ChartType } from "./chart";
import { dataByFlow, SeasonData } from "../../data/dam-data-utility";
import {
  DataPointType,
  DataPoint,
  ChartDataSetModelType,
  ChartColors,
  ChartDataSetModel
} from "../../models/charts/chart-data-set";
import { ChartDataModelType, ChartDataModel } from "../../models/charts/chart-data";

interface IProps extends IBaseProps {}
interface IState {
  chartType: ChartType;
}

@inject("stores")
@observer
export class ChartDisplay extends BaseComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { chartType: "bar" };
  }

  public render() {
    const { chartType } = this.state;
    const { riverData } = this.stores;
    const currentData = dataByFlow(riverData.flowPercentage);
    const charts = this.buildAllCharts(currentData);

    return (
      <div className="chart-test-panel">
        <div className="content">
          <select value={chartType} onChange={this.handleChangeSelection} data-test="chart-type">
            <option value={"line"} data-test="line-option">Line</option>
            <option value={"horizontalBar"} data-test="horizontalBar-option">Horizontal Bar</option>
            <option value={"bar"} data-test="bar-option">Bar</option>
          </select>
          <div>
            <Chart title="Chart Test" chartData={charts} chartType={chartType} isPlaying={false} />
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

  private buildChart = (sourceData: SeasonData[], season: string, chartType: string) => {
    const points: DataPointType[] = [];
    sourceData.forEach((d) => {
      if (d.Year && d.Year < 11 && d.Season === season) {
        const dataToChart = chartType === "area" ? d.EndSeasonSurfaceArea : d.CornYieldAgriburg;
        const data = dataToChart ? dataToChart : 0;
        points.push(DataPoint.create({ a1: d.Year, a2: data, label: d.Year.toString() }));
      }
    });
    return points;
  }

  private buildAllCharts = (sourceData: SeasonData[]) => {
    // Build points
    const pointsCorn: DataPointType[] = this.buildChart(sourceData, "Summer", "corn");
    const pointsArea: DataPointType[] = this.buildChart(sourceData, "Summer", "area");

    // Build points into sets
    const chartDataSets: ChartDataSetModelType[] = [];
    chartDataSets.push(ChartDataSetModel.create({
      name: "Surface Area",
      dataPoints: pointsArea,
      color: ChartColors[0].hex,
      backgroundOpacity: 0.9,
      stack: "Area"
    }));
    chartDataSets.push(ChartDataSetModel.create({
      name: "Corn Yield",
      dataPoints: pointsCorn,
      color: ChartColors[1].hex,
      backgroundOpacity: 0.3,
      stack: "Corn"
    }));

    const chartData: ChartDataModelType = ChartDataModel.create({
      name: "Results",
      dataSets: chartDataSets,
      labels: []
    });

    return chartData;
  }
}
