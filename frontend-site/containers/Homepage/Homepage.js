import React from 'react'
import Image from "next/image"

import { HomepageStyle, HomepageLeft, HomepageRight } from "./Homepage.style"
import TextBox from '../TextBox/TextBox'
import Switch from "../../components/Switch/Switch";


export default function Homepage() {
  const [value, setValue] = React.useState(false);
  return (

    
    <HomepageStyle>
      <HomepageLeft>
        <div>
          <Switch isOn={value} handleToggle={() => setValue(!value)}/>
        </div>
        <TextBox/>
      </HomepageLeft>
      <HomepageRight>
      </HomepageRight>
    </HomepageStyle>
  )
}
