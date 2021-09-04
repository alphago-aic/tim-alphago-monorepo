import Layout from "../components/Layout"
import SEO from '../components/SEO'
import AnswerIt from "../containers/AnswerIt/AnswerIt"

export default function AnswerItPage() {
  return (
    <Layout transparent>
      <SEO title={"Homepage - Answer It"} />
        <AnswerIt/>
    </Layout>
  )
}
