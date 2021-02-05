import React, { Component } from "react";
import {
  Footer,
  PreviousBtn,
  NextBtn,
  ResetBtn,
  Switcher,
  FullscreenBtn,
  FooterItemsWrapper,
} from "../../styledComponents";
import { toggleModalFullscreen } from "../../utils/full-screen-handle";
import "bootstrap/dist/css/bootstrap.min.css";
import Icon from "../icon/Icon";
import MuiIconButton from "@material-ui/core/IconButton";
import MuiButton from "@material-ui/core/Button";
import { SCALE_PERCENTAGE } from "../../config";
import Select from "antd/lib/select";
import { withStyles } from "@material-ui/core/styles";

const IconButton = withStyles({
  root: {
    color: "#a1a1a1",
    "&:hover, &:focus": {
      color: "white",
      transition: "0.5s ease",
    },
  },
})(MuiIconButton);

const Button = withStyles({
  root: {
    textTransform: "capitalize",
    color: "#a1a1a1",
    fontSize: "12px",
    fontFamily: "Poppins",
  },
})(MuiButton);

const { Option } = Select;
export default class extends Component {
  onApplyWatermarkChange = () => {
    this.props.updateState({
      watermark: {
        ...this.props.watermark,
        applyByDefault: !this.props.watermark.applyByDefault,
      },
    });
  };

  render() {
    const {
      initialZoom,
      operations,
      operationsZoomed,
      currentOperation = null,
      redoOperation,
      resetOperations,
      activeBody,
      t,
      logoImage,
      watermark,
      config,
    } = this.props;
    // const { elementId } = config;
    const operationList = initialZoom === 1 ? operations : operationsZoomed;
    const currentOperationIndex = operationList.findIndex(
      (operation) => operation === currentOperation
    );
    const isCurrentOperationLast =
      currentOperation &&
      operationList[operationList.length - 1] === currentOperation;
    const isPrevForbidden =
      operationList.length < 1 || currentOperationIndex === -1;
    const isNextForbidden =
      (operationList.length < 2 ||
        (operationList.length > 1 && isCurrentOperationLast)) &&
      (currentOperationIndex !== -1 || operationList.length !== 1);

    const zoom_scale = SCALE_PERCENTAGE;
    return (
      <Footer>
        <div>
          <span className="text-uppercase">Credits Left: {200}</span>
        </div>
        <FooterItemsWrapper>
          <ul>
            <li>
              <IconButton>
                <Icon name="minus-outline" />
              </IconButton>
              <Select defaultValue="100%" style={{ color: "#a1a1a1" }}>
                {zoom_scale.map((obj) => (
                  <Option key={obj} value={obj}>
                    {obj}
                  </Option>
                ))}
              </Select>
              <IconButton>
                <Icon name="plus-circle" />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Icon name="layers" />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Icon name="screen-full" />
              </IconButton>
            </li>
            <li>
              <IconButton>
                <Icon name="copy" />
              </IconButton>
            </li>
            <li>
              <IconButton
                style={{ marginRight: "-12px" }}
                onClick={() => {
                  !isPrevForbidden &&
                    redoOperation({
                      operationIndex: currentOperationIndex - 1,
                      operationObject: {
                        ...operationList[currentOperationIndex],
                        index: currentOperationIndex,
                      },
                    });
                }}
                // disabled={isPrevForbidden}
              >
                <Icon name="corner-up-left" />
              </IconButton>
              <IconButton
                onClick={() => {
                  !isNextForbidden &&
                    redoOperation({
                      operationIndex: currentOperationIndex + 1,
                      operationObject: {
                        ...operationList[currentOperationIndex],
                        index: currentOperationIndex,
                      },
                    });
                }}
                // disabled={isNextForbidden}
              >
                <Icon name="corner-up-right" />
              </IconButton>
            </li>
            <li style={{ borderRight: "none" }}>
              <IconButton
                disabled={activeBody === "preview"}
                onClick={() => {
                  activeBody === "preview" && resetOperations();
                }}
              >
                <Icon name="repeat" />
              </IconButton>
            </li>
          </ul>
        </FooterItemsWrapper>
        <div className="share-download-box">
          <Button
            className="mr-4"
            startIcon={<Icon name="share" />}
            onClick={() => {}}
          >
            share
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="text-white"
            startIcon={<Icon name="download2" />}
            onClick={() => {}}
          >
            Download
          </Button>
        </div>
      </Footer>
    );
  }
}
