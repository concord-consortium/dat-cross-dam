import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "../base";
import { Chart, ChartType } from "./chart";
import { dataByFlow, dataByFlowByYear, SeasonData } from "../../data/dam-data-utility";
import {
  DataPointType,
  DataPoint,
  ChartDataSetModelType,
  ChartColors,
  ChartDataSetModel
} from "../../models/charts/chart-data-set";
import { ChartDataModelType, ChartDataModel } from "../../models/charts/chart-data";

interface IProps extends IBaseProps {
  parentWidth: number;
  parentHeight: number;
}
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
    const { parentWidth, parentHeight } = this.props;
    const { riverData } = this.stores;
    const currentData = dataByFlowByYear(riverData.flowPercentage, riverData.currentYear);
    const charts = this.buildAllCharts(currentData);

    return (
      <div className="chart-panel">
        <div className="content">
          <div className="chart-options">
            <select value={chartType} onChange={this.handleChangeSelection} data-test="chart-type">
              <option value={"line"} data-test="line-option">Line</option>
              <option value={"horizontalBar"} data-test="horizontalBar-option">Horizontal Bar</option>
              <option value={"bar"} data-test="bar-option">Bar</option>
            </select>
            <select value={riverData.dataView} onChange={this.handleChangeDataSelection} data-test="chart-data">
              <option value={"corn"} data-test="volume-option">Corn Yield</option>
              <option value={"lake"} data-test="area-option">Lake Surface Area</option>
            </select>
          </div>
          <div className="chart-content-container">
            <Chart title="Chart Test" chartData={charts} chartType={chartType}
              isPlaying={false} width={parentWidth} height={parentHeight} />
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
    const { riverData } = this.stores;
    const selectedValue = e.currentTarget.value ? e.currentTarget.value : "lake";
    if (selectedValue !== riverData.dataView) {
      riverData.setDataView(selectedValue);
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
    const { riverData } = this.stores;

    const cornAgriburgDataSet = ChartDataSetModel.create({
      name: "Corn Yield - Agriburg",
      dataPoints: this.buildChart(sourceData, "Summer", "corna"),
      color: ChartColors[3].hex,
      backgroundOpacity: 0.9,
      stack: "CornA",
      fixedMaxA2: 250,
      fixedMinA2: 0,
      a1AxisLabel: "Year",
      a2AxisLabel: "Corn Yield bu/acre",
      maxPoints: 10
    });

    const cornFarmvilleDataSet = ChartDataSetModel.create({
      name: "Corn Yield - Farmville",
      dataPoints: this.buildChart(sourceData, "Summer", "cornf"),
      color: ChartColors[1].hex,
      backgroundOpacity: 0.9,
      stack: "CornF",
      fixedMaxA2: 250,
      fixedMinA2: 0,
      a1AxisLabel: "Year",
      a2AxisLabel: "Corn Yield bu/acre",
      maxPoints: 10
    });

    const lakeSurfaceAreaDataSet = ChartDataSetModel.create({
      name: "Lake Surface Area",
      dataPoints: this.buildChart(sourceData, "Summer", "lake"),
      color: ChartColors[0].hex,
      backgroundOpacity: 0.9,
      stack: "Lake",
      fixedMaxA2: 90000,
      fixedMinA2: 0,
      a1AxisLabel: "Year",
      a2AxisLabel: "Surface Area cu.feet",
      maxPoints: 10
    });

    const chartDataSets: ChartDataSetModelType[] = [];

    switch (riverData.dataView) {
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
      dataSets: chartDataSets
    });

    return allChartData;
  }
}
