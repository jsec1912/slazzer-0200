import React, { Component } from "react";
import {
  PreviewWrapper,
  Spinner,
  Wrapper,
  ToolbarWrapper,
  WorkareaWrapper,
  ToolbaritemsWrapper,
} from "./styledComponents/index";
import {
  Footer,
  Header,
  PreResize,
  Preview,
  ToolbarItems,
  DragImageBox,
} from "./components/index";
import { Toolbar } from "./components";
import imageType from "image-type";
import "./lib/caman";
import { DEFAULT_WATERMARK, ON_CLOSE_STATUSES } from "./config";
// NAVBAR_TOOLS
import { getCanvasNode } from "./utils";
import Select from "antd/lib/select";

const INITIAL_PARAMS = {
  effect: null,
  filter: null,
  crop: null,
  resize: null,
  rotate: null,
  correctionDegree: 0,
  flipX: false,
  flipY: false,
  adjust: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    exposure: 0,
  },
  canvasDimensions: { width: 300, height: 200, ratio: 1.5 },
};

export default class extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    const {
      processWithCloudimage,
      processWithFilerobot,
      processWithCloudService,
      uploadWithCloudimageLink,
      reduceBeforeEdit,
      cropBeforeEdit,
      watermark,
      imageSealing,
    } = props.config;

    this.state = {
      src: this.props.src,
      isShowSpinner: true,
      isHideCanvas: false,
      activeTab: null,
      activeBody: null,
      currentOperation: null,
      original: { width: 300, height: 200 },
      cropDetails: { width: 300, height: 200 },
      canvasDimensions: { width: 300, height: 200, ratio: 1.5 },
      processWithFilerobot,
      processWithCloudimage,
      processWithCloudService,
      uploadCloudimageImage: uploadWithCloudimageLink,
      reduceBeforeEdit,
      cropBeforeEdit,
      roundCrop: false,
      imageSealing: {
        enabled: false,
        salt: "",
        char_count: 10,
        include_params: null /* include all by default */,
        ...imageSealing,
      },

      operationsOriginal: [],
      operationsZoomed: [],
      operations: [],

      canvasZoomed: null,
      canvasOriginal: null,
      isPreResize: false,

      initialZoom: 1,

      ...INITIAL_PARAMS,
      watermark: watermark || DEFAULT_WATERMARK,
      focusPoint: { x: null, y: null },
      shapes: [],
      selectedShape: {},
      availableShapes: [],
      activeTool: null,
      activeToolItems: false,
      /* isDropped: false */
      isDropped: true,
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.loadImage();
    this.determineImageType();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.src != prevProps.src) {
      this.loadImage();
    }
  }

  loadImage = () => {
    let { src } = this.props;
    const {
      reduceBeforeEdit: { mode, widthLimit, heightLimit } = {},
      watermark,
    } = this.state;

    if (src instanceof Blob) {
      src = URL.createObjectURL(src);
    }

    const splittedSrc = src.split("/");
    const imageName = splittedSrc[splittedSrc.length - 1];
    const img = new Image();
    let logoImage = null;

    if (watermark && watermark.url) {
      logoImage = new Image();
      logoImage.setAttribute("crossOrigin", "Anonymous");
      logoImage.src =
        watermark.url +
        (watermark.url.indexOf("?") > -1 ? "&" : "?") +
        new Date().getTime();
    }

    img.setAttribute("crossOrigin", "Anonymous");
    img.src = src;
    if (!src.startsWith("data:image/") && !src.startsWith("blob:")) {
      // Image is not a blob, insert query param to avoid caching
      img.src =
        img.src +
        (img.src.indexOf("?") > -1 ? "&version=" : "?version=") +
        new Date().getTime();
    }

    img.onload = () => {
      const canvasDimensions = {
        width: img.width,
        height: img.height,
        ratio: img.width / img.height,
      };
      const propsOnApply = {
        activeBody: "preResize",
        isShowSpinner: false,
        img,
        logoImage,
        imageName:
          imageName.indexOf("?") > -1
            ? imageName.slice(0, imageName.indexOf("?"))
            : imageName,
      };

      if (
        mode === "manual" &&
        (widthLimit < img.width || heightLimit < img.height)
      ) {
        this.setState({
          canvasDimensions,
          ...propsOnApply,
        });
      } else if (
        mode === "auto" &&
        (widthLimit < img.width || heightLimit < img.height)
      ) {
        if (img.width >= img.height) {
          const ratio = img.width / img.height;
          const dimensions = {
            ratio,
            width: widthLimit,
            height: widthLimit / ratio,
          };

          this.setState({
            preCanvasDimensions: { ...dimensions },
            canvasDimensions: { ...dimensions },
            ...propsOnApply,
            activeBody: "preview",
            isPreResize: true,
          });
        } else {
          const ratio = img.height / img.width;
          const dimensions = {
            ratio,
            width: heightLimit / ratio,
            height: heightLimit,
          };

          this.setState({
            preCanvasDimensions: { ...dimensions },
            canvasDimensions: { ...dimensions },
            ...propsOnApply,
            activeBody: "preview",
            isPreResize: true,
          });
        }
      } else {
        const { config } = this.props;
        const { tools } = config;
        const isOneTool = tools.length === 1;
        let activeTab;

        if (isOneTool) {
          activeTab = tools[0];
        }

        this.setState(
          { ...propsOnApply, activeBody: "preview", isPreResize: false },
          () => {
            this.setState({ activeTab });
          }
        );
      }
    };
  };

  determineImageType = () => {
    const { src } = this.props;
    if (src instanceof Blob) {
      this.setState({ imageMime: src.type });
      return;
    }

    const xhr = new XMLHttpRequest();

    xhr.open("GET", src);
    xhr.responseType = "arraybuffer";

    xhr.onload = ({ target }) => {
      // TODO: GOOD HACK FOR A TEMP SOLUTION IMAGES & SVG BUT NEED ANOTHER WAY TO MAKE SURE THAT WE COVER MOST OF POSSIBLE IMGS
      this.setState({
        imageMime:
          imageType(new Uint8Array(target.response))?.mime || "image/svg+xml",
      });
    };

    xhr.send();
  };

  updateState = (props, callback = () => {}) => {
    if (this._isMounted) {
      const editorWrapperId = this.props.config.elementId;
      const canvas = getCanvasNode(editorWrapperId);
      props.latestCanvasSize = {
        width: canvas.width,
        height: canvas.height,
      };

      this.setState(props, callback);
    }
  };

  selectedTool = (val) => {
    this.updateState({ activeTab: val });
    this.setState({ activeTool: val });
    this.setState({ activeToolItems: true });
    console.log("activeTool:", this.state.activeTool);
    console.log("activeTab:", this.state.activeTab);
  };

  isActiveToolbox = () => {
    this.setState({ activeToolItems: false });
  };

  onRevert = () => {
    const { cancelLastOperation, activeTab } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });

    cancelLastOperation(activeTab, () => {
      this.setState({
        isHideCanvas: false,
        isShowSpinner: false,
        ...INITIAL_PARAMS,
      });
    });
  };

  onAdjust = (handler, value) => {
    const { onAdjust } = this.state;

    onAdjust(handler, value);
  };

  onRotate = (value, correctionDegree, flipX, flipY) => {
    const { onRotate } = this.state;

    onRotate(value, correctionDegree, flipX, flipY);
  };

  onCorrectionDegree = (val) => {
    this.setState({ correctionDegree: val });
  };

  onFlip = (axis) => {
    const { flip } = this.state;

    flip(axis);
  };

  onSave = () => {
    const { saveImage } = this.state;

    this.setState({ isShowSpinner: true });
    saveImage();
  };

  onDownloadImage = () => {
    const { onBeforeComplete } = this.props;
    const { downloadImage, getResultCanvas } = this.state;
    const canvas = getResultCanvas();
    const isDownload = onBeforeComplete
      ? onBeforeComplete({ status: "before-complete", canvas })
      : true;

    if (isDownload) {
      downloadImage(() => {
        this.props.onComplete({ status: "success", canvas });
        this.props.onClose(ON_CLOSE_STATUSES.IMAGE_DOWNLOADED);
      });
    } else {
      this.props.onComplete({ status: "success", canvas });
      this.props.onClose(ON_CLOSE_STATUSES.IMAGE_EDITS_COMPLETED);
    }
  };

  onApplyEffects = (name) => {
    const { applyCorrections, effect, filter } = this.state;
    const nextEffect = effect === name ? null : name;
    const nextFilter = filter === name ? null : name;

    this.setState({ isShowSpinner: true, effect: nextEffect }, () => {
      applyCorrections(() => {
        this.setState({ isShowSpinner: false });
      });
    });

    this.setState({ isShowSpinner: true, filter: nextFilter }, () => {
      applyCorrections(() => {
        this.setState({ isShowSpinner: false });
      });
    });
  };

  // onApplyFilters = (name) => {
  //   const { applyCorrections, filter } = this.state;
  //   const nextFilter = filter === name ? null : name;

  //   this.setState({ isShowSpinner: true, filter: nextFilter }, () => {
  //     applyCorrections(() => {
  //       this.setState({ isShowSpinner: false });
  //     });
  //   });
  // };

  handleSave = () => {
    const { processWithFilerobot, processWithCloudService } = this.state;

    if (!processWithFilerobot && !processWithCloudService) {
      this.onDownloadImage();
    } else {
      this.onSave();
    }
  };

  apply = (callback) => {
    const { activeTab, applyChanges } = this.state;

    applyChanges(activeTab, callback);
    this.setState({ activeTab: null });
  };

  redoOperation = ({
    operationIndex,
    callback = () => {},
    resetActiveTab = true,
    operationObject = {},
  }) => {
    const { applyOperations } = this.state;

    if (resetActiveTab) {
      this.setState({
        activeTab: null,
        isHideCanvas: true,
        isShowSpinner: true,
      });
    } else {
      this.setState({ isHideCanvas: true, isShowSpinner: true });
    }

    applyOperations(
      operationIndex,
      () => {
        this.setState({ isHideCanvas: false, isShowSpinner: false }, callback);
      },
      operationObject
    );
  };

  resetOperations = () => {
    const { resetAll } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });

    resetAll(() => {
      this.setState({
        isHideCanvas: false,
        isShowSpinner: false,
        ...INITIAL_PARAMS,
      });
    });
  };

  onPreResize = (value) => {
    const { config } = this.props;
    const { tools } = config;
    const isOneTool = tools.length === 1;
    let activeTab;

    if (isOneTool) {
      activeTab = tools[0];
    }

    switch (value) {
      case "keep":
        this.setState(
          { canvasDimensions: {}, isPreResize: false, activeBody: "preview" },
          () => {
            this.setState({ activeTab });
          }
        );
        break;
      case "resize":
        const { canvasDimensions } = this.state;
        this.setState(
          {
            preCanvasDimensions: canvasDimensions,
            isPreResize: true,
            activeBody: "preview",
          },
          () => {
            this.setState({ activeTab });
          }
        );
        break;
    }
  };

  render() {
    const {
      isShowSpinner,
      activeTab,
      operations,
      operationsOriginal,
      operationsZoomed,
      currentOperation,
      isHideCanvas,
      cropDetails,
      original,
      canvasDimensions,
      processWithCloudimage,
      processWithFilerobot,
      processWithCloudService,
      uploadCloudimageImage,
      imageMime,
      lastOperation,
      operationList,
      initialZoom,
      canvasZoomed,
      canvasOriginal,
      reduceBeforeEdit,
      cropBeforeEdit,
      img,
      imageName,
      activeBody,
      isPreResize,
      preCanvasDimensions,
      logoImage,
      imageSealing,

      effect,
      filter,
      crop,
      roundCrop,
      resize,
      rotate,
      correctionDegree,
      flipX,
      flipY,
      adjust,
      watermark,
      focusPoint,
      shapes,
      shapeOperations,
      selectedShape,
      availableShapes,
      latestCanvasSize,
      activeToolItems,
      activeTool,
      isDropped,
    } = this.state;
    const {
      src,
      config,
      onClose,
      onComplete,
      closeOnLoad = true,
      t = {},
      theme /* handleReceivedImg */,
    } = this.props;

    const imageParams = {
      effect,
      filter,
      crop,
      resize,
      rotate,
      flipX,
      flipY,
      adjust,
      correctionDegree,
    };
    const toolbarProps = {
      activeTab,
      isShowSpinner,
      activeBody,
      config,
      selectedTool: this.selectedTool,
    };

    const headerProps = {
      t,
      theme,
      cropDetails,
      original,
      activeTab,
      src,
      onClose,
      config,
      canvasDimensions,
      processWithCloudimage,
      processWithFilerobot,
      processWithCloudService,
      operations,
      operationsOriginal,
      operationsZoomed,
      initialZoom,
      isShowSpinner,
      img,
      logoImage,
      imageName,
      activeBody,
      preCanvasDimensions,
      updateState: this.updateState,
      onRevert: this.onRevert,
      apply: this.apply,
      onSave: this.onSave,
      onFlip: this.onFlip,
      onApplyEffects: this.onApplyEffects,
      onApplyFilters: this.onApplyFilters,
      onRotate: this.onRotate,
      onAdjust: this.onAdjust,
      onDownloadImage: this.onDownloadImage,
      handleSave: this.handleSave,

      ...imageParams,
      watermark,
      focusPoint,
      shapes,
      shapeOperations,
      selectedShape,
      availableShapes,
    };
    const previewProps = {
      t,
      theme,
      cropDetails,
      original,
      activeTab,
      isShowSpinner,
      operations,
      operationsOriginal,
      operationsZoomed,
      initialZoom,
      currentOperation,
      isHideCanvas,
      src,
      imageMime,
      onClose,
      onComplete,
      canvasDimensions,
      closeOnLoad,
      config,
      processWithCloudimage,
      processWithFilerobot,
      processWithCloudService,
      imageSealing,
      uploadCloudimageImage,
      lastOperation,
      operationList,
      canvasZoomed,
      canvasOriginal,
      reduceBeforeEdit,
      cropBeforeEdit,
      img,
      logoImage,
      imageName,
      isPreResize,
      preCanvasDimensions,
      updateState: this.updateState,
      handleSave: this.handleSave,
      onPreResize: this.onPreResize,
      redoOperation: this.redoOperation,
      roundCrop,

      ...imageParams,
      watermark,
      focusPoint,
      shapes,
      shapeOperations,
      selectedShape,
      latestCanvasSize,
    };

    console.log("selected: ", activeTool, activeTab, activeBody);

    const toolbarItemsProps = {
      activeTool,
      config,
      activeTab,
      isShowSpinner,
      activeBody,
      shapeOperations,
      ...imageParams,
      original,
      initialZoom,
      cropDetails,
      effect,
      onApplyEffects: this.onApplyEffects,
      onCorrectionDegree: this.onCorrectionDegree,
      updateState: this.updateState,
      isActiveToolbox: this.isActiveToolbox,
      onRotate: this.onRotate,
      apply: this.apply,
    };

    const footerProps = {
      logoImage,
      t,
      theme,
      activeBody,
      operations,
      operationsOriginal,
      operationsZoomed,
      initialZoom,
      currentOperation,
      processWithCloudimage,
      processWithCloudService,
      updateState: this.updateState,
      redoOperation: this.redoOperation,
      resetOperations: this.resetOperations,
      config,
      watermark,
    };

    const dropImgProps = {
      /*  handleReceivedImg, */
      setDropped: () => {
        this.setState({ isDropped: true });
      },
    };

    return (
      <Wrapper roundCrop={roundCrop} isLoading={isShowSpinner}>
        <Header {...headerProps} />

        <PreviewWrapper>
          <ToolbarWrapper>
            <Toolbar {...toolbarProps} />
          </ToolbarWrapper>
          <div className="d-flex w-100">
            <WorkareaWrapper activeToolItems={activeToolItems}>
              {!isDropped ? (
                <DragImageBox {...dropImgProps} />
              ) : (
                <>
                  {activeBody === "preview" && <Preview {...previewProps} />}
                  {activeBody === "preResize" && (
                    <PreResize {...previewProps} />
                  )}
                </>
              )}
            </WorkareaWrapper>
            {activeToolItems && (
              <ToolbaritemsWrapper>
                <ToolbarItems {...toolbarItemsProps} />
              </ToolbaritemsWrapper>
            )}
          </div>
          {/* <Spinner overlay show={isShowSpinner} label={t['spinner.label']}/> */}
        </PreviewWrapper>
        <Footer {...footerProps} />
      </Wrapper>
    );
  }
}
