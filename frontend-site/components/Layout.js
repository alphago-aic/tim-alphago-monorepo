import React from 'react'
import Header from "./Header"

export default function Layout({ children, transparent }) {
  return (
    <>
      <Header transparent={transparent}/>
      <div>
        {children}
      </div>
    </>
  )
}
