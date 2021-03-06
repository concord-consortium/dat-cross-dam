import * as React from "react";

import { BaseComponent, IBaseProps } from "../base";
import { inject, observer, propTypes } from "mobx-react";

import { rand } from "../../utilities/rand";

import Scenery from "../../assets/imagery/scenery/scenery.svg";
import Trees from "../../assets/imagery/scenery/trees.svg";
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

import Barn from "../../assets/imagery/buildings/Barn.svg";

import Field01 from "../../assets/imagery/fields/Field-01.svg";
import Field02 from "../../assets/imagery/fields/Field-02.svg";
import Field03 from "../../assets/imagery/fields/Field-03.svg";
import Field04 from "../../assets/imagery/fields/Field-04.svg";
import Field05 from "../../assets/imagery/fields/Field-05.svg";
import Field06 from "../../assets/imagery/fields/Field-06.svg";
import Field07 from "../../assets/imagery/fields/Field-07.svg";
import Field08 from "../../assets/imagery/fields/Field-08.svg";
import Field09 from "../../assets/imagery/fields/Field-09.svg";
import Field10 from "../../assets/imagery/fields/Field-10.svg";

import "./picture-area.sass";
import { SimulationControls } from "../controls/simulation-controls";
import { ControlArea } from "../controls/control-area";

interface IProps extends IBaseProps {
  parentWidth: number;
  parentHeight: number;
}

interface IBuilding {
  svgBuilding: SvgrComponent;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IBarn {
  x: number;
  y: number;
}

interface ITown {
  x: number;
  y: number;
  width: number;
  height: number;
  adjusted: boolean;
}

interface ICornField {
  svgField: SvgrComponent;
  x: number;
  y: number;
  width: number;
  height: number;
}

const innerStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0
};

const townFarmville: ITown = {
  x: 464,
  y: 94,
  width: 75,
  height: 30,
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
].map( (val, _ndx) => {
  const town = townFarmville;
  const movedBldg: IBuilding = {
    svgBuilding: val.svgBuilding,
    x: rand(town.x, town.x + town.width),
    y: rand(town.y, town.y + town.height),
    width: val.width,
    height: val.height
  };
  return (movedBldg);
});

const townAgriburg: ITown = {
  x: 220,
  y: 210,
  width: 85,
  height: 57,
  adjusted: false
};

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
].map( (val, _ndx) => {
  const town = townAgriburg;
  const movedBldg: IBuilding = {
    svgBuilding: val.svgBuilding,
    x: rand(town.x, town.x + town.width),
    y: rand(town.y, town.y + town.height),
    width: val.width,
    height: val.height
  };
  return (movedBldg);
});

@inject("stores")
@observer
export class PictureArea extends BaseComponent<IProps, {}> {

