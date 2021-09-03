import React, { useState } from 'react'
import axios from 'axios'

import Switch from '../Switch/Switch'
import Button from '../Button/Button'

import { StyledQuestionGenerator } from "./QuestionGenerator.style"

export default function QuestionGenerator({ setResult, result }) {
  const [isEnglish, setEnIndo] = useState(false);
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (isEnglish) {
      axios.post('http://sqna-english.sqna.xyz:8000/generative', {
        input: text,
        num: 10,
        mode: "all",
        output: "string"
      })
      .then(response => {
        setResult(response.data.output)
      }).catch((err) => {
        if (err.response?.data?.errorMessage?.includes("Task timed out")) {
          setError("Failed to generate QA pairs. Please reduce your text size")
        } else {
          setError("An error occured. Please try again later")
        }
      }).finally(() => {
        setLoading(false)
      })
    } else {
      axios.post('http://sqna-indo.sqna.xyz/generate', {
        text: text,
        num_questions: 10,
        answer_style: "all",
        languange: "indonesia"
      }).then(response => {
        setResult(response.data.data)
      }).catch((err) => {
        if (err.response?.data?.errorMessage?.includes("Task timed out")) {
          setError("Failed to generate QA pairs. Please reduce your text size")
        } else {
          setError("An error occured. Please try again later")
        }
      }).finally(() => {
        setLoading(false)
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
          {error ? <h5 style={{
            textAlign: "center",
            marginTop: "0",
            paddingBottom: "8px",
            paddingLeft: "4px",
            paddingRight: "4px"
          }}>
            {error}
          </h5> : <></>}
        </div>
        <div className="btn-wrapper">
          <Button className="secondary" disabled={loading}>{loading ? "Loading..." : "Generate"}</Button>
        </div>
      </form>
    </StyledQuestionGenerator>
  )
}
