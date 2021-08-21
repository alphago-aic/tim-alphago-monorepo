import React from 'react'
import Image from "next/image"

import { HomepageStyle, HomepageLeft, HomepageRight } from "./Homepage.style"
import TextBox from '../TextBox/TextBox'


export default function Homepage() {
  return (
    <HomepageStyle>
      <HomepageLeft>
        <TextBox/>
      </HomepageLeft>
      <HomepageRight>
      </HomepageRight>
    </HomepageStyle>
  )
}
