import * as React from "react";
import Slider from "rc-slider";
import { CheckBox } from "./check-box";
import { BaseComponent, IBaseProps } from "../base";
import { IPictureParams } from "../app";

interface IProps extends IBaseProps {
  pictureParams: IPictureParams;
  onChange: (newPictureParams: IPictureParams) => void;
}

interface IState {
}

/*
 * The entire purpose of this "control-area" is temporary. It's just a quick
 * way of adjusting the display parameters before the display (that is, the
 * "picture-area" is wired-up to the simulation.)
 */

export class ControlArea extends BaseComponent<IProps, IState> {

  public render() {

    const toggleLabels = (isChecked: boolean) => {
      const pp = this.props.pictureParams;
      pp.showLabels = isChecked;
      this.props.onChange(pp);
    };

    const toggleDam = (isChecked: boolean) => {
      const pp = this.props.pictureParams;
      pp.showDam = isChecked;
      this.props.onChange(pp);
    };

    const dragAP = (value: number) => {
      const pp = this.props.pictureParams;
      pp.populationAgriburg = value;
      this.props.onChange(pp);
    };

    const dragFP = (value: number) => {
      const pp = this.props.pictureParams;
      pp.populationFarmville = value;
      this.props.onChange(pp);
    };

    const dragDivert = (value: number) => {
      const pp = this.props.pictureParams;
      pp.waterDivertedToFarmRiver = value;
      this.props.onChange(pp);
    };

    const dragLakeArea = (value: number) => {
      const pp = this.props.pictureParams;
      pp.lakeArea = value;
      this.props.onChange(pp);
    };

    const dragAgriburgCrops = (value: number) => {
      const pp = this.props.pictureParams;
      pp.cropsArgiburg = value;
      this.props.onChange(pp);
    };

    const dragFarmvilleCrops = (value: number) => {
      const pp = this.props.pictureParams;
      pp.cropsFarmville = value;
      this.props.onChange(pp);
    };

    const sliderStyle = {
      width: "400px"
    };

    return (
      <div>
        <hr />
        <span><b>Temp. Display Controls <i>(To Be Removed!!!)</i></b></span>
        <CheckBox label="Map Labels" isChecked={this.props.pictureParams.showLabels} onChange={toggleLabels} />
        <CheckBox label="Show Dam" isChecked={this.props.pictureParams.showDam} onChange={toggleDam} />
        Agriburg Population ({this.props.pictureParams.populationAgriburg}):
          <Slider style={sliderStyle} min={0} max={99} onChange={dragAP}
          value={this.props.pictureParams.populationAgriburg} />
        Farmville Population ({this.props.pictureParams.populationFarmville}):
          <Slider style={sliderStyle} min={0} max={99} onChange={dragFP}
          value={this.props.pictureParams.populationFarmville} />
        ({this.props.pictureParams.waterDivertedToFarmRiver * 25}%) Water diverted to Farmville:
          <Slider style={sliderStyle} min={0} max={3} onChange={dragDivert}
          value={this.props.pictureParams.waterDivertedToFarmRiver} />
        ({this.props.pictureParams.lakeArea}) Farm Lake Acreage:
          <Slider style={sliderStyle} min={0} max={99} onChange={dragLakeArea}
          value={this.props.pictureParams.lakeArea} />
        {/* ({this.props.pictureParams.cropsArgiburg}) Agriburg Farm Acreage:
          <Slider style={sliderStyle} min={0} max={99} onChange={dragAgriburgCrops}
          value={this.props.pictureParams.cropsArgiburg} />
        ({this.props.pictureParams.cropsFarmville}) Farmville Farm Acreage:
          <Slider style={sliderStyle} min={0} max={99} onChange={dragFarmvilleCrops}
          value={this.props.pictureParams.cropsFarmville} /> */}
      </div>
    );
  }

}
