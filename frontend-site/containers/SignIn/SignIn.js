import React, { useState } from 'react'
import { useRouter } from 'next/router'

import Button from "../../components/Button/Button"

import { SignInStyle } from "./SignIn.style"

export default function SignIn({ toSignUp }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const submitForm = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      router.push("/homepage")
    }, 2000);
  }

  return (
    <SignInStyle>
      <h1>Sign In</h1>
      <div>It&apos;s time to generate questions for your text!</div>
      <form onSubmit={submitForm}>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <Button disabled={loading}>{loading ? "Loading..." : "Sign In"}</Button>
      </form>
      <div className="already-have">Don&apos;t have an account? <span onClick={toSignUp}>Sign up</span></div>
    </SignInStyle>
  )
}
