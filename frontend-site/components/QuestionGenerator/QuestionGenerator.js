import React, { useState } from 'react'
import axios from 'axios'

import Switch from '../Switch/Switch'
import Button from '../Button/Button'

import { StyledQuestionGenerator } from "./QuestionGenerator.style"

export default function QuestionGenerator({ setResult, result }) {
  const [isEnglish, setEnIndo] = useState(false);
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    if (isEnglish) {
      axios.post('http://34.87.146.224:8000/generative', {
        input: text,
        num: 10,
        mode: "all",
        output: "string"
      })
      .then(response => {
        setResult(response.data.output);
        setLoading(false);
      });
    } else {
      axios.post('http://sqna.us-east-1.elasticbeanstalk.com/generate', {
        text: text,
        num_questions: 10,
        answer_style: "all",
        languange: "indonesia"
      }).then(response => {
        setResult(response.data.data);
        setLoading(false);
      })
    }
  }

  return (
    <StyledQuestionGenerator>
      <div>
        <Switch isOn={isEnglish} handleToggle={() => setEnIndo(!isEnglish)}/>
      </div>
      <form onSubmit={submitForm}>
        <div className="card-wrapper">
          <div className="card-top">
            <textarea id="text-input" rows="18" placeholder="Write your text here...." onChange={(e) => {
              setText(e.target.value)
            }} />
          </div>
          <div className="card-bottom">
            <h4>Amount of QA pairs</h4>
            <div className="question-count">
              {result ? String(result.length) : "N/A"}
            </div>
          </div>
        </div>
        <div className="btn-wrapper">
          <Button className="secondary" disabled={loading}>{loading ? "Loading..." : "Generate"}</Button>
        </div>
      </form>
    </StyledQuestionGenerator>
  )
}
