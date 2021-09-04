import React, { useState } from 'react'
import axios from 'axios'

import Switch from '../Switch/Switch'
import FreeTextForm from '../FreeTextForm/FreeTextForm'

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
      axios.post('https://api.sqna.xyz/api2-generative', {
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
      axios.post('https://api.sqna.xyz/api1-generate', {
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
    <div>
      <div>
        <Switch isOn={isEnglish} handleToggle={() => setEnIndo(!isEnglish)}/>
      </div>
      <FreeTextForm onSubmit={submitForm} loading={loading} error={error} setText={setText} result={result} isQG />
    </div>
  )
}
