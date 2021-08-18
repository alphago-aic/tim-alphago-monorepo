import Head from 'next/head'

function SEO({ title }) {
  return (
    <Head>
      <title>{title} | SQNA</title>
      <meta name="description" content="SQNA is a web app that uses cutting-edge Natural Language Processing transformers to create question-answer pairs from given text." />
      <meta name="viewport" content="width=device-width, initial-scale=0.9, shrink-to-fit=no" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default SEO
