import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Button from "../../components/Button/Button"
import { TextBoxStyle } from "./TextBox.style"
import axios from 'axios';

export default function TextBox() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
  
    const submitForm = (e) => {
      e.preventDefault()
      setLoading(true)
      axios.post('http://34.87.146.224:8000/generative/', {
          input:document.getElementById("text-input").value,
          num: 5,
          mode: 'all',
          output: 'string',
        })
        .then(response => {
          console.log(response.data.output);
          setLoading(false);
        });
          
    }
  
    return (
      <TextBoxStyle>
        <form onSubmit={submitForm}>
            <textarea id="text-input" rows="25" cols="45" placeholder="Write your text here...." >
            </textarea>
            <Button disabled={loading}>{loading ? "Loading..." : "Generate"}</Button>
        </form>
      </TextBoxStyle>
    )
  }
  