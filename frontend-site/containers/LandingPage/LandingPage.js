import React, { useState } from 'react'
import Image from "next/image"

import SignIn from '../SignIn/SignIn'
import SignUp from "../SignUp/SignUp"
import { LandingPageStyle, LandingPageLeft, LandingPageRight } from "./LandingPage.style"

import headlineImage from "../../public/static/images/landing-page/headline.png"

export default function LandingPage() {
  const [isSignUp, setSignUp] = useState(true)

  return (
    <LandingPageStyle>
      <LandingPageLeft>
        <div className="image-headline">
          <Image
            src={headlineImage}
            alt="Headline"
          />
        </div>
        <h3>
          SQNA <small>(read: SONA)</small> | SMART QUESTION ANSWERING &quot;Sharpening your understanding with the help of AI&quot;
        </h3>
        <p>
          SQNA is a web app that uses cutting-edge Natural Language Processing transformers to create question-answer pairs from given text.
        </p>
        <div className="social-media">
          <a>
            <Image
              src="/static/images/sosmed-github.png"
              alt="Github"
              width={30}
              height={30}
            />
          </a>
          <a>
            <Image
              src="/static/images/sosmed-linkedin.png"
              alt="LinkedIn"
              width={30}
              height={30}
            />
          </a>
          <a>
            <Image
              src="/static/images/sosmed-mail.png"
              alt="Mail"
              width={30}
              height={30}
            />
          </a>
        </div>
      </LandingPageLeft>
      <LandingPageRight>
        {isSignUp ?
          <SignUp toSignIn={() => setSignUp(false)} />
        :
          <SignIn toSignUp={() => setSignUp(true)} />
        }
        <small style={{
          display: "block",
          textAlign: "center",
          padding: "8px",
          paddingTop: "18px",
          maxWidth: "300px",
          margin: "auto"
        }}>
          *This is a demo application. You can fill the form above with anything (or leave it blank).
        </small>
      </LandingPageRight>
    </LandingPageStyle>
  )
}
