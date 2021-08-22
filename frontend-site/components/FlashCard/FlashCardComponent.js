import React from 'react'
import styled from 'styled-components'
import Image from "next/image"

import Button from '../Button/Button'

const StyledFlashCard = styled.div`
  background: ${props => props.theme.colors.primary};
  max-width: 450px;
  width: 100%;
  border-radius: 12px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  text-align: center;

  .flashcard-top {
    background: #FFFFFF;
    border-radius: 12px;
    padding-top: 10px;
    padding-bottom: 20px;

    h2 {
      color: ${props => props.theme.colors.primary};
    }

    .abcd-options {
      width: 300px;
      text-align: left;
      margin: auto;
      margin-bottom: 20px;
    }

    button {
      width: 120px;
      margin: 0 8px;
      font-size: 1.05em;
    }

    .btn-back {
      background: #FFFFFF;
      border: 1px solid #24B097;
      color: ${props => props.theme.colors.primary};
      box-sizing: border-box;
    }

    .btn-answer {
      border: 1px solid ${props => props.theme.colors.blue};
      box-sizing: border-box;
    }

    .btn-next {
      background: ${props => props.theme.colors.primary};
      border: 1px solid #24B097;
      color: white;
      box-sizing: border-box;
    }
  }

  .flashcard-bottom {
    color: white;
    padding-bottom: 25px;
    position: relative;

    h4 {
      margin-top: 20px;
      margin-bottom: 6px;
    }

    .checklist-box {
      position: absolute;
      left: 24px;
    }
  }
`

export default function FlashCardComponent() {
  return (
    <StyledFlashCard>
      <div className="flashcard-top">
        <h2>Siapa nama ayah Soekarno?</h2>
        <div className="abcd-options">
          <div>a. Lorem</div>
          <div>b. Lorem Ipsum</div>
          <div>c. Dong Dong</div>
          <div>d. Text Lorem</div>
        </div>
        <div className="button-list">
          <Button className="btn-back">BACK</Button>
          <Button className="btn-answer">ANSWER</Button>
          <Button className="btn-next">NEXT</Button>
        </div>
      </div>
      <div className="flashcard-bottom">
        <div className="checklist-box">
          <Image
            src="/static/images/flashcard/checklist.png"
            alt="Checklist"
            width={50}
            height={50}
          />
        </div>
        <h4>Answer:</h4>
        <div>b. Raden Soekami Sosrodihardjo</div>
      </div>
    </StyledFlashCard>
  )
}
