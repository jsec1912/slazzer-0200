import React, { Children, Component, useState, useEffect } from 'react';
import { AddWrapper, SettingsWrapper, FieldGroup, FieldCustomLabel } from '../../styledComponents/Shapes.ui';
import { SaveCancelWrapper } from '../../styledComponents/Common.ui';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiButton from '@material-ui/core/Button';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import MuiTypography from '@material-ui/core/Typography';
import MuiIconButton from '@material-ui/core/IconButton';
import { EDIT_TOOLS } from '../../config';
import MuiSlider from '@material-ui/core/Slider';
import Icon from '../icon/Icon';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
// import MuiTextField from '@material-ui/core/TextField';
import { InputNumber } from 'antd';
import SaveCancelBox from './SaveCancelBox';
import '../custom.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const Select = withStyles({
  root: {
    height: 'auto',
    fontSize: '12px',
    color: '#a1a1a1',
    fontFamily: 'Poppins',
    paddingLeft: '10px',
    border: '1px solid #353535'
  }
})(MuiSelect);

const Slider = withStyles({
  root: {
    color: '#0075ff',
    padding: 0,
    height: '4px'
  }
})(MuiSlider)

// const TextField = withStyles({
//   root: {

//   }
// })(MuiTextField);

const Button = withStyles({
  root: {
    textTransform: 'capitalize',
    '&:hover': {

    }
  },
  label: {
    fontSize: '12px',
    lineHeight: '18px',
    fontFamily: 'Poppins'
  }
})(MuiButton);

const IconButton = withStyles({
  root: {
    padding: '5px 10px',
    '&:hover': {
      color: 'white'
    }
  },

  label: {
    color: '#a1a1a1',
    '&:hover': {
      color: 'white'
    }
  }
})(MuiIconButton);

const Accordion = withStyles({
  root: {
    backgroundColor: '#333333',
    color: '#a1a1a1',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
      color: 'white'
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    marginBottom: -1,
    padding: '0 10px',
    minHeight: 0,
    '&$expanded': {
      minHeight: 0,
      backgroundColor: '#222',
      borderRadius: '5px 5px 0 0'
    },
  },
  content: {
    padding: '10px 0',
    margin: 0,
    '&$expanded': {
      margin: 0
    },
    '&>i': {
      marginRight: '8px'
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: '5px 10px',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '13px',
    color: '#a1a1a1',
    backgroundColor: '#222',
    borderRadius: '0 0 5px 5px'
  },
}))(MuiAccordionDetails);

const Typography = withStyles({
  body1: {
    fontSize: '12px',
    lineHeight: '20px',
    fontFamily: 'Poppins'
  }
})(MuiTypography);

const useStyles = makeStyles({
  root: {

  },
  cancelBtn: {
    color: '#f34e3a'
  },
  saveBtn: {
    color: '#3a88fe'
  }
})


