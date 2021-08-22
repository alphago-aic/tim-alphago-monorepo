import Layout from "../components/Layout"
import SEO from '../components/SEO'

import FlashcardContainer from "../containers/Flashcard/FlashcardContainer"

export default function Flashcard() {
  return (
    <Layout transparent>
      <SEO title={"Flashcard Generator"} />
      <FlashcardContainer />
    </Layout>
  )
}
