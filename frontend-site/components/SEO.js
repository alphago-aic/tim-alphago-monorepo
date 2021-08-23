import Head from 'next/head'

function SEO({ title }) {
  return (
    <Head>
      <title>{title} | SQNA</title>
      <meta name="description" content="SQNA is a web app that uses cutting-edge Natural Language Processing transformers to create question-answer pairs from given text." />
      <meta name="viewport" content="width=device-width, initial-scale=0.9, shrink-to-fit=no" />
      <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}

export default SEO
