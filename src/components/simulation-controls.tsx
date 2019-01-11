import * as React from "react";
import { inject, observer } from "mobx-react";
import { BaseComponent } from "./base";
import Slider from "rc-slider";

import "./simulation-controls.sass";
interface IProps {}
interface IState {}

@inject("stores")
@observer
export class SimulationControls extends BaseComponent<IProps, IState> {
  public render() {
    const { riverData } = this.stores;
    return (
      <div className="simulation-controls">
        <div>Diversion percentage: {riverData.flowPercentage}</div>
        <select onChange={this.handleFlowPercentageChange} value={riverData.flowPercentage}>
          <option value="0">0</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
        </select>
        <div>Year: {riverData.currentYear}</div>
        <Slider  className="year-slider"
          onChange={this.handleYearChange}
          min={1}
          max={10}
          value={riverData.currentYear}
          />
        <div>Season: {riverData.currentSeason}</div>
        <select onChange={this.handleSeasonChange} value={riverData.currentSeason}>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
        <div>End of Season Area: {riverData.currentYearData[0].EndSeasonSurfaceArea}</div>
      </div>
    );
  }
  private handleYearChange = (value: number) => {
    const { riverData } = this.stores;
    riverData.setYear(value);
  }
  private handleSeasonChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { riverData } = this.stores;
    riverData.setSeason(e.currentTarget.value);
  }
  private handleFlowPercentageChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { riverData } = this.stores;
    const flowPercentage = parseInt(e.currentTarget.value, 10);
    riverData.setFlowPercentage(isNaN(flowPercentage) ? 0 : flowPercentage);
  }
}
