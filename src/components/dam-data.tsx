import { inject, observer } from "mobx-react";
import * as React from "react";
import { BaseComponent, IBaseProps } from "./base";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ValueFormatterParams, AgGridEvent } from "ag-grid-community";
import { dataByFlowUpToYear } from "../data/dam-data-utility";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "./dam-data.sass";

interface IProps extends IBaseProps {
  parentWidth: number;
  parentHeight: number;
}
interface IState { }

const visibleColumnsCorn = [
  "Year",
  "CornYieldFarmville",
  "CornYieldAgriburg"];

const lakeColumnHeaders = {
  FarmLakeArea: "Start Season Area (acre)",
  EndSeasonSurfaceArea: "End Season Area (acre)"
};
const cornColumnHeaders = {
  CornYieldFarmville: "Yield Farmville (bushels/acre)",
  CornYieldAgriburg: "Yield Agriburg (bushels/acre)"
};

const visibleColumnsLake = [
  "Year",
  "FarmLakeArea",
  "EndSeasonSurfaceArea"];

@inject("stores")
@observer
export class DamData extends BaseComponent<IProps, IState> {
  public render() {
    const { riverData } = this.stores;
    const { parentWidth, parentHeight } = this.props;
    const gridStyle: React.CSSProperties = {
      width: parentWidth && parentWidth > 300 ? parentWidth : 300,
      height: parentHeight,
      maxHeight: "300px"
    };
    const cols = this.getDataColumns();
    const tableData = dataByFlowUpToYear(riverData.flowPercentage, riverData.currentYear).filter(d => {
      if (d.Year <= 10 && d.Season === "Summer") return d;
      return;
    });
    return (
      <div className="dam-data-grid" style={gridStyle}>
        <AgGridReact columnDefs={cols} rowData={tableData} headerHeight={30} rowHeight={22}
          onGridReady={this.onGridReady} onNewColumnsLoaded={this.onGridReady} />
      </div>
    );
  }

  private getDataColumns = (): ColDef[] => {
    const { riverData } = this.stores;
    const allData = dataByFlowUpToYear(riverData.flowPercentage, riverData.currentYear);
    const visibleColumns = riverData.dataView === "lake" ? visibleColumnsLake : visibleColumnsCorn;
    const cols: ColDef[] = [];
    Object.keys(allData[0]).map(d => {
      if (visibleColumns.indexOf(d) > -1) {
        let headerName = d.replace(/([A-Z])/g, " $1").trim();

        // Compensating for original data column name displayability
        if (d === "FarmLakeArea") {
          headerName = lakeColumnHeaders.FarmLakeArea;
        }
        if (d === "EndSeasonSurfaceArea") {
          headerName = lakeColumnHeaders.EndSeasonSurfaceArea;
        }
        if (d === "CornYieldAgriburg") {
          headerName = cornColumnHeaders.CornYieldAgriburg;
        }
        if (d === "CornYieldFarmville") {
          headerName = cornColumnHeaders.CornYieldFarmville;
        }
        const c: ColDef = {
          headerName, field: d,
          valueFormatter: this.numberFormatter,
          width: 135,
          suppressSizeToFit: false,
          cellClass: "dam-value"
        };
        if (headerName === "Year") {
          c.width = 50;
          c.suppressSizeToFit = true;
          c.cellClass = "dam-year";
        }
        if (visibleColumns.indexOf(d) !== 0) {
          c.cellClass += " value" + visibleColumns.indexOf(d);
        }
        c.cellClass += " " + riverData.dataView;

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