export default function Edit(props) {

  const { config, updateState, onRotate, correctionDegree, flipX, flipY, onCorrectionDegree, cropDetails, initialZoom, apply } = props;

  const { cropPresets } = config

  const [expanded, setExpanded] = React.useState('');
  const [strengthVal, setStrengthVal] = React.useState(0);
  const [brightVal, setBrightVal] = React.useState(0);
  const [contrastVal, setContrastVal] = React.useState(0);
  const [hightlightVal, setHightlightVal] = React.useState(0);
  const [shadowVal, setShadowVal] = React.useState(0);

  const [hueVal, setHueVal] = React.useState(0);
  const [temperatureVal, setTemperatureVal] = React.useState(0);
  const [saturationVal, setSaturationVal] = React.useState(0);

  const [sharpVal, setSharpVal] = React.useState(0);

  const [eraseVal, setEraseVal] = React.useState(0);

  const [restoreVal, setRestoreVal] = React.useState(0);

  const [acpectRatio, setAcpectRatio] = React.useState(0);
  const [activeRatio, setActiveRatio] = React.useState('');

  // const [resetInputbtn, setResetInputbtn] = React.useState(true);

  const [timeset, setTimeset] = useState(false)

  const [inputWidthValue, setInputWidthValue] = React.useState(Math.round(cropDetails.width * initialZoom));
  const [inputHeightValue, setInputHeightValue] = React.useState(Math.round(cropDetails.height * initialZoom));

  const onSave = () => {
    apply()
    setExpanded(false)
  }

  const handleCancel = () => {
    setExpanded(false)
    updateState({ activeTab: null })
  }

  // useEffect(() => {
  //   if (timeset) {
  //     setInputWidthValue(Math.round(cropDetails.width * initialZoom))
  //     setInputHeightValue(Math.round(cropDetails.height * initialZoom))
  //   }
  // }, [timeset])

  useEffect(() => {
    if (timeset) {
      setInputWidthValue(Math.round(cropDetails.width * initialZoom))
      setInputHeightValue(Math.round(cropDetails.height * initialZoom))
      //  document.getElementById("input-width").value = Math.round(cropDetails.width * initialZoom)
      // document.getElementById("input-height").value = Math.round(cropDetails.height * initialZoom)
    }
  }, [cropDetails])

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    updateState({ activeTab: panel })

    if (panel === 'crop')
      setTimeout(() => {
        setTimeset(true)
      }, 10);
  };

  //Crop Features Implementation***************************

  const changeWidth = (value) => {
    // setInputWidthValue(Math.round(cropDetails.width * initialZoom))
    // window.scaleflexPlugins.cropperjs.setCropBoxData({ width: +event.target.value / initialZoom / window.scaleflexPlugins.zoom });
    window.scaleflexPlugins.cropperjs.setCropBoxData({ width: +value / initialZoom / window.scaleflexPlugins.zoom });
  }

  const changeHeight = (value) => {
    // setInputHeightValue(Math.round(cropDetails.height * initialZoom))
    window.scaleflexPlugins.cropperjs.setCropBoxData({ height: +value / initialZoom / window.scaleflexPlugins.zoom });
  }

  const handleSelectResolution = (event) => {

    const obj = JSON.parse(event.target.value);

    const { original: { width = 1, height = 1 } } = props;
    let value;

    value = obj.name === 'original size' ? width / height : obj.value;
    window.scaleflexPlugins.cropperjs.setAspectRatio(value);
    setAcpectRatio(obj.value)
    setActiveRatio(obj.name)
  }
  //Exit Crop Features*************************************


  //Rotate Features Implementation***************************************
  const leftRotate = () => {
    onRotate(-90, parseInt(correctionDegree), flipX, flipY);
  }

  const rightRotate = () => {
    onRotate(90, parseInt(correctionDegree), flipX, flipY);
  }

  const onFlip = (val) => {
    const nextFlipXValue = val === 'x' ? !flipX : flipX;
    const nextFlipYValue = val === 'y' ? !flipY : flipY;
    onRotate(0, correctionDegree, nextFlipXValue, nextFlipYValue);
  }

  const handleStrengthSliderChange = (event, newValue) => {
    setStrengthVal(newValue)
    onCorrectionDegree(newValue)
    onRotate(0, parseFloat(newValue), flipX, flipY);
  }
  //Exit Rotate Features*********************************************



  const handleBrightSliderChange = (event, newValue) => {
    setBrightVal(newValue)
  }

  const handleHighlightsSliderChange = (event, newValue) => {
    setHightlightVal(newValue)
  }

  const handleContrastSliderChange = (event, newValue) => {
    setContrastVal(newValue)
  }

  const handleShadowSliderChange = (event, newValue) => {
    setShadowVal(newValue)
  }

  const handleTemperatureSliderChange = (event, newValue) => {
    setTemperatureVal(newValue)
  }

  const handleHueSliderChange = (event, newValue) => {
    setHueVal(newValue)
  }

  const handleSaturationSliderChange = (event, newValue) => {
    setSaturationVal(newValue)
  }

  const handleSharpnessSliderChange = (event, newValue) => {
    setSharpVal(newValue)
  }

  const handleEraseSliderChange = (event, newValue) => {
    setBrushVal(newValue)
  }

  const handleRestoreSliderChange = (event, newValue) => {
    setRestoreVal(newValue)
  }

  return (
    <div className="">
      <Accordion square expanded={expanded === 'crop'} onChange={handleChange('crop')}>
        <AccordionSummary aria-controls="crop-content" id="crop-header">
          <Icon name="crop" /><Typography>Crop</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl style={{ width: '100%', marginBottom: '15px' }}>
            <Select native variant="outlined" defaultValue="" id="grouped-native-select" onChange={handleSelectResolution}>

              {cropPresets.map((obj, index) =>
                <option value={JSON.stringify(obj)} key={index}>{obj.name}</option>
              )}

            </Select>
          </FormControl>

          <div className="d-flex">
            {timeset &&
              <>
                {/* <TextField
                  className="mr-3"
                  id="input-width"
                  label="Width(Px)"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={Math.round(cropDetails.width * initialZoom)}
                  onChange={changeWidth}
                />
                <TextField
                  id="input-height"
                  label="Height(Px)"
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  defaultValue={Math.round(cropDetails.height * initialZoom)}
                  onChange={changeHeight}
                /> */}
                <InputNumber
                  value={inputWidthValue}
                  onChange={changeWidth}
                />
                <InputNumber
                  value={inputHeightValue}
                  onChange={changeHeight}
                />
              </>
            }

          </div>
          <SaveCancelWrapper>
            <SaveCancelBox handleCancel={handleCancel} onSave={onSave} />
          </SaveCancelWrapper>

        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'rotate'} onChange={handleChange('rotate')}>
        <AccordionSummary aria-controls="rotate-content" id="rotate-header">
          <Icon name="rotate-cw" /><Typography>Rotate</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="d-flex">
            <IconButton className="pl-0" onClick={leftRotate}><Icon name="rotate-ccw" /></IconButton>
            <IconButton onClick={rightRotate}><Icon name="rotate-cw" /></IconButton>
            <IconButton onClick={() => onFlip('x')}><Icon name="swap_horizontal_circle" /></IconButton>
            <IconButton onClick={() => onFlip('y')}><Icon name="swap_vertical_circle" /></IconButton>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <span>Strength</span>
            <div className="d-flex">
              <IconButton className="p-0" onClick={() => setStrengthVal(strengthVal - 1)}><Icon name="minus" /></IconButton>
              <IconButton className="p-0" onClick={() => setStrengthVal(strengthVal + 1)}><Icon name="plus" /></IconButton>
              <span className="ml-3">{strengthVal}<sup className="ml-1">&#9900;</sup></span>
            </div>
          </div>
          <div className="px-1 pb-3">
            <Slider
              value={strengthVal}
              onChange={handleStrengthSliderChange}
              aria-label="input strength value"
              defaultValue={0}
              step={1}
              min={-90}
              max={90}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion square expanded={expanded === 'exposure'} onChange={handleChange('exposure')}>
        <AccordionSummary aria-controls="exposure-content" id="exposure-header">
          <Icon name="exposure" /><Typography>Exposure</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span>Brightness</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setBrightVal(brightVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setBrightVal(brightVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{brightVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={brightVal}
                onChange={handleBrightSliderChange}
                aria-label="input brightness value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Contrast</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setContrastVal(contrastVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setContrastVal(contrastVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{contrastVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={contrastVal}
                onChange={handleContrastSliderChange}
                aria-label="input contrast value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Highlights</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setHightlightVal(hightlightVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setHightlightVal(hightlightVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{hightlightVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={hightlightVal}
                onChange={handleHighlightsSliderChange}
                aria-label="input highlights value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Shadows</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setShadowVal(shadowVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setShadowVal(shadowVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{strengthVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={shadowVal}
                onChange={handleShadowSliderChange}
                aria-label="input shadow value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <SaveCancelWrapper>
            <SaveCancelBox handleCancel={handleCancel} apply={apply} />
          </SaveCancelWrapper>

        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'saturation'} onChange={handleChange('saturation')}>
        <AccordionSummary aria-controls="saturation-content" id="saturation-header">
          <Icon name="format_color_fill" /><Typography>Color Saturation</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span>Hue</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setHueVal(hueVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setHueVal(hueVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{hueVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={hueVal}
                onChange={handleHueSliderChange}
                aria-label="input hue value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Saturation</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setSaturationVal(saturationVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setSaturationVal(saturationVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{saturationVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={saturationVal}
                onChange={handleSaturationSliderChange}
                aria-label="input saturation value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <div>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <span>Temperature</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setTemperatureVal(temperatureVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setTemperatureVal(temperatureVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{temperatureVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1">
              <Slider
                value={temperatureVal}
                onChange={handleTemperatureSliderChange}
                aria-label="input saturation value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

          <SaveCancelWrapper>
            <SaveCancelBox handleCancel={handleCancel} apply={apply} />
          </SaveCancelWrapper>

        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'sharpen'} onChange={handleChange('sharpen')}>
        <AccordionSummary aria-controls="sharpen-content" id="sharpen-header">
          <Icon name="sun1" /><Typography>Sharpen</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span>Sharpness</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setSharpVal(sharpVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setSharpVal(sharpVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{sharpVal}<sup className="ml-1">&#9900;</sup></span>
              </div>
            </div>
            <div className="px-1 pb-3">
              <Slider
                value={sharpVal}
                onChange={handleSharpnessSliderChange}
                aria-label="input hue value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'erase'} onChange={handleChange('erase')}>
        <AccordionSummary aria-controls="erase-content" id="erase-header">
          <Icon name="eraser" /><Typography>Erase</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-left">
            <Typography>Brush Shape</Typography>
            <div className="">
              <IconButton><Icon name="radio-unchecked" /></IconButton>
              <IconButton><Icon name="checkbox-unchecked" /></IconButton>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span>Brush Size</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setEraseVal(eraseVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setEraseVal(eraseVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{eraseVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1 pb-3">
              <Slider
                value={eraseVal}
                onChange={handleEraseSliderChange}
                aria-label="input hue value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

        </AccordionDetails>
      </Accordion>

      <Accordion square expanded={expanded === 'restore'} onChange={handleChange('restore')}>
        <AccordionSummary aria-controls="restore-content" id="restore-header">
          <Icon name="history" /><Typography>Restore</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="text-left">
            <Typography>Brush Shape</Typography>
            <div className="">
              <IconButton><Icon name="radio-unchecked" /></IconButton>
              <IconButton><Icon name="checkbox-unchecked" /></IconButton>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <span>Brush Size</span>
              <div className="d-flex">
                <IconButton className="p-0" onClick={() => setRestoreVal(restoreVal - 1)}><Icon name="minus" /></IconButton>
                <IconButton className="p-0" onClick={() => setRestoreVal(restoreVal + 1)}><Icon name="plus" /></IconButton>
                <span className="ml-3">{restoreVal}&#x00025;</span>
              </div>
            </div>
            <div className="px-1 pb-3">
              <Slider
                value={restoreVal}
                onChange={handleRestoreSliderChange}
                aria-label="input hue value"
                defaultValue={50}
                step={1}
                min={0}
                max={100}
              />
            </div>
          </div>

        </AccordionDetails>
      </Accordion>
    </div>
  );

}