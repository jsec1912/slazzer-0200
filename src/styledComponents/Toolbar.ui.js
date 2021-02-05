import styled from 'styled-components';
import { getIconStyles, getIconByName } from './styleUtils';


const Toolbar = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-x: ${p => p.overlayYHidden ? 'auto' : 'none'};
  overflow-y: ${p => p.overlayYHidden ? 'hidden' : 'visible'};
  white-space: nowrap;
  text-align: center;
  
  ::-webkit-scrollbar {
    height: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border || '#3b4d54'};
    border-radius: 5px;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    height: initial;
    padding: 0 10px;
  }
`;

const ToolWrapper = styled.div`
  padding: 10px 5px;
  cursor: pointer;
  max-height: 75px;
  display: inline-block;
  min-height: 100%;
  text-align: center;
  font-size: 12px;
  color: ${props => props.theme.colors.text};
  text-transform: ${props => props.noCapitalStrs ? 'none' : props.tt || 'capitalize'};
  background: ${props => props.active ? props.theme.colors.secondaryBg : 'inherit'};
  
  &:hover {
    color: ${props => props.theme.colors.textHover};
    background: #333333;
  }
`;

const ToolIcon = styled.div`
  height: 40px;
  font-size: 40px;
  
  ${props => getIconStyles(props)};
  ${props => getIconByName(props.name)};
`;

const ToolLabel = styled.div`
  margin-top: 4px;
  white-space: normal;
  text-transform: capitalize;
`;

const EffectsWrapper = styled.div`
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  
  ::-webkit-scrollbar {
    height: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border || '#3b4d54'};
    border-radius: 5px;
  }
`;

const EffectWrapper = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  min-width: 90px;
  height: 60px;
  cursor: pointer;
  color: ${props => props.theme.colors.text};
  font-size: 12px;
  background: ${p => p.active ? p.theme.colors.secondaryBgHover : 'transparent'};
  
  &:hover {
    background: #262626;
  }
`;

const EffectIcon = styled.div`
  background: url('${props => props.src}') 50% 50% / cover no-repeat;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
  display: inline-block;
`;

const EffectLabel = styled.div`
  text-transform: ${p => p.noCapitalStrs ? 'none' : 'capitalize'};
  height: 20px;
  line-height: 20px;
`;

export {
  Toolbar, ToolWrapper, ToolIcon, ToolLabel, EffectsWrapper, EffectWrapper, EffectIcon, EffectLabel
};
