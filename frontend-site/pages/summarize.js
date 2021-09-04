import Layout from "../components/Layout"
import SEO from '../components/SEO'
import Summarize from "../containers/Summarize/Summarize"

export default function SummarizePage() {
  return (
    <Layout transparent>
      <SEO title={"Homepage - Sum Up"} />
        <Summarize />
    </Layout>
  )
}
