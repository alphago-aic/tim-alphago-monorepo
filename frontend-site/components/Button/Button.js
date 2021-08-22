import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  color: white;
  background: ${props => props.theme.colors.blue};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border: none;
  border-radius: 6px;
  padding: 12px 20px;
  transition: opacity .2s;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  &:disabled {
    cursor: unset;
    opacity: 0.7;
  }
`

export default function Button({ children, ...props }) {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  )
}
