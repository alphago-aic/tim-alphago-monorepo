import React, { useState } from 'react'
import axios from 'axios'

import Button from '../../components/Button/Button'

import { AnswerItStyle, AnswerItLeft, AnswerItRight } from "./AnswerIt.style"

export default function AnswerIt() {
  const [result, setResult] = useState(null)
  const [text, setText] = useState("")
  const [question, setQuestion] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    axios.post('http://3.227.253.179/qa', {
      context: text,
      question: question
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
    <AnswerItStyle onSubmit={submitForm}>
      <AnswerItLeft>
        <div className="text-wrapper">
          <textarea id="text-input" rows="18" placeholder="Masukkan teks Anda disini...." onChange={(e) => {
            setText(e.target.value)
          }} />
        </div>
      </AnswerItLeft>
      <AnswerItRight>
        <div>
          <input type="text" name="question" onChange={(e) => {
            setQuestion(e.target.value)
          }} placeholder="Masukkan pertanyaan Anda disini...." />
          <br/>
          <Button className="secondary" disabled={loading}>{loading ? "Loading..." : "Jawab"}</Button>
          {error ? <h5 style={{
            paddingBottom: "4px",
            paddingTop: "4px",
            color: "black"
          }}>
            {error}
          </h5> : <></>}
          {result?.answer ? <>
            <h4>Jawaban:</h4>
            <p>{result.answer}</p>
          </> : <></>}
        </div>
      </AnswerItRight>
    </AnswerItStyle>
  )
}
