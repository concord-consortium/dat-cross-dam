import * as React from "react";

import { IPictureParams } from "../app";
import { BaseComponent, IBaseProps } from "../base";

import Scenery from "../../assets/imagery/scenery/scenery.svg";
import Water from "../../assets/imagery/water/water.svg";
import Frame from "../../assets/imagery/ornamentation/Frame.svg";
import Labels from "../../assets/imagery/ornamentation/Labels.svg";
import Dam from "../../assets/imagery/dam/dam.svg";

import LongHouseGrayRoof from "../../assets/imagery/buildings/LongHouseGrayRoof.svg";
import LongHouseRedRoof from "../../assets/imagery/buildings/LongHouseRedRoof.svg";
import SmallHouseBlue from "../../assets/imagery/buildings/SmallHouseBlue.svg";
import SmallHouseBlue2DRoof from "../../assets/imagery/buildings/SmallHouseBlue2D.svg";
import SmallHousePink from "../../assets/imagery/buildings/SmallHousePink.svg";
import SmallHouseWhite from "../../assets/imagery/buildings/SmallHouseWhite.svg";

interface IProps extends IBaseProps {
//  showLabels: boolean;
  pictureParams: IPictureParams;
}

interface IState {
//  showLabels: boolean;
}

interface IBuildingInstance {
  svgBuilding: SvgrComponent;
}

export class PictureArea extends BaseComponent<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { showLabels: true };
  }

  public render() {

    const containerStyle = {
      position: "relative",
    } as React.CSSProperties;

    const innerStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    } as React.CSSProperties;

    const renderLabels = () => {
      return (
        <div style={innerStyle}>
          <Labels transform="translate(180, 115) scale(1.55, 1.6)" />
        </div>
      );
    };

    const { showLabels, showDam } = this.props.pictureParams;

    // console.log("---- this.props.showLabels " + this.props.showLabels === "true");
    // console.log("---- " + JSON.stringify(this.props))

    return (
      <div style={containerStyle}>
        <div style={innerStyle}>
          <Scenery transform="translate(0, 0)"/>
        </div>
        <div style={innerStyle}>
          <Water transform="translate(167, 124)"/>
        </div>
        <div style={innerStyle}>
          { showDam === true ? <Dam transform="translate(176, 181)"/> : "" }
        </div>
        { this.renderFarmVille(this.props.pictureParams.populationFarmVille) }
        { showLabels === true ? renderLabels() : ""}
        <div style={innerStyle}>
          <Frame transform="translate(0, 0)"/>
        </div>
      </div>
    );
  }

  private renderFarmVille(population: number) {
    // Generate one building per unit of population.

    const town = [
      { svgBuilding: <SmallHouseBlue2DRoof transform="translate(755, 195) scale(1, 1)" /> },
      { svgBuilding: <SmallHouseBlue transform="translate(780, 200) scale(1, 1)" /> },
      { svgBuilding: <SmallHousePink transform="translate(755, 190) scale(1, 1)" /> },
      { svgBuilding: <SmallHouseWhite transform="translate(760, 185) scale(1, 1)" /> },
      { svgBuilding: <LongHouseGrayRoof transform="translate(750, 200) scale(1, 1)" /> },
      { svgBuilding: <SmallHouseBlue2DRoof transform="translate(755, 195) scale(1, 1)" /> },
      { svgBuilding: <SmallHouseBlue transform="translate(780, 200) scale(1, 1)" /> },
      { svgBuilding: <SmallHousePink transform="translate(755, 190) scale(1, 1)" /> },
      { svgBuilding: <SmallHouseWhite transform="translate(760, 185) scale(1, 1)" /> }
    ];

    const buildings = () => {
      const list = [];
      for (let i = 0; i < population; i++) {
        list.push(
          <div>
            {town[i].svgBuilding}
          </div>
        );
      }
      return list;
    };

    return (
      <div>
        {buildings()}
      </div>
    );
  }

}
