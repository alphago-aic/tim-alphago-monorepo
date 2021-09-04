import React from 'react'
import styled from "styled-components"

import Button from "../Button/Button"

const StyledFreeTextForm = styled.div`
  form {
    padding-top: 30px;
    max-width: 350px;
    margin: auto;

    textarea {
      width: 100%;
      border-radius: 12px;
    }
    
    button {
      max-width: 135px;
      width: 100%;
      margin: auto;
    }
  }

  .card-wrapper {
    background: ${props => props.theme.colors.primary};
    max-width: 450px;
    width: 100%;
    border-radius: 12px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    margin-bottom: 20px;
  }

  .card-top {
    background: #FFFFFF;
    border-radius: 12px;
  }

  .card-bottom {
    color: white;
    padding-top: 4px;
    padding-left: 15px;
    padding-right: 15px;

    .qa-pairs {
      display: flex;
      align-items: center;
    }

    h4 {
      width: calc(100% - 65px);
      margin-block-start: 1em;
      margin-block-end: 1em;
    }

    .question-count {
      background: white;
      border-radius: 8px;
      color: black;
      width: 65px;

      input {
        width: 100%;
        font-size: 1.1em;
        padding: 10px;
      }
    }

    .question-types {
      display: flex;
      align-items: center;

      select {
        padding-left: 5px;
      }
    }
  }

  .btn-wrapper {
    text-align: center;
  }
`

function FreeTextForm({ onSubmit, loading, error, setText, questionCount, setQuestionCount, questionType, setQuestionType, isQG }) {
  return (
    <StyledFreeTextForm>
      <form onSubmit={onSubmit}>
        <div className="card-wrapper">
          <div className="card-top">
            <textarea id="text-input" rows="16" placeholder="Write your text here...." onChange={(e) => {
              setText(e.target.value)
            }} />
          </div>
          {isQG ? <>
            <div className="card-bottom">
              <div className="qa-pairs">
                <h4>Amount of QA pairs</h4>
                <div className="question-count">
                  <input name="questions" type="number" value={questionCount} onChange={(e) => {
                    setQuestionCount(e.target.value)
                  }} max={99} />
                </div>
              </div>
              <div className="question-types">
                <h4>Question Type</h4>
                <select name="question-type" value={questionType} onChange={(e) => {
                  setQuestionType(e.target.value)
                }}>
                  <option value="all">All</option>
                  <option value="sentences">Essay</option>
                  <option value="multiple_choice">Multiple Choice</option>
                </select>
              </div>
            </div>
            {error ? <h5 style={{
              textAlign: "center",
              marginTop: "0",
              paddingBottom: "8px",
              paddingLeft: "4px",
              paddingRight: "4px"
            }}>
              {error}
            </h5> : <></>}
          </> : <></>}
        </div>
        <div className="btn-wrapper">
          <Button className="secondary" disabled={loading}>{loading ? "Loading..." : "Generate"}</Button>
        </div>
      </form>
    </StyledFreeTextForm>
  )
}

FreeTextForm.defaultProps = {
  isQG: false
}

export default FreeTextForm
