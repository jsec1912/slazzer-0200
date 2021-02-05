const CONTAINER_SELECTOR = "filerobot-image-editor-root";

// The library modal ID.
const MODAL_ID = "filerobot-image-editor-modal";

// ID for preview canvas (canvas contains watermark, shapes...etc).
const PREVIEW_CANVAS_ID = "filerobot-shapes-edit-box";
const CANVAS_ID = "filerobot-image-edit-box";
const ORIGINAL_CANVAS_ID = "filerobot-image-edit-box-original";

// 'effects', 'filters', 'adjust', 'crop', 'resize', 'rotate'
const TOOLS = [
  "adjust",
  "effects",
  "filters",
  "rotate",
  "crop",
  "resize",
  "watermark",
  "shapes",
  "image",
  "text",
];

const EDIT_TOOLS = [
  "crop",
  "rotate",
  "exposure",
  "color saturation",
  "sharpen",
  "erase",
  "restore",
];

// 'clarity', 'edge_enhance', 'emboss', 'grungy', 'hazy', 'lomo', 'noise', 'old_paper', 'posterize', 'radial_blur',
//   'sin_city', 'tilt_shift'
// const EFFECTS = [
//   "edge_enhance",
//   "emboss",
//   "grungy",
//   "hazy",
//   "lomo",
//   "radial_blur",
//   "sin_city",
//   "tilt_shift",
// ];

const EFFECTS = [
  "edge_enhance",
  "emboss",
  "grungy",
  "hazy",
  "lomo",
  "radial_blur",
  "sin_city",
  "tilt_shift",
  "cross_process",
  "glow_sun",
  "jarques",
  "love",
  "old_boot",
  "orange_peel",
  "pin_hole",
  "sepia",
  "sun_rise",
  "vintage",
];

// 'colorize', 'contrast', 'cross_process', 'glow_sun', 'hdr_effect', 'jarques', 'love', 'old_boot',
//   'orange_peel', 'pin_hole', 'pleasant', 'sepia', 'sun_rise', 'vintage'
const FILTERS = [
  "cross_process",
  "glow_sun",
  "jarques",
  "love",
  "old_boot",
  "orange_peel",
  "pin_hole",
  "sepia",
  "sun_rise",
  "vintage",
];

const CLOUDIMAGE_OPERATIONS = [
  "crop",
  "resize",
  "rotate",
  "watermark",
  "focus_point",
];

const WATERMARK_POSITIONS = [
  "left-top",
  "center-top",
  "right-top",
  "left-center",
  "center",
  "right-center",
  "left-bottom",
  "center-bottom",
  "right-bottom",
];

const NAVBAR_TOOLS = [
  { icon: "params", name: "Edit" },
  { icon: "pictures", name: "Bg Image" },
  { icon: "paintbrush", name: "Bg Color" },
  { icon: "pencil", name: "Text" },
  { icon: "diamond", name: "Templates" },
  { icon: "droplet", name: "Add Blur" },
  { icon: "star", name: "Saturation Effects" },
  { icon: "heart", name: "Artsy Options" },
  { icon: "omega", name: "Add logo" },
  { icon: "frame", name: "Frames" },
];

// possible positions ["corners", "star", "center", "top-row", "center-row", "bottom-row"]
const WATERMARK_POSITIONS_PRESET = {
  corners: [1, 0, 1, 0, 0, 0, 1, 0, 1],
  star: [0, 1, 0, 1, 1, 1, 0, 1, 0],
  center: [0, 0, 0, 0, 1, 0, 0, 0, 0],
  "top-row": [1, 1, 1, 0, 0, 0, 0, 0, 0],
  "center-row": [0, 0, 0, 1, 1, 1, 0, 0, 0],
  "bottom-row": [0, 0, 0, 0, 0, 0, 1, 1, 1],
};

