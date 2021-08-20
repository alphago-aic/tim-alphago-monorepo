import React from 'react'
import Image from "next/image"
import Link from 'next/link'
import styled from 'styled-components'

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;

  &.transparent {
    position: absolute;
    z-index: 1002;
    width: 100%;
  }
`

export default function Header({ transparent }) {
  return (
    <HeaderStyle className={transparent ? "transparent" : ""}>
      <div>
        <Link href="/">
          <a>
            <Image
              src="/static/images/logo.png"
              alt="SQNA"
              width={116}
              height={47}
            />
          </a>
        </Link>
      </div>
      <div>
        <Image
          src="/static/images/hamburger.png"
          alt="SQNA"
          width={33}
          height={24}
        />
      </div>
    </HeaderStyle>
  )
}
