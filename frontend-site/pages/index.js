import Layout from "../components/Layout"
import SEO from '../components/SEO'
import LandingPage from '../containers/LandingPage/LandingPage'

export default function Home() {
  return (
    <Layout transparent>
      <SEO title={"AI-powered Question Generator App"} />
      <LandingPage />
    </Layout>
  )
}
