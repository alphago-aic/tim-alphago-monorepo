import React from 'react'
import Image from "next/image"

import SignUp from "../SignUp/SignUp"
import { LandingPageStyle, LandingPageLeft, LandingPageRight } from "./LandingPage.style"

import headlineImage from "../../public/static/images/landing-page/headline.png"

export default function LandingPage() {
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
          SQNA <small>(read: SONA)</small> | SMART QUESTION ANSWERING &quot;Helping to understand what you read with the help of AI&quot;
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
        <SignUp />
      </LandingPageRight>
    </LandingPageStyle>
  )
}
