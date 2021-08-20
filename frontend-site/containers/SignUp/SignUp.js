import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Button from "../../components/Button/Button"

import { SignUpStyle } from "./SignUp.style"

export default function SignUp() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000);
  }

  return (
    <SignUpStyle>
      <h1>Sign Up</h1>
      <div>It&apos;s time to generate questions for your text!</div>
      <form onSubmit={submitForm}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <Button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</Button>
      </form>
      <div className="already-have">Already have an account? <span>Sign in</span></div>
    </SignUpStyle>
  )
}