  public render() {

    const { riverData, ui, appMode } = this.stores;

    const { parentWidth, parentHeight } = this.props;

    const baseSizeWidth = 600;
    const baseSizeHeight = 340;
    const aspectRatio = parentWidth / parentHeight;
    const baseAspectRatio = baseSizeWidth / baseSizeHeight; // 1.765

    const width = aspectRatio >= baseAspectRatio ? parentHeight * baseAspectRatio : parentWidth;

    const simulationScale = width / baseSizeWidth;
    const height = baseSizeHeight * simulationScale;

    const renderScenery = () => {
      return (
        <div style={innerStyle}>
          <div style={innerStyle}>
            <Scenery width={width} height={height}/>
          </div>
          <div style={innerStyle}>
            <Trees width={width} height={height} />
          </div>
        </div>
      );
    };

    const renderOrnamentation = (labels: boolean) => {
      return (
        <div style={innerStyle}>
          <div style={innerStyle}>
            <Frame width={width} height={height}/>
          </div>
          <div style={innerStyle}>
            { labels === true ? <Labels width={width} height={height} /> : "" }
          </div>
        </div>
      );
    };

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
        case 0: return (<Rivers0  width={width} height={height} />);
        case 1: return (<Rivers25 width={width} height={height} />);
        case 2: return (<Rivers50 width={width} height={height} />);
        case 3: return (<Rivers75 width={width} height={height} />);
        default:
          // tslint:disable-next-line no-console
          console.error(`River set index, ${i}, not found.`);
          return (<Rivers0 width={width} height={height}/>);
      }
    };

    const renderRivers = (index: number) => {
      return (
        <div style={innerStyle}>
          {selectRivers(index)}
        </div>
      );
    };

    const renderLake = (lakeArea: number) => {

      const factor = width / 600.0;       // Factor determined by the actual display width.

      // Note: There is a slight problem here. The number we are getting, lakeArea is
      // actually an normalized of the acreage of the lake. We are actually using it here
      // as a linear measure of the lake which is then scaled vertically and horizontally.
      // In other words, we are using a two measures that actually do not have a linear
      // relationship, but rather, a squared relationship. At the moment, I kind of don't
      // think this error of design would make any difference to a user's interpretation
      // of the display -- so let's leave it for another day.

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

    const renderTown = (population: number, buildingList: IBuilding[], town: ITown) => {

      const factor = width / 600;

      const buildTown = () => {
        const list = [];
        const howManyBuildings = ((population + 1) / 100) * buildingList.length;
        const compareBases = (e1: IBuilding, e2: IBuilding) => {
          const b1 = e1.y;
          const b2 = e2.y;
          return (b1 === b2 ? 0 : (b1 > b2 ? 1 : -1));
        };
        let i = 0;
        for (const bldg of buildingList.slice(0, howManyBuildings).sort((e1, e2) => compareBases(e1, e2))) {
          const b = bldg.svgBuilding({
            width: bldg.width * factor,
            height: bldg.height * factor,
            transform: `translate(${(bldg.x - (bldg.width / 2)) * factor},
                                  ${(bldg.y - (bldg.height / 2)) * factor})`
          });
          list.push( (
            <div style={innerStyle} key={i++}>
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

    // The parameter, crops, is expected to be in the range 0..100. The number
    // of farms, which is represented by the number of barns displayed in each
    // town's farm-land, is mapped like this:
    //
    // |  crops  | barns |
    // |---------|-------|
    // |    0    |   0   |
    // |  1..32  |   1   |
    // |  33..64 |   2   |
    // | 65..100 |   3   |
    const howManyFarms = (crops: number) => {
      if (crops <= 0) {
        return 0;
      } else if (crops <= 32) {
        return 1;
      } else if (crops <= 64) {
        return 2;
      } else {
        return 3;
      }
    };

    const renderFarms = (crops: number, barns: IBarn[]) => {
      const factor = width / 600;
      const barnList = () => {
        return barns.slice(0, howManyFarms(crops)).map( (b, i) => {
          return (
            <div style={innerStyle} key={i}>
              <Barn width={28 * factor} height={22 * factor}
                transform={`translate(${b.x * factor}, ${b.y * factor})`} />
            </div>
          );
        });
      };

      return (
        <div style={innerStyle}>
          {barnList()}
        </div>
      );
    };

    const barnsFarmville: IBarn[] =  [
      {x: 450, y: 125},
      {x: 398, y: 168},
      {x: 519, y: 177}
    ];

    const barnsAgriburg: IBarn[] =  [
      {x: 210, y: 273},
      {x: 331, y: 290},
      {x: 465, y: 307}
    ];

    // The parameter, crops, is expected to be in the range 0..100. The number
    // of agricultural areas, which is represented by the number of corn fields
    // displayed in each town's farm-land, is mapped like this:
    //
    // |  crops  | corn fields |
    // |---------|-------------|
    // |  0..5   |      0      |
    // |  6..25  |      1      |
    // | 26..45  |      2      |
    // | 46..65  |      3      |
    // | 66..85  |      4      |
    // | 86..100 |      5      |

    const howManyFields = (crops: number, fields: ICornField[]) => {
      if (crops <= 5) {
        return 0;
      } else if (crops <= 25) {
        return 1;
      } else if (crops <= 45) {
        return 2;
      } else if (crops <= 65) {
        return 3;
      } else if (crops <= 85) {
        return 4;
      } else {
        return 5;
      }
    };

    const renderCornFields = (crops: number, fields: ICornField[]) => {

      const factor = width / 600;

      const fieldList = () => {
        return fields.slice(0, howManyFields(crops, fields)).map( (f, i) => {
          return (
            <div style={innerStyle} key={i}>
              {
                f.svgField({
                  transform: `translate(${f.x * factor}, ${f.y * factor})`,
                  width: f.width * factor,
                  height: f.height * factor
                })
              }
            </div>
          );
        });
      };

      return (
        <div style={innerStyle}>
          {fieldList()}
        </div>
      );
    };

    const cornFieldsFarmville: ICornField[] = [
      {
        svgField: Field06,
        x: 392,
        y: 152,
        width: 130,
        height: 53
      },
      {
        svgField: Field07,
        x: 520,
        y: 201,
        width: 45,
        height: 14
      },
      {
        svgField: Field08,
        x: 472,
        y: 139,
        width: 76,
        height: 26
      },
      {
        svgField: Field09,
        x: 510,
        y: 144,
        width: 86,
        height: 33
      },
      {
        svgField: Field10,
        x: 517,
        y: 127,
        width: 80,
        height: 20
      }
    ];

    const cornFieldsAgriburg: ICornField[] = [
      {
        svgField: Field01,
        x: 230,
        y: 277,
        width: 68,
        height: 35
      },
      {
        svgField: Field02,
        x: 281,
        y: 281,
        width: 44,
        height: 36
      },
      {
        svgField: Field03,
        x: 302,
        y: 260,
        width: 25,
        height: 20
      },
      {
        svgField: Field04,
        x: 337,
        y: 248,
        width: 126,
        height: 62
      },
      {
        svgField: Field05,
        x: 364,
        y: 300,
        width: 48,
        height: 25
      }
    ];

    // The picture display is controlled by 7 values. One is from the ui store
    // and the rest come from the riverData.
    //
    // The populations of the two towns are based on their residential water
    // usage, respectively. From a simulation perspective, this makes pretty
    // good sense, but the data provided to us doesn't have enough fidelity
    // (or perhaps, resolution) to make it look good. That's a different
    // problem.

    const isDev = appMode === "dev";

    const showLabels = ui.showLabels;
    const flowPercentage = riverData.flowPercentage;
    const currentLakeArea = isDev ? ui.lakeArea : riverData.getCurrentLakeArea();
    const currentCropsAgriburg = isDev ? ui.cropsArgiburg : riverData.getCropsAgriburg();
    const currentCropsFarmville = isDev ? ui.cropsFarmville : riverData.getCropsFarmville();
    const populationAgriburg = isDev ? ui.populationAgriburg : riverData.getResidentialUseAgriburg();
    const populationFarmville = isDev ? ui.populationFarmville : riverData.getResidentialUseFarmville();

    // Except for showLabels, which is a boolean, and flowPercentage, which is
    // one of values in the set fixed values { 0, 25, 50, 75 }, the remaining
    // values are in the range 0..100.

    if (isDev || appMode === "displayOnConsole") {
      // tslint:disable-next-line no-console
      console.log(`%  lake  AC  FC  AP  FP\n` +
                  `${flowPercentage}\t` +
                  `${Math.round(currentLakeArea)}\t` +
                  `${Math.round(currentCropsAgriburg)}\t` +
                  `${Math.round(currentCropsFarmville)}\t` +
                  `${Math.round(populationAgriburg)}\t` +
                  `${Math.round(populationFarmville)}`);
    }

    const controlContainerStyle: React.CSSProperties = {
      position: "absolute",
      width: "95%",
      height: "100%",
      top: 0,
      left: 0
    };
    controlContainerStyle.top = height;

    return (
      <div className="subsection simulation">
        <div className="picture-area-container">
          { renderScenery() }
          { renderRivers(flowPercentage / 25) }
          { renderLake(currentLakeArea) }
          { renderDamn() }
          { renderTown(populationFarmville, buildingsFarmville, townFarmville)}
          { renderCornFields(currentCropsFarmville, cornFieldsFarmville)}
          { renderFarms(currentCropsFarmville, barnsFarmville)}
          { renderTown(populationAgriburg, buildingsAgriburg, townAgriburg)}
          { renderCornFields(currentCropsAgriburg, cornFieldsAgriburg)}
          { renderFarms(currentCropsAgriburg, barnsAgriburg)}
          { renderOrnamentation(showLabels)}
        </div>
        <SimulationControls style={controlContainerStyle}>
          <ControlArea />
        </SimulationControls>
      </div>
    );
  }

}
