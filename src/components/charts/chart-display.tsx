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
  chartData: string;
}

@inject("stores")
@observer
export class ChartDisplay extends BaseComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { chartType: "bar", chartData: "lake" };
  }

  public render() {
    const { chartType, chartData } = this.state;
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
          <select value={chartData} onChange={this.handleChangeDataSelection} data-test="chart-data">
            <option value={"corn"} data-test="volume-option">Corn Yield</option>
            <option value={"lake"} data-test="area-option">Lake Surface Area</option>
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

  private handleChangeDataSelection = (e: any) => {
    const selectedValue = e.currentTarget.value ? e.currentTarget.value : "lake";
    if (selectedValue !== this.state.chartData) {
      this.setState({ chartData:  selectedValue });
    }
  }

  private buildChart = (sourceData: SeasonData[], season: string, chartType: string) => {
    const points: DataPointType[] = [];
    sourceData.forEach((d) => {
      if (d.Year && d.Year < 11 && d.Season === season) {

        const dataToChart =
          chartType === "lake" ? d.EndSeasonSurfaceArea :
          chartType === "corna" ? d.CornYieldAgriburg : d.CornYieldFarmville;
        const data = dataToChart ? dataToChart : 0;
        points.push(DataPoint.create({ a1: d.Year, a2: data, label: d.Year.toString() }));
      }
    });
    return points;
  }

  private buildAllCharts = (sourceData: SeasonData[]) => {
    const { chartData } = this.state;

    const cornAgriburgDataSet = ChartDataSetModel.create({
      name: "Corn Yield - Agriburg",
      dataPoints: this.buildChart(sourceData, "Summer", "corna"),
      color: ChartColors[3].hex,
      backgroundOpacity: 0.9,
      stack: "CornA"
    });

    const cornFarmvilleDataSet = ChartDataSetModel.create({
      name: "Corn Yield - Farmville",
      dataPoints: this.buildChart(sourceData, "Summer", "cornf"),
      color: ChartColors[1].hex,
      backgroundOpacity: 0.9,
      stack: "CornF"
    });

    const lakeSurfaceAreaDataSet = ChartDataSetModel.create({
      name: "Lake Surface Area",
      dataPoints: this.buildChart(sourceData, "Summer", "lake"),
      color: ChartColors[0].hex,
      backgroundOpacity: 0.9,
      stack: "Lake"
    });

    const chartDataSets: ChartDataSetModelType[] = [];

    switch (chartData) {
      case "corn":
        chartDataSets.push(cornAgriburgDataSet);
        chartDataSets.push(cornFarmvilleDataSet);
        break;
      case "lake":
        chartDataSets.push(lakeSurfaceAreaDataSet);
        break;
      default:
        chartDataSets.push(lakeSurfaceAreaDataSet);
    }

    const allChartData: ChartDataModelType = ChartDataModel.create({
      name: "Results",
      dataSets: chartDataSets,
      labels: []
    });

    return allChartData;
  }
}
