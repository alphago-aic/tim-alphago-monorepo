import React, { useState } from 'react'
import styled from 'styled-components'
import Image from "next/image"

import Button from '../Button/Button'

const StyledFlashCard = styled.div`
  background: ${props => props.theme.colors.primary};
  max-width: 450px;
  width: 100%;
  border-radius: 12px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  .flashcard-top {
    background: #FFFFFF;
    border-radius: 12px;
    padding-top: 26px;
    padding-bottom: 20px;

    h3 {
      color: ${props => props.theme.colors.primary};
      width: 80%;
      margin: auto;
    }

    .abcd-options {
      width: 90%;
      text-align: left;
      margin: auto;
      margin-bottom: 20px;
    }

    .button-list {
      text-align: center;
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
    padding-bottom: 20px;
    position: relative;

    h4 {
      margin-top: 20px;
      margin-bottom: 6px;
      text-align: center;
    }

    .checklist-box {
      position: absolute;
      left: 12px;
    }

    .answer-desc {
      width: calc(100% - 125px);
      margin: auto;
      text-align: center;

      li.wrong {
        display: none;
      }
    }
  }
`

export default function FlashCardComponent({ result, questionId, next, prev }) {
  const [showAns, setShowAns] = useState(false)

  const qa = result[questionId]
  let correctAnswer = ""
  if (typeof(qa.answer) === 'string') {
    correctAnswer = qa.answer
  } else {
    qa.answer.forEach((ans, index) => {
      if (ans.correct) {
        const abc = String.fromCharCode('a'.charCodeAt(0) + index)
        correctAnswer = abc + ". " + ans.answer;
      }
    })
  }

  return (
    <StyledFlashCard>
      <div className="flashcard-top">
        <h3>{questionId + 1}. {qa.question}</h3>
        <div className="abcd-options">
          {typeof(qa.answer) === 'string' ?
          <></> :
          <div>
            <ol type="a">
              {qa.answer.map((ans, ansId) => (
                <li key={ansId}>
                  {ans.answer}
                </li>
              ))}
            </ol>
          </div>
          }
        </div>
        <div className="button-list">
          <Button className="btn-back" onClick={() => {
            setShowAns(false)
            prev()
          }}>{questionId === 0 ? "RESET" : "BACK"}</Button>
          <Button className="btn-answer" onClick={() => setShowAns(true)}>ANSWER</Button>
          <Button className="btn-next" onClick={() => {
            setShowAns(false)
            next()
          }}>{questionId === result.length - 1 ? "RESET" : "NEXT"}</Button>
        </div>
      </div>
      {showAns ? <div className="flashcard-bottom">
        <div className="checklist-box">
          <Image
            src="/static/images/flashcard/checklist.png"
            alt="Checklist"
            width={50}
            height={50}
          />
        </div>
        <h4>Answer:</h4>
        <div className="answer-desc">
          {correctAnswer}
        </div>
      </div> : <></>}
    </StyledFlashCard>
  )
}