const RESOLUTIONS = [
  "Select custom Size",
  "Facebook 1080 x 1080px",
  "Facebook 1200 x 628px",
  "Facebook 1640 x 856px",
  "Facebook 1702 x 630px",
  "Facebook 1200 x 1200px",
  "Facebook 360 x 360px",
  "Facebook 1080 x 1920px",
  "YouTube 2560 x 1440px",
  "YouTube 800 x 800px",
  "YouTube 300 x 250px",
  "YouTube 300 x 60px",
  "YouTube 480 x 70px",
  "YouTube 1280 x 720px",
  "Instagram 420 x 654px",
  "Instagram 1080 x 566px",
  "Instagram 1080 x 1350px",
  "Instagram 360 x 360px",
  "Pinterest 1000 x 1500px",
  "Pinterest 1000 x 1000px",
  "LinkedIn 1536 x 768px",
  "LinkedIn 1584 x 396px",
  "LinkedIn 1400 x 800px",
  "LinkedIn 400 x 400px",
  "LinkedIn 1200 x 627px",
  "Twitter 1500 x 500px",
  "Twitter 800 x 320px",
  "Twitter 1024 x 512px",
];

export const DEFAULT_WATERMARK = {
  opacity: 0.7,
  position: "center",
  url: "",
  applyByDefault: false,
};

const WATERMARK_UNIQUE_KEY = "watermark-layer";

// const cropPresets = [
//   { name: 'original', value: 0 },
//   { name: 'square', value: 1 },
//   { name: 'banner', value: 7.8 },
//   { name: 'round', value: 1, radius: 50 },
//   { name: '5 : 4', value: 1.25 },
//   { name: '4 : 3', value: 1.33333 },
//   { name: '6 : 4', value: 1.5 },
//   { name: '16 : 9', value: 1.7777 }
// ];

const cropPresets = [
  { name: "original size", value: 0 },
  { name: "square 1:1", value: 1 },
  { name: "pasport photo 4:6", value: 0.66667 },
  { name: "video thumb 16:9", value: 1.7777 },
];

const resizePresets = [
  { name: "big square", width: 600, height: 600, ratio: 1 },
  { name: "middle square", width: 400, height: 400, ratio: 1 },
  { name: "small square", width: 200, height: 200, ratio: 1 },
  { name: "small size", width: 1200, height: 960, ratio: 1.25 },
  { name: "better quality", width: 1920, height: 1536, ratio: 1.25 },
  { name: "small size", width: 1200, height: 900, ratio: 1.33333 },
  { name: "better quality", width: 1920, height: 1440, ratio: 1.33333 },
  { name: "small size", width: 1200, height: 800, ratio: 1.5 },
  { name: "better quality", width: 1920, height: 1280, ratio: 1.5 },
  { name: "small size", width: 1200, height: 675, ratio: 1.7777 },
  { name: "better quality", width: 1920, height: 1080, ratio: 1.7777 },
  { name: "small banner", width: 468, height: 60, ratio: 7.8 },
  { name: "big banner", width: 936, height: 120, ratio: 7.8 },
];

const STANDARD_FONTS = [
  { label: "Arial", value: "Arial" },
  { label: "Tahoma", value: "Tahoma" },
  { label: "Times New Roman", value: "Times New Roman" },
  { label: "Courier", value: "Courier" },
  { label: "Courier New", value: "Courier New" },
  { label: "Verdana", value: "Verdana" },
  { label: "Georgia", value: "Georgia" },
  { label: "Palatino", value: "Palatino" },
  { label: "Garamond", value: "Garamond" },
  { label: "Bookman", value: "Bookman" },
  { label: "Comic Sans MS", value: "Comic Sans MS" },
  { label: "Candara", value: "Candara" },
  { label: "Impact", value: "Impact" },
];

