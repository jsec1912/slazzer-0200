import styled from 'styled-components';
import { Button } from './Button';
import { getHoverColor } from './styleUtils';

const HeaderWrapper = styled.div`
  background: #323232;
`;

const HeaderTop = styled.div`
  height: 50px;
  padding: 5px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  color: ${props => props.theme.colors.text};
`;

const ButtonsWrapper = styled.div`
  diplay: flex;
`;

const CancelBtn = styled(Button)`
  background: ${props => props.theme.colors.primaryBg};
  border-color: ${props => props.theme.colors.primaryBg};
  color: ${props => props.theme.colors.text};
  text-transform: ${props => props.noCapitalStrs ? 'none' : 'capitalize'};
  min-width: 62px;
  height: 30px;
  margin-right: 8px;
  border: 0;

  &:hover {
    background: ${props => getHoverColor(props.theme.colors.primaryBg)};
    border-color: ${props => props.theme.colors.primaryBg};
    color: ${props => props.theme.colors.text};  
  }
`;

const ToolbarWrapper = styled.div`
  position: relative;
  width: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #2b2b2b;
  padding: 5px;
  transition: 0.5s ease;
  
  @media (max-width: 768px) {
    flex-direction: column;
    height: initial;
  }
`;

export { HeaderWrapper, HeaderTop, Title, ButtonsWrapper, ToolbarWrapper, CancelBtn };
