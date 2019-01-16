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

interface IBuilding {
  svgBuilding: SvgrComponent;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ITown {
  x: number;
  y: number;
  width: number;
  height: number;
  adjusted: boolean;
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

    const renderTown = (population: number, buildingList: IBuilding[], town: ITown) => {

      const factor = width / 600;

      const newBuildingList = buildingList.map( (val, _ndx) => {
        const random = (low: number, high: number) => {
          return Math.floor(Math.random() * (high - low + 1) + low);
        };
        const movedBldg: IBuilding = {
          svgBuilding: val.svgBuilding,
          x: random(town.x, town.x + town.width),
          y: random(town.y, town.y + town.height),
          width: val.width,
          height: val.height
        };
        return (movedBldg);
      });

      const buildTown = () => {
        const list = [];
        const howManyBuildings = ((population + 1) / 100) * buildingList.length;
        const compareBases = (e1: IBuilding, e2: IBuilding) => {
          const b1 = e1.y;
          const b2 = e2.y;
          return (b1 === b2 ? 0 : (b1 > b2 ? 1 : -1));
        };
        for (const bldg of newBuildingList.slice(0, howManyBuildings).sort((e1, e2) => compareBases(e1, e2))) {
          const b = bldg.svgBuilding({
            width: bldg.width * factor,
            height: bldg.height * factor,
            transform: `translate(${(bldg.x - (bldg.width / 2)) * factor},
                                  ${(bldg.y - (bldg.height / 2)) * factor})`
          });
          list.push( (
            <div style={innerStyle}>
              {b}
            </div>
            ));
        }
        return list;
      };
      return (
        <div style={innerStyle}>
          {population > 0 ? buildTown() : ""}
        </div>
      );
    };

    const townFarmville: ITown = {
      x: 460,
      y: 90,
      width: 75,
      height: 30,
      adjusted: false
    };

    const townAgriburg: ITown = {
      x: 212,
      y: 210,
      width: 95,
      height: 57,
      adjusted: false
    };

    const buildingsFarmville: IBuilding[] = [
      { svgBuilding: LongHouseGrayRoof,    x: 52, y: 70, width: 26, height: 14 },
      { svgBuilding: SmallHouseBlue,       x: 20, y: 80, width: 12, height: 10 },
      { svgBuilding: SmallHouseBlue2DRoof, x: 55, y: 95, width: 15, height: 15 },
      { svgBuilding: SmallHouseBlue,       x: 70, y:  0, width: 13, height: 15 },
      { svgBuilding: SmallHousePink,       x: 55, y:  0, width: 12, height: 15 },
      { svgBuilding: SmallHouseWhite,      x: 60, y: 85, width: 14, height: 15 },
      { svgBuilding: LongHouseGrayRoof,    x: 50, y:  0, width: 26, height: 14 },
      { svgBuilding: SmallHouseBlue2DRoof, x: 55, y: 95, width: 11, height: 15 },
      { svgBuilding: SmallHouseBlue,       x: 70, y:  0, width: 12, height: 10 },
      { svgBuilding: SmallHousePink,       x: 55, y: 90, width: 16, height: 15 },
      { svgBuilding: SmallHouseWhite,      x: 60, y: 85, width: 17, height: 15 },
      { svgBuilding: LongHouseRedRoof,     x: 40, y: 70, width: 27, height: 13 },
    ];

    const buildingsAgriburg: IBuilding[] = [
      { svgBuilding: LongHouseGrayRoof,    x: 52, y: 70, width: 26, height: 14 },
      { svgBuilding: SmallHouseBlue,       x: 20, y: 80, width: 12, height: 10 },
      { svgBuilding: SmallHouseBlue2DRoof, x: 55, y: 95, width: 15, height: 15 },
      { svgBuilding: SmallHouseBlue,       x: 70, y:  0, width: 13, height: 15 },
      { svgBuilding: SmallHousePink,       x: 55, y:  0, width: 12, height: 15 },
      { svgBuilding: SmallHouseWhite,      x: 60, y: 85, width: 14, height: 15 },
      { svgBuilding: LongHouseGrayRoof,    x: 50, y:  0, width: 26, height: 14 },
      { svgBuilding: SmallHouseBlue2DRoof, x: 55, y: 95, width: 11, height: 15 },
      { svgBuilding: SmallHouseBlue,       x: 70, y:  0, width: 12, height: 10 },
      { svgBuilding: SmallHousePink,       x: 55, y: 90, width: 16, height: 15 },
      { svgBuilding: SmallHouseWhite,      x: 60, y: 85, width: 17, height: 15 },
      { svgBuilding: LongHouseRedRoof,     x: 40, y: 70, width: 27, height: 13 },
    ];

    return (
      <div style={innerStyle}>
        { renderScenery() }
        { renderTrees() }
        { renderRivers(this.props.pictureParams.waterDivertedToFarmRiver) }
        { renderLake(this.props.pictureParams.lakeArea) }
        { showDam === true ? renderDamn() : "" }
        { renderTown(this.props.pictureParams.populationFarmville, buildingsFarmville, townFarmville)}
        { renderTown(this.props.pictureParams.populationAgriburg, buildingsAgriburg, townAgriburg)}
        { showLabels === true ? renderLabels() : ""}
        { renderFrame() }
        <div style={innerStyle}>
          <span>DEBUGGING - Width: {width}</span>
        </div>
      </div>
    );
  }

}
