import React, { Fragment } from 'react';
import styled from 'styled-components';


const WorkareaWrapper = styled.div`
 diplay: flex;
 justify-content: center;
 align-items: center;
 width: ${props => props.activeToolItems ? 'calc(100% - 260px)' : '100%'};
 padding: 1rem;
 transition: 0.5s ease;
`;

const FooterItemsWrapper = styled.div`
  display: inline-flex;
  ul {
    display: inline-flex;
    align-items: center;
    margin-bottom: 0;
    list-style: none;
  }

  ul>li {
    max-height: 18px;
    display: flex;
    align-items: center;
    border-right: 2px solid #1f1f1f;
    padding-right: 8px;
    margin-right: 8px;
  }

  .ant-select-selector {
    background-color: transparent;
    border: none;
  }
`;

const ToolbaritemsWrapper = styled.div`
  width: 260px;
  position: absolute;
  right: 0;
  height: 100%;
  padding: 20px 15px;
  background-color: #323232;
`;

const SelectScreenWrapper = styled.div`
  display: inline-block;
  align-items: center;
  margin-left: 50px;

  .resolution-title {
    font-size: 12px;
    text-transform: uppercase;
    line-height: 18px;
    color: #a1a1a1;
    margin-right: 5px;
  }

  .ant-select-selector {
    background-color: transparent!important;
    border: 1px solid #a1a1a1!important;
    border-radius: 5px!important; 
  }
`;

export { WorkareaWrapper, ToolbaritemsWrapper, SelectScreenWrapper, FooterItemsWrapper };
