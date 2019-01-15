import * as React from "react";

import { IPictureParams } from "../app";
import { BaseComponent, IBaseProps } from "../base";

import Scenery from "../../assets/imagery/scenery/scenery.svg";
import Rivers0 from "../../assets/imagery/water/rivers0.svg";
import Rivers25 from "../../assets/imagery/water/rivers25.svg";
import Rivers50 from "../../assets/imagery/water/rivers50.svg";
import Rivers75 from "../../assets/imagery/water/rivers75.svg";
import Lake from "../../assets/imagery/water/lake.svg";
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
  pictureParams: IPictureParams;
  width: number;
}

interface IState {
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

    const { width } = this.props;
    const { showLabels, showDam } = this.props.pictureParams;

    const innerStyle: React.CSSProperties = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    };

    const renderScenery = () => {
      return (
        <div style={innerStyle}>
          <Scenery />
        </div>
      );
    };

    const renderTrees = () => {
      return (
        <div style={innerStyle}>
          "" {/* Temporary place holder til the tree layer is in place. */}
        </div>
      );
    };

    const renderRivers = (index: number) => {

      const selectRivers = (i: number) => {
        /*
         * The rivers and canal have 4 possible display versions which are
         * drawn (in the associated SVG file) according to this scheme:
         *
         * |       |   % of   |            Waterway              |
         * | Index |   Water  |----------|-----------|-----------|
         * |       | Diverted | Arigburg |    Farm   |   Canal   |
         * |-------|----------|----------|-----------|-----------|
         * |   0   |     0%   | Wide     | Low       | Brown     |
         * |   1   |    25%   | Nominal  | Nominal   | Nominal   |
         * |   2   |    50%   | Low      | Wide      | Wide      |
         * |   3   |    75%   | Trickle  | Very Wide | Very Wide |
         */
        switch (i) {
          case 0: return (<Rivers0 />);
          case 1: return (<Rivers25 />);
          case 2: return (<Rivers50 />);
          case 3: return (<Rivers75 />);
          default:
            // tslint:disable no-console
            console.error("The indicated river set index not found.");
            // tslint:enable no-console
            return (<Rivers0 />);
        }
      };

      return (
        <div style={innerStyle}>
          {selectRivers(index)}
        </div>
      );
    };

    const renderLake = (lakeArea: number) => {

      const factor = width / 600.0;       // Factor determined by the actual display width.

      const minLakeScale = 0.7;           // Limits of scaling factor lake -- used with
      const maxLakeScale = 1.5;           // lakeArea to compute the final size.
      const scale = (maxLakeScale - minLakeScale) * ((lakeArea + 1) / 100) + minLakeScale;

      const lakeWidth = 96;               // Design size of lake SVG graphic.
      const lakeHeight = 28;
      const w = lakeWidth * scale;
      const h = lakeHeight * scale;
      const x = 410;                      // Design location (top-left) of lake.
      const y = 135;

      const lake = Lake({
        width: w * factor,
        height: h * factor,
        transform: `translate(${(x - (w / 2)) * factor},
                              ${(y - (h / 2)) * factor})`
      });

      return(
        <div style={innerStyle}>
          {lake}
        </div>
      );
    };

    const renderDamn = () => {
      const factor = width / 600.0;
      const scale = 1.15;
      const w = 22 * scale;
      const h = 18 * scale;
      const x = 137;
      const y = 134;
      const dam = Dam({
        width: w * factor,
        height: h * factor,
        transform: `translate(${(x - (w / 2)) * factor},
                              ${(y - (h / 2)) * factor})`

      });
      return(
        <div style={innerStyle}>
          {dam}
        </div>
      );
    };

    const renderLabels = () => {
      return (
        <div style={innerStyle}>
          <Labels />
        </div>
      );
    };

    const renderFrame = () => {
      return (
        <div style={innerStyle}>
          <Frame />
        </div>
      );
    };

    return (
      <div style={innerStyle}>
        { renderScenery() }
        { renderTrees() }
        { renderRivers(this.props.pictureParams.waterDivertedToFarmRiver) }
        { renderLake(this.props.pictureParams.lakeArea) }
        { showDam === true ? renderDamn() : "" }
        {/* { this.renderAgriburg(this.props.pictureParams.populationAgriburg) } */}
        {/* { this.renderFarmVille(this.props.pictureParams.populationFarmVille) } */}
        { showLabels === true ? renderLabels() : ""}
        { renderFrame() }
        <div style={innerStyle}>
          <span>DEBUGGING - Width: {width}</span>
        </div>
      </div>
    );
  }

  private renderFarmVille(population: number) {
    // Generate one building per unit of population.

    const divStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    } as React.CSSProperties;

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
          <div style={divStyle}>
            {town[i].svgBuilding}
          </div>
        );
      }
      return list;
    };

    return (
      <div style={divStyle}>
        {buildings()}
      </div>
    );
  }

  private renderAgriburg(population: number) {
    // Generate one building per unit of population.

    const x = 400;
    const y = 395;
    const xScale = 1.4;
    const yScale = 1.4;
    const transformBase = `translate(${x}, ${y}) scale(${xScale}, ${yScale})`;

    const createTransform = (x1: number, y1: number, scale: number) => {
      return      `translate(${x1}, ${y1}) scale(${scale}, ${scale})`;
    };

    const town = [
      { svgBuilding: <LongHouseRedRoof transform={transformBase} /> },
      { svgBuilding: <SmallHouseBlue2DRoof transform="translate(355, 395) scale(1.4, 1.4)" /> },
      { svgBuilding: <SmallHouseBlue transform="translate(380, 400) scale(1.4, 1.4)" /> },
      { svgBuilding: <SmallHousePink transform="translate(355, 390) scale(1.4, 1.4)" /> },
      { svgBuilding: <SmallHouseWhite transform="translate(360, 385) scale(1.4, 1.4)" /> },
      { svgBuilding: <LongHouseGrayRoof transform="translate(350, 400) scale(-1.4, 1.4)" /> },
      { svgBuilding: <LongHouseRedRoof transform={createTransform(350, 380, 1.9)} /> },
      { svgBuilding: <SmallHouseBlue2DRoof transform="translate(355, 395) scale(1.4, 1.4)" /> },
      { svgBuilding: <SmallHouseBlue transform="translate(380, 400) scale(1.4, 1.4)" /> },
      { svgBuilding: <SmallHousePink transform="translate(355, 390) scale(1.4, 1.4)" /> },
      { svgBuilding: <SmallHouseWhite transform="translate(360, 385) scale(1.4, 1.4)" /> }
    ];

    const divStyle = {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0
    } as React.CSSProperties;

    const buildings = () => {
      const list = [];
      for (let i = 0; i < population; i++) {
        list.push(
          <div style={divStyle}>
            {town[i].svgBuilding}
          </div>
        );
      }
      return list;
    };

    return (
      <div style={divStyle}>
        {buildings()}
      </div>
    );
  }

}
