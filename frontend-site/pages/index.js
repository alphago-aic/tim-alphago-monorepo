import SEO from '../components/SEO'
import LandingPage from '../containers/LandingPage/LandingPage'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <SEO title={"AI-powered Question Generator App"} />
      <LandingPage />
    </div>
  )
}
