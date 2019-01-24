import * as React from "react";
import { inject, observer } from "mobx-react";
import { BaseComponent } from "../base";

import "./data-controls.sass";

interface IProps {}
interface IState {}

const labelText: any = {
  corn: "Corn Yield",
  lake: "Lake Surface Area"
};

@inject("stores")
@observer
export class DataControls extends BaseComponent<IProps, IState> {
  public render() {
    const { riverData } = this.stores;

    const dataTypeButton = (dataOption: string) => {
      const optionId = "data-type-" + dataOption;
      const optionStyle =
        riverData.dataView === dataOption ?
          "data-option " + dataOption + " selected" :
          "data-option " + dataOption;
      const labelToDisplay = labelText[dataOption];
      return (
        <div className={optionStyle}>
          <label htmlFor={optionId}>{labelToDisplay}</label>
          <input type="radio" id={optionId} name="dataType" value={dataOption}
            checked={riverData.dataView === dataOption} onChange={this.handleChangeDataSelection} />
        </div>
      );
    };

    return (
      <div className="data-analysis-type">
        {dataTypeButton("corn")}
        {dataTypeButton("lake")}

      </div>
    );
  }

  private handleChangeDataSelection = (e: any) => {
    const { riverData } = this.stores;
    const selectedValue = e.currentTarget.value ? e.currentTarget.value : "lake";
    if (selectedValue !== riverData.dataView) {
      riverData.setDataView(selectedValue);
    }
  }
}
