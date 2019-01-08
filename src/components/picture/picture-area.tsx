import * as React from "react";

import Scenery from "../../assets/imagery/scenery/scenery.svg";
import Water from "../../assets/imagery/water/water.svg";
import Frame from "../../assets/imagery/ornamentation/Frame.svg";
import Labels from "../../assets/imagery/ornamentation/Labels.svg";

export class PictureArea extends React.Component<{}, {}> {

  public render() {

    const containerStyle = {
      position: "relative",
      width: 600,
      height: 340
    } as React.CSSProperties;

    const innerStyle = {
      position: "absolute",
      width: 600,
      height: 340,
      top: 0,
      left: 0
    } as React.CSSProperties;

    return (
      <div style={containerStyle}>
        <div style={innerStyle}>
          <Scenery />
        </div>
        <div style={innerStyle}>
          <Water />
        </div>
        <div style={innerStyle}>
          <Frame />
        </div>
        <div style={innerStyle}>
          <Labels />
        </div>
      </div>
    );
  }

}
