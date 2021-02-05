import React, { Component } from "react";
import {
  Toolbar,
  NoClickOverlay,
  NoClickToolbar,
} from "../../styledComponents";
import Tool from "./Tool";
import Effects from "./Effects";
import Filters from "./Filters";
import Crop from "./Crop";
import Resize from "./Resize";
import Orientation from "./Orientation";
import Adjust from "./Adjust";
import Watermark from "./Watermark";
import FocusPoint from "./FocusPoint";
import Shapes from "./Shapes";
import Image from "./Image";
import Text from "./Text";
import Edit from "./Edit";
import "bootstrap/dist/css/bootstrap.min.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "../icon/Icon";
import styled from "styled-components";

export default class extends Component {
  render() {
    const {
      activeTool,
      isActiveToolbox,
      isShowSpinner,
      activeBody,
      config,
    } = this.props;

    const SpanIcon = styled.span`
      position: absolute;
      top: -20px;
      right: 0px;
      color: #a1a1a1;

      &:hover {
        color: white;
        cursor: pointer;
      }
    `;

    return (
      <div
        className="position-relative"
        style={{ overflowY: "visible", height: "100%" }}
      >
        <SpanIcon onClick={() => isActiveToolbox()}>
          <span>
            <Icon name="circle-with-cross" />
          </span>
        </SpanIcon>

        <PerfectScrollbar>
          {activeTool === "Edit" && <Edit {...this.props} />}
          {activeTool === "Text" && <Text {...this.props} />}
          {activeTool === "Saturation Effects" && <Effects {...this.props} />}
          {activeTool === "Add logo" && <Image {...this.props} />}
          {/* {activeTab === 'effects' && <Effects {...this.props}/>}
            {activeTab === 'filters' && <Filters {...this.props}/>}
            {activeTab === 'rotate' && <Orientation {...this.props}/>}
            {activeTab === 'crop' && <Crop {...this.props}/>}
            {activeTab === 'resize' && <Resize {...this.props}/>}
            {activeTab === 'watermark' && <Watermark {...this.props}/>}
            {activeTab === 'focus_point' && <FocusPoint {...this.props}/>}
            {activeTab === 'shapes' && <Shapes {...this.props}/>}
            {activeTab === 'image' && <Image {...this.props}/>}
            {activeTab === 'text' && <Text {...this.props}/>} */}
          {isShowSpinner && <NoClickOverlay />}
          {activeBody !== "preview" && <NoClickToolbar />}
        </PerfectScrollbar>
      </div>
    );
  }
}
