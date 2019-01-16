import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueFormatterParams, AgGridEvent } from "ag-grid-community";
import { dataByFlow } from "../data/dam-data-utility";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./dam-data.sass";

interface IProps extends IBaseProps {}
interface IState { }

const visibleColumns = [
  "Year",
  "Season",
  "FarmLakeArea",
  "StartSeasonSurfaceArea",
  "StartSeasonVolume",
  "EndSeasonSurfaceArea",
  "EndSeasonVolume",
  "CornYieldFarmville",
  "CornYieldAgriburg"];

@inject("stores")
@observer
export class DamData extends BaseComponent<IProps, IState> {

  public render() {
    const { riverData } = this.stores;
    const cols = this.getDataColumns();
    console.log(riverData.flowPercentage);
    return (
      <div className="dam-data-grid">
        <AgGridReact columnDefs={cols} rowData={dataByFlow(riverData.flowPercentage)} headerHeight={48}
          onGridReady={this.onGridReady} />
      </div>
    );
  }

  private getDataColumns = (): ColDef[] => {
    const { riverData } = this.stores;
    const allData = dataByFlow(riverData.flowPercentage);

    const cols: ColDef[] = [];
    Object.keys(allData[0]).map(d => {
      if (visibleColumns.indexOf(d) > -1) {
        const headerName = d.replace(/([A-Z])/g, " $1").trim();
        const c: ColDef = { headerName, field: d, valueFormatter: this.numberFormatter };
        cols.push(c);
      }
    });
    return cols;
  }

  private numberFormatter = (v: ValueFormatterParams): string => {
    if (typeof (v.value) === "string") return v.value;
    const roundedValue = Math.round(v.value);
    return roundedValue.toString();
  }

  private onGridReady = (params: AgGridEvent) => {
    const gridApi = params.api;
    if (gridApi) {
      gridApi.sizeColumnsToFit();
    }
  }
}
