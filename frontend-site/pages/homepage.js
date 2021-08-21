import Layout from "../components/Layout"
import SEO from '../components/SEO'
import Homepage from '../containers/Homepage/Homepage'

export default function QGHome() {
  return (
    <Layout transparent>
      <SEO title={"Homepage - Question Generator"} />
        <Homepage/>
    </Layout>
  )
}
