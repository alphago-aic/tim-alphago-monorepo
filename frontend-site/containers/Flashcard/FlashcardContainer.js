import React from 'react'
import styled from 'styled-components'

import FlashCardComponent from "../../components/FlashCard/FlashCardComponent"

const StyledFlashcardContainer = styled.div`
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`

export default function FlashcardContainer() {
  return (
    <StyledFlashcardContainer>
      <FlashCardComponent />
    </StyledFlashcardContainer>
  )
}
