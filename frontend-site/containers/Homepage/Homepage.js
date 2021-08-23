import React, { useState } from 'react'

import QuestionGenerator from '../../components/QuestionGenerator/QuestionGenerator';

import { HomepageStyle, HomepageLeft, HomepageRight } from "./Homepage.style"

export default function Homepage() {
  const [result, setResult] = useState(null)

  return (
    <HomepageStyle>
      <HomepageLeft>
        <QuestionGenerator setResult={setResult} result={result} />
      </HomepageLeft>
      <HomepageRight>
        <div>
          <ol className="qa-ordered-list">
            {result?.map((qa, idQa) => (
              <li key={idQa} className="qa-wrapper">
                <div className="homepage-question">{qa.question}</div>
                <div className="homepage-answer">
                  {typeof(qa.answer) === 'string' ?
                  <div>
                    {qa.answer}
                  </div> :
                  <div>
                    <ol type="a">
                      {qa.answer.map((ans, ansId) => (
                        <li key={ansId} className={ans.correct ? "correct" : ""}>
                          {ans.answer}
                        </li>
                      ))}
                    </ol>
                  </div>
                  }
                </div>
              </li>
            ))}
          </ol>
        </div>
      </HomepageRight>
    </HomepageStyle>
  )
}