const WATERMARK_CLOUDIMAGE_FONTS = [
  { label: "Arial", value: "Arial" },
  { label: "Arial Bold", value: "Arial-Bold" },
  { label: "Arial Black", value: "Arial-Black" },
  { label: "AvantGarde Book", value: "AvantGarde-Book" },
  { label: "Bitstream Charter", value: "Bitstream-Charter" },
  { label: "Bitstream Charter Bold", value: "Bitstream-Charter-Bold" },
  { label: "Bookman Demi", value: "Bookman-Demi" },
  { label: "Comic Sans MS", value: "Comic-Sans-MS" },
  { label: "Courier", value: "Courier" },
  { label: "Courier Bold", value: "Courier-Bold" },
  { label: "Courier New", value: "Courier-New	" },
  { label: "Courier New Bold", value: "Courier-New-bold" },
  { label: "DejaVu Sans", value: "DejaVu-Sans" },
  { label: "DejaVu Sans Bold", value: "DejaVu-Sans-bold" },
  { label: "Dingbats", value: "Dingbats" },
  { label: "fixed", value: "fixed" },
  { label: "FreeMono", value: "FreeMono" },
  { label: "FreeMono Bold", value: "FreeMono-Bold" },
  { label: "FreeSans", value: "FreeSans-Bold" },
  { label: "Halvetica", value: "Halvetica" },
  { label: "Georgia", value: "Georgia" },
  { label: "Impact", value: "Impact" },
  { label: "Noto mono", value: "Noto-Mono" },
];

const SHAPES_VARIANTS = {
  RECT: "rect",
  SQUARE: "square",
  CIRCLE: "circle",
  IMAGE: "image",
  TEXT: "text",
};

// const DEFAULT_IMG_URL = 'https://image.flaticon.com/icons/svg/916/916762.svg';
const DEFAULT_IMG_URL = "/assets/images/logo-demo-1.jpg";

const UPLOADER = {
  hideCloudimageSwitcher: true,
  processWithCloudimage: false,
  uploadWithCloudimageLink: false,
  elementId: null,
  isLowQualityPreview: true,

  reduceBeforeEdit: {
    mode: "manual",
    widthLimit: 2000,
    heightLimit: 2000,
  },

  cropBeforeEdit: null,

  cropPresets,

  resizePresets,
};

const ON_CLOSE_STATUSES = {
  CLOSE_BTN_CLICKED: "close-button-clicked",
  TOOLBAR_CANCEL_BTN_CLICKED: "toolbar-cancel-button-clicked",
  ESC_KEY_PRESSED: "esc-key-pressed",
  MODAL_OVERLAY_CLICKED: "modal-overlay-clicked",
  IMAGE_EDITS_COMPLETED: "image-edits-completed",
  IMAGE_DOWNLOADED: "image-downloaded",
  IMAGE_UPLOADED_FILEROBOT: "image-uploaded-filerobot",
  IMAGE_UPLOADED_CLOUDIMAGE: "image-uploaded-cloudimage",
  IMAGE_UPLOADING_FAIL_FILEROBOT: "image-uploading-fail-filerobot",
};

const SAVE_MODES = {
  NEW: "new",
  DUPLICATE: "duplicate",
  REPLACE: "replace",
};

const TEXT_OPTIONS = {
  FONT_FAMILY: ["open sans", "lato", "poppins"],
  FONT_LINEHEIGHT_SIZE: ["6px", "8px", "10px"],
  FONT_SMOOTHING: ["sharp", "strong", "smooth"],
  FONT_REGULAR: ["regular", "medium", "bold"],
};

const SCALE_PERCENTAGE = [
  "100%",
  "25%",
  "50%",
  "75%",
  "200%",
  "400%",
  "800%",
  "1600%",
];

export {
  MODAL_ID,
  PREVIEW_CANVAS_ID,
  TOOLS,
  EFFECTS,
  FILTERS,
  UPLOADER,
  CLOUDIMAGE_OPERATIONS,
  WATERMARK_POSITIONS,
  WATERMARK_UNIQUE_KEY,
  WATERMARK_POSITIONS_PRESET,
  STANDARD_FONTS,
  WATERMARK_CLOUDIMAGE_FONTS,
  SHAPES_VARIANTS,
  DEFAULT_IMG_URL,
  ON_CLOSE_STATUSES,
  CANVAS_ID,
  ORIGINAL_CANVAS_ID,
  SAVE_MODES,
  CONTAINER_SELECTOR,
  NAVBAR_TOOLS,
  EDIT_TOOLS,
  TEXT_OPTIONS,
  RESOLUTIONS,
  SCALE_PERCENTAGE,
};
