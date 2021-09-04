import React, { useState } from 'react'
import styled from 'styled-components'

import QuestionGenerator from '../../components/QuestionGenerator/QuestionGenerator'
import FlashCardComponent from "../../components/FlashCard/FlashCardComponent"

const StyledFlashcardContainer = styled.div`
  background: linear-gradient(82.84deg, #2DC4A9 0%, #75EDA6 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 30px;
  padding-top: 100px;

  .question-generator-wrapper {
    max-width: 450px;
    width: 100%;
  }
`

export default function FlashcardContainer() {
  const [result, setResult] = useState(null)
  const [questionId, setQuestionId] = useState(0)

  const nextQuestion = () => {
    const nextId = questionId + 1
    if (nextId >= result.length) {
      setResult(null)
      setQuestionId(0)
    } else {
      setQuestionId(nextId)
    }
  }
  
  const prevQuestion = () => {
    const nextId = questionId - 1
    if (nextId < 0) {
      setResult(null)
      setQuestionId(0)
    } else {
      setQuestionId(nextId)
      
    }
  }

  return (
    <StyledFlashcardContainer>
      {result ?
        <FlashCardComponent result={result} questionId={questionId} next={nextQuestion} prev={prevQuestion} />
        :
        <div className="question-generator-wrapper">
          <QuestionGenerator setResult={setResult} result={result} />
        </div>
      }
    </StyledFlashcardContainer>
  )
}
