import React, { useState } from 'react'
import axios from 'axios'

import Switch from '../Switch/Switch'
import FreeTextForm from '../FreeTextForm/FreeTextForm'

export default function QuestionGenerator({ setResult, result }) {
  const [isEnglish, setEnIndo] = useState(false);
  const [questionType, setQuestionType] = useState("all")
  const [questionCount, setQuestionCount] = useState(10)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    if (isEnglish) {
      axios.post('https://api.sqna.xyz/api2-generative/', {
        input: text,
        num: questionCount,
        mode: questionType,
        output: "string"
      })
      .then(response => {
        setResult(response.data.output)
        setQuestionCount(response.data.output?.length)
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
      axios.post('https://api.sqna.xyz/api1-generate', {
        text: text,
        num_questions: questionCount,
        answer_style: questionType,
        languange: "indonesia"
      }).then(response => {
        setResult(response.data.data)
        setQuestionCount(response.data.data?.length)
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
    <div>
      <div>
        <Switch isOn={isEnglish} handleToggle={() => setEnIndo(!isEnglish)}/>
      </div>
      <FreeTextForm
        onSubmit={submitForm}
        loading={loading}
        error={error}
        setText={setText}
        setQuestionCount={setQuestionCount}
        questionCount={questionCount}
        questionType={questionType}
        setQuestionType={setQuestionType}
        result={result}
        isQG
      />
    </div>
  )
}
