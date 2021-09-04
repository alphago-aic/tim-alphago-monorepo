import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from "next/image"
import Link from 'next/link'
import styled from 'styled-components'

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  padding-bottom: 0;

  &.transparent {
    position: absolute;
    z-index: 1002;
    width: 100%;
  }

  .nav-hamburger {
    cursor: pointer;
  }

  .nav-overlay {
    display: none;
    position: relative;
  }

  .nav-overlay.active {
    display: block;
  }

  .nav-overlay-inside {
    margin-top: 10px;
    position: absolute;
    right: 0;
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 14px 24px rgba(51, 51, 51, 0.2);
    border-radius: 4px;
    width: 200px;
    font-size: 1.1em;
    padding-top: 5px;
    padding-bottom: 5px;

    a {
      display: block;
      padding: 6px 10px;
    }

    a:hover {
      background: ${props => props.theme.colors.lightGreen};
    }

    a.active {
      color: ${props => props.theme.colors.primary};
    }
  }
`

export default function Header({ transparent }) {
  const router = useRouter();
  const [navOpened, setNavOpen] = useState(false)

  return (
    <HeaderStyle className={transparent ? "transparent" : ""}>
      <div>
        <Link href="/">
          <a>
            <Image
              src={router.pathname == "/" ? "/static/images/logo.png" : "/static/images/logo-2.png"}
              alt="SQNA"
              width={116}
              height={47}
            />
          </a>
        </Link>
      </div>
      <div>
        <div className="nav-hamburger" onClick={() => setNavOpen(!navOpened)}>
          <Image
            src="/static/images/hamburger.png"
            alt="SQNA"
            width={33}
            height={24}
          />
        </div>
        <div className={`nav-overlay ${navOpened ? "active" : ""}`}>
          <div className="nav-overlay-inside">
            <Link href="/homepage">
              <a className={router.pathname == "/homepage" ? "active" : ""}>
                Homepage
              </a>
            </Link>
            <Link href="/flashcard">
              <a className={router.pathname == "/flashcard" ? "active" : ""}>
                Flashcard
              </a>
            </Link>
            <Link href="/">
              <a>
                Sign Out
              </a>
            </Link>
          </div>
        </div>
      </div>
    </HeaderStyle>
  )
}
