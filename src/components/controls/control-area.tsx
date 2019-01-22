import * as React from "react";
import Slider from "rc-slider";
import { BaseComponent } from "../base";
import { observer, inject } from "mobx-react";

/*
 * The entire purpose of this "control-area" is temporary. It's just a quick
 * way of adjusting the display parameters before the display (that is, the
 * "picture-area" is wired-up to the simulation.)
 */

@inject("stores")
@observer
export class ControlArea extends BaseComponent<{}, {}> {

  public render() {

    const { ui } = this.stores;

    return (
      <div>
        <hr />
        <span><b>Test SVG Display Controls <i>(Development Only)</i></b></span>
        <br /><br />
        Agriburg Population ({ui.populationAgriburg}):
        <Slider min={0} max={99} value={ui.populationAgriburg} onChange={ui.setPopAgriburg} />
        Farmville Population ({ui.populationFarmville}):
        <Slider min={0} max={99} value={ui.populationFarmville} onChange={ui.setPopFarmville} />
        Farm Lake Acreage ({ui.lakeArea}%):
        <Slider min={0} max={99} value={ui.lakeArea} onChange={ui.setLakeArea} />
        Agriburg Farm Acreage ({ui.cropsArgiburg}):
        <Slider min={0} max={99} value={ui.cropsArgiburg} onChange={ui.setCropsAgriburg} />
        Farmville Farm Acreage ({ui.cropsFarmville}):
        <Slider min={0} max={99} value={ui.cropsFarmville} onChange={ui.setCropsFarmville} />
      </div>
    );
  }
}
