import Header from "../components/Header"

import '../styles/globals.css'
import { GlobalStyle } from "../styles/globals"

function MyApp({ Component, pageProps }) {
  return (
    <GlobalStyle>
      <Header />
      <link href={`https://fonts.googleapis.com/css2?family=Open+Sans&display=swap`} rel="stylesheet" />
      <Component {...pageProps} />
    </GlobalStyle>
  )
}

export default MyApp
