import * as React from "react";
import { inject, observer, propTypes } from "mobx-react";
import { BaseComponent } from "../base";
import Slider from "rc-slider";
import { dataByFlow } from "../../data/dam-data-utility";

import "./simulation-controls.sass";
import "./toolbar-buttons.css";

interface IProps {}
interface IState {}

let _playInterval: any;
const simulationSpeed = 2000;

@inject("stores")
@observer
export class SimulationControls extends BaseComponent<IProps, IState> {
  public render() {
    const { riverData, ui, appMode } = this.stores;
    const allData = dataByFlow(riverData.flowPercentage);
    const dataToDisplay =
      allData.filter(d => d.Year === riverData.currentYear && d.Season === riverData.currentSeason)[0];
    const playButtonStyle = riverData.isPlaying ?
      "pause-icon-button" :
      riverData.currentYear < 10 ? "play-icon-button" : "play-icon-button disabled";
    return (
      <div className="simulation-controls">
        <div>Year: {riverData.currentYear}</div>
        <Slider className="year-slider"
          onChange={this.handleYearChange}
          min={1}
          max={10}
          step={1}
          dots={true}
          value={riverData.currentYear}
        />
        <div>Diversion percentage: {riverData.flowPercentage}</div>
        <select onChange={this.handleFlowPercentageChange} value={riverData.flowPercentage}>
          <option value="0">0</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="75">75</option>
        </select>

        <div className="buttons">
          <div className="toolbar-button">
            <div className={playButtonStyle} onClick={this.handleSimulationPlayToggle} />
          </div>
          <div className="toolbar-button">
            <div className="reset-icon-button" onClick={this.handleSimulationReset} />
          </div>
        </div>

        <div className="label-toggle">
          <label>Labels</label>
          <input type="checkbox" checked={ui.showLabels} onChange={this.handleShowLabelsChange} />
        </div>

        {appMode === "dev" &&
          <div>
          <div>Season: {riverData.currentSeason}</div>
          <select onChange={this.handleSeasonChange} value={riverData.currentSeason}>
            <option value="Spring">Spring</option>
            <option value="Summer">Summer</option>
          </select>
          <div>End of Season Area: {dataToDisplay.EndSeasonSurfaceArea}</div>
          <div className="display-mode">Display Mode</div>
          <div><input type="radio" id="displayModeSim" name="displayMode" value="Simulation"
            checked={ui.displayMode === "Simulation"} onChange={this.handleDisplayModeChange} />Simulation</div>
          <div><input type="radio" id="displayModeGraph" name="displayMode" value="Graph"
            checked={ui.displayMode === "Graph"} onChange={this.handleDisplayModeChange} />Graph</div>
          <div><input type="radio" id="displayModeTable" name="displayMode" value="Table"
            checked={ui.displayMode === "Table"} onChange={this.handleDisplayModeChange} />Table</div>
          </div>
        }
        {appMode === "dev" && this.props.children}
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
  private handleDisplayModeChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { ui } = this.stores;
    ui.setDisplayMode(e.currentTarget.value);
  }
  private handleShowLabelsChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { ui } = this.stores;
    ui.setShowLabels(e.currentTarget.checked);
  }
  private handleSimulationPlayToggle = (e: React.FormEvent<HTMLDivElement>) => {
    const { riverData, appMode } = this.stores;
    clearInterval(_playInterval);
    if (riverData.currentYear < 10) {
      if (riverData.isPlaying) {
        riverData.setIsPlaying(false);
      } else {
        riverData.setIsPlaying(true);
        this.simulationTick();
        const intervalTickRate = appMode === "dev" ? 1000 : simulationSpeed;
        _playInterval = setInterval(this.simulationTick, intervalTickRate);
      }
    }
  }
  private simulationTick = () => {
    const { riverData } = this.stores;
    if (riverData.isPlaying) {

      const nextYear = riverData.currentYear + 1;
      if (nextYear < 10) {
        riverData.setYear(nextYear);
      } else if (nextYear === 10) {
        riverData.setYear(nextYear);
        riverData.setIsPlaying(false);
      } else {
        riverData.setIsPlaying(false);
      }
    }
  }
  private handleSimulationReset = (e: React.FormEvent<HTMLDivElement>) => {
    const { riverData } = this.stores;
    riverData.setIsPlaying(false);
    riverData.setYear(1);
    clearInterval(_playInterval);
  }
}
