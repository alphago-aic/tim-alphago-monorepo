import Layout from "../components/Layout"
import SEO from '../components/SEO'
import Homepage from '../containers/Homepage/Homepage'

export default function HomePage() {
  return (
    <Layout transparent>
      <SEO title={"Homepage - Question Generator"} />
        <Homepage/>
    </Layout>
  )
}
