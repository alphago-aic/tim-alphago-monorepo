import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
        .react-switch-checkbox {
            height: 0;
            width: 0;
            position: absolute;
            visibility: hidden;
        }
        
        .react-switch {
            cursor: pointer;
            width: 115px;
            height: 45px;
            border-radius: 400px;
            position: absolute;
            
        }
        
        .react-switch-button{
            position: absolute;
            z-index: 1;
            margin: 5px 5px;
            border-radius: 400px;
            width: 55px;
            height: 35px;
            background: #fff;
            box-shadow: 0 0 3px 1px rgba(0, 0, 0, 0.29);
        }
        
        .react-switch-checkbox:checked + .react-switch-button {
            left: calc(100% - 9px);
            transform: translateX(-100%);
            
        }
        
        .react-switch-checkbox:active + .react-switch-button{
            width: 60px;
        }
        
        .react-switch-labels {
            background: white;
            opacity: 50%;
            border-radius: 400px;
            display: relative;
            z-index: 0;
            height: 100%;
            font: 14pt "Open Sans";
        }
        
        .react-switch-labels span {
            opacity: 100%;
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 50%;
            height: 100%;
        }
        .react-switch-labels span:first-child {
            left: 0;
        }
        .react-switch-labels span:last-child {
            right: 0;
        }
        
        .button-text{
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            font: 14pt "Open Sans";
        }
  
  `
export default function Switch({ isOn, handleToggle}) {
  return (
    <StyledButton>
        <label className="react-switch">
        <input
            checked={isOn}
            onChange={handleToggle}
            className="react-switch-checkbox"
            type="checkbox"
        />
        <div className="react-switch-button" >
            <div className="button-text">
            <span>{isOn?"ID":"EN"}</span>
            </div>
        </div>
        <div className="react-switch-labels">
            <span>EN</span>
            <span>ID</span>
        </div>
        </label>
    </StyledButton>
  );
};
