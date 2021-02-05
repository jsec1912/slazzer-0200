import React, { Component } from 'react';
import { ToolWrapper, ToolLabel } from '../../styledComponents/index';
import Icon from '../icon/Icon';

export default class extends Component {

  render() {
    const { obj, selectedTool } = this.props;
    // const filteredName = name === 'rotate' ? 'orientation' : name;

    return (
      <ToolWrapper
        // active={activeTab === name}
        onClick={() => selectedTool(obj.name)}
      >

        <Icon name={obj.icon}></Icon>
        <ToolLabel>{obj.name}</ToolLabel>
      </ToolWrapper>
    )
  }
}