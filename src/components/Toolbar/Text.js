import React, { Component } from 'react';
import { AddWrapper, SettingsWrapper, FieldGroup, FieldCustomLabel, TextPropertyWrapper } from '../../styledComponents/Shapes.ui';
import { FieldInput } from '../../styledComponents';
import Range from '../Range';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import { Row, Col } from 'antd';
import { TEXT_OPTIONS } from '../../config';
// import { SketchPicker } from 'react-color';
import Icon from '../icon/Icon';
import IconButton from '@material-ui/core/IconButton';
import MuiFab from '@material-ui/core/Fab';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { ColorPicker } from 'material-ui-color';
import 'bootstrap/dist/css/bootstrap.min.css';

const { Option } = Select;

const Fab = withStyles({
  root: {
    background: '#262626',
    color: 'white',
    minHeight: '30px'
  },

  label: {
    '&>i': {
      fontSize: '14px!important'
    }
  },

  sizeSmall: {
    width: '30px',
    height: '30px'
  },

})(MuiFab);



export default class Text extends Component {
  componentDidMount() {
    const { shapeOperations } = this.props;

    shapeOperations.addText();
  }

  // updateOpacity = (newVal) => this.props.shapeOperations.updateShape({ opacity: newVal });
  // updateOpacity = () => {
  //   console.log("Type Text")
  // }

  // updateStroke = (property, value) => {
  //   const { shapeOperations, selectedShape: { stroke = {} } } = this.props;
  //   shapeOperations.updateShape({ stroke: { ...stroke, [property]: value }});
  // }

  updatePropertyFromEvent = (e) => this.props.shapeOperations.updateShape({ [e.target.name]: e.target.value });

  // state = {
  //   displayColorPicker: false,
  //   color: {
  //     r: '241',
  //     g: '112',
  //     b: '19',
  //     a: '1',
  //   }
  // }

  // handleClick = () => {
  //   console.log("clicked")
  //   this.setState({
  //     displayColorPicker: !this.state.displayColorPicker
  //   })
  // };

  // handleClose = () => {
  //   this.setState({ displayColorPicker: false })
  // };

  // handleChange = (color) => {
  //   this.setState({ color: color.rgb })
  // };

  render() {
    const { t, selectedShape = {}, config: { theme } } = this.props;
    const {
      text = '',
      textFont = 'Arial',
      textSize = 62,
      stroke = {},
      // color = '#000000',
      opacity = 1
    } = selectedShape;

    // const { displayColorPicker, color } = this.state

    // const background = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;


    return (
      <AddWrapper>
        <SettingsWrapper>
          <FieldInput
            id="text"
            value={text}
            name="text"
            fullSize
            placeholder="Enter Text"
            onChange={this.updatePropertyFromEvent}
          />
          <TextPropertyWrapper>
            <div className="text-proper-title">
              text properties
            </div>
            <Select defaultValue="open sans" className="mb-2" style={{ textTransform: 'capitalize', width: '100%' }}>
              {TEXT_OPTIONS.FONT_FAMILY.map(f_family =>
                <Option key={f_family} value={f_family}>{f_family}</Option>
              )}
            </Select>

            <Row className="mb-2">
              <Col span={12}>
                <Select defaultValue="font size" style={{ textTransform: 'capitalize', width: '100%' }}>
                  {TEXT_OPTIONS.FONT_LINEHEIGHT_SIZE.map(f_size =>
                    <Option key={f_size} value={f_size}>{f_size}</Option>
                  )}
                </Select>
              </Col>
              <Col span={12}>
                <Select defaultValue="line height" style={{ paddingLeft: '0.5rem', textTransform: 'capitalize', width: '100%' }}>
                  {TEXT_OPTIONS.FONT_LINEHEIGHT_SIZE.map(f_lineheight =>
                    <Option key={f_lineheight} value={f_lineheight}>{f_lineheight}</Option>
                  )}
                </Select>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col span={12}>
                <Select defaultValue="medium" style={{ textTransform: 'capitalize', width: '100%' }}>
                  {TEXT_OPTIONS.FONT_REGULAR.map(f_regular =>
                    <Option key={f_regular} value={f_regular}>{f_regular}</Option>
                  )}
                </Select>
              </Col>
              <Col span={12}>
                <Select defaultValue="smooth" style={{ paddingLeft: '0.5rem', textTransform: 'capitalize', width: '100%' }}>
                  {TEXT_OPTIONS.FONT_SMOOTHING.map(f_smoothing =>
                    <Option key={f_smoothing} value={f_smoothing}>{f_smoothing}</Option>
                  )}
                </Select>
              </Col>
            </Row>
            {/* <ColorPicker value={color} onChange={this.handleChange} hideTextfield /> */}
            <Row>
              <Col span={12}>
                <input type="color" ></input>
              </Col>
            </Row>
            <Row className="mt-4 mb-3">
              <Col span={4}>
                <Fab size="small" color="primary">
                  <Icon name="bold" />
                </Fab>
              </Col>
              <Col span={4}>
                <Fab size="small" color="primary">
                  <Icon name="italic" />
                </Fab>
              </Col>
              <Col span={4}>
                <Fab size="small" color="primary">
                  <Icon name="underline" />
                </Fab>
              </Col>
              <Col span={4}>
                <Fab size="small" color="primary">
                  <Icon name="align-left" />
                </Fab>
              </Col>
              <Col span={4}>
                <Fab size="small" color="primary">
                  <Icon name="align-center" />
                </Fab>
              </Col>
              <Col span={4}>
                <Fab size="small" color="primary">
                  <Icon name="align-right" />
                </Fab>
              </Col>
            </Row>


          </TextPropertyWrapper>


          {/* <Row>
            <Col span={12}>
              <div className="cp-swatch" onClick={this.handleClick}>
                <div className="cp-color"
                  style={{ backgroundColor: background }} />
              </div>
              {displayColorPicker ? <div className="cp-popover">
                <div className="cp-cover" onClick={this.handleClose} />
                <SketchPicker color={color} onChange={this.handleChange} />
              </div> : null}
            </Col>
          </Row> */}

        </SettingsWrapper>
      </AddWrapper >
    )
  }
}