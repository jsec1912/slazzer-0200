import React, { Component } from 'react';
import { Toolbar, NoClickOverlay, NoClickToolbar } from '../../styledComponents';
import Tool from './Tool';
import Effects from './Effects';
import Filters from './Filters';
import Crop from './Crop';
import Resize from './Resize';
import Orientation from './Orientation';
import Adjust from './Adjust';
import Watermark from './Watermark';
import FocusPoint from './FocusPoint';
import Shapes from './Shapes';
import Image from './Image';
import Text from './Text';
import 'bootstrap/dist/css/bootstrap.min.css';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { NAVBAR_TOOLS } from '../../config';
 

export default class extends Component {
  render() {
    const { activeTab, isShowSpinner, activeBody, config } = this.props;
    const { tools } = config;
    const  navbarTools  = NAVBAR_TOOLS;
    return (
      <Toolbar>
        <PerfectScrollbar>
          <div className="scrollBar" style={{ display: 'flex', flexDirection: 'column' }}>
            {navbarTools.map(obj =>
              <Tool key={obj.name} obj={obj} {...this.props} 
            />)}
          </div>
        </PerfectScrollbar>
        {/* {activeTab === 'adjust' && <Adjust {...this.props}/>}
        {activeTab === 'effects' && <Effects {...this.props}/>}
        {activeTab === 'filters' && <Filters {...this.props}/>}
        {activeTab === 'rotate' && <Orientation {...this.props}/>}
        {activeTab === 'crop' && <Crop {...this.props}/>}
        {activeTab === 'resize' && <Resize {...this.props}/>}
        {activeTab === 'watermark' && <Watermark {...this.props}/>}
        {activeTab === 'focus_point' && <FocusPoint {...this.props}/>}
        {activeTab === 'shapes' && <Shapes {...this.props}/>}
        {activeTab === 'image' && <Image {...this.props}/>}
        {activeTab === 'text' && <Text {...this.props}/>}
        {(isShowSpinner) && <NoClickOverlay/>}
        {activeBody !== 'preview' && <NoClickToolbar/>} */}
      </Toolbar>
    )
  }
}