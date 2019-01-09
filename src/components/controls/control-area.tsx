import * as React from "react";
import Slider from "rc-slider";
import { CheckBox } from "./check-box";
import { BaseComponent, IBaseProps } from "../base";
import { IPictureParams } from "../app";

export interface IProps extends IBaseProps {
  pictureParams: IPictureParams;
  onChange: (newPictureParams: IPictureParams) => void;
}

export class ControlArea extends BaseComponent<IProps, {}> {

  public render() {

    const toggleLabels = (isChecked: boolean) => {
      // console.log("--------- in toggleLabels " + isChecked);
      const pp = this.props.pictureParams;
      pp.showLabels = isChecked;
      this.props.onChange(pp);
    };

    const dragAP = (value: number) => {
      // console.log("drag of slider: " + value);
      const pp = this.props.pictureParams;
      pp.populationAgriburg = value;
      this.props.onChange(pp);
    };

    const dragFP = (value: number) => {
      // console.log("drag of slider: " + value);
      const pp = this.props.pictureParams;
      pp.populationFarmVille = value;
      this.props.onChange(pp);
    };

    const dragARV = (value: number) => {
      // console.log("drag of slider: " + value);
    };

    const dragFRV = (value: number) => {
      // console.log("drag of slider: " + value);
    };

    const dragFLA = (value: number) => {
      // console.log("drag of slider: " + value);
    };

    const dragAFA = (value: number) => {
      // console.log("drag of slider: " + value);
    };

    const dragFFA = (value: number) => {
      // console.log("drag of slider: " + value);
    };

    const sliderStyle = {
      width: "400px"
    };

    return (
      <div>
        <div>
          <CheckBox label="Show Map Labels" isChecked={this.props.pictureParams.showLabels} onChange={toggleLabels} />
        </div>
        <div>
          Agriburg Propulation: <Slider style={sliderStyle} min={0} max={9} onChange={dragAP}
          value={this.props.pictureParams.populationAgriburg} />
        </div>
        <div>
          Farmville Propulation: <Slider style={sliderStyle} min={0} max={9} onChange={dragFP}
          value={this.props.pictureParams.populationFarmVille } />
        </div>
        <div>
          Agriburg River Volume: <Slider style={sliderStyle} min={0} max={9} onChange={dragARV} />
        </div>
        <div>
          Farm River Volume: <Slider style={sliderStyle} min={0} max={9} onChange={dragFRV} />
        </div>
        <div>
          Farm Lake Acreage: <Slider style={sliderStyle} min={0} max={9} onChange={dragFLA} />
        </div>
        <div>
          Agriburg Farm Acreage: <Slider style={sliderStyle} min={0} max={9} onChange={dragAFA} />
        </div>
        <div>
          Farmville Farm Acreage: <Slider style={sliderStyle} min={0} max={9} onChange={dragFFA} />
        </div>
      </div>
    );
  }

}
