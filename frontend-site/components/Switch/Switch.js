import React from 'react'
import styled from 'styled-components'

const StyledSwitch = styled.div`
  background: rgba(255, 255, 255, 0.48);
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 26px;
  display: flex;
  color: ${props => props.theme.colors.primary};
  font-weight: bold;
  width: min-content;
  margin: auto;
  padding: 2px;
  cursor: pointer;

  & > div {
    padding: 7.5px 30px;
    margin: 5px;
    border-radius: 18px;
    transition: background-color .6s;
    background-color: transparent;
  }

  & > div:first-child {
    margin-right: 0;
  }

  & > div:last-child {
    margin-left: 0;
  }

  & > div.active {
    background-color: white;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }
`
export default function Switch({ isOn, handleToggle }) {
  return (
    <StyledSwitch onClick={handleToggle}>
      <div className={isOn ? "active" : ""}>
        EN
      </div>
      <div className={isOn ? "" : "active"}>
        ID
      </div>
    </StyledSwitch>
  );
};
