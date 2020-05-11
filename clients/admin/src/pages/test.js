import React from "react"
import { Link } from "gatsby"
import { useQuery } from "@apollo/client"
import gql from "graphql-tag"
import Layout from "../components/layout"
import SEO from "../components/seo"

// This query is executed at run time by Apollo.
const APOLLO_QUERY = gql`
  {
    meme(where: { id: "cjke2xlf9nhd90953khilyzja" }) {
      photo {
        url(
          transformation: {
            image: { resize: { width: 600, height: 600, fit: crop } }
          }
        )
      }
    }
  }
`

const TestPage = () => {
  const { loading, error, data } = useQuery(APOLLO_QUERY)

  return (
    <Layout>
      <SEO title="Test Page" />
      <p>
        Stolen from{" "}
        <a href="https://github.com/jlengstorf/gatsby-with-apollo">
          https://github.com/jlengstorf/gatsby-with-apollo
        </a>
      </p>
      <p>This loads at runtime.</p>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: ${error.message}</p>}
        {data && data.meme && data.meme.photo && (
          <img src={data.meme.photo.url} alt="" style={{ maxWidth: 300 }} />
        )}
      </div>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default TestPage
