import React, { useState } from 'react'
import axios from 'axios'

import FreeTextForm from '../../components/FreeTextForm/FreeTextForm'

import { SummarizeStyle, SummarizeLeft, SummarizeRight } from "./Summarize.style"

export default function Summarize() {
  const [result, setResult] = useState(null)
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    axios.post('https://api.sqna.xyz/summarize', {
      text: text
    })
    .then(response => {
      setResult(response.data?.data)
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

  return (
    <SummarizeStyle>
      <SummarizeLeft>
        <FreeTextForm onSubmit={submitForm} loading={loading} error={error} setText={setText} result={result} />
      </SummarizeLeft>
      <SummarizeRight>
        <div>
          {result ? result : ""}
        </div>
      </SummarizeRight>
    </SummarizeStyle>
  )
}
