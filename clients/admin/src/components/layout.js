/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { Location } from "@reach/router"
import { withPrefix, useStaticQuery, graphql } from "gatsby"
import { Button } from "theme-ui"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/client"
import AppContext from "../AppContext"
import Link from "./Link"
import Header from "./header"
import "./layout.css"

const Layout = ({ location, children }) => {
  const { currentUserEmail, setCurrentUserEmail } = useContext(AppContext)

  const staticData = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const CURRENT_USER_QUERY = gql`
    {
      me
    }
  `

  useQuery(CURRENT_USER_QUERY, {
    onCompleted: ({ me }) => {
      me && setCurrentUserEmail(me)
    },
  })

  const [logout, { loading, client }] = useMutation(
    gql`
      mutation LogoutMutation {
        logout {
          success
        }
      }
    `,
    {
      onCompleted: ({ logout: { success } }) => {
        if (success) {
          setCurrentUserEmail()
          client.resetStore()
        }
      },
    }
  )

  return (
    <>
      <Header siteTitle={staticData.site.siteMetadata.title} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0 1.0875rem 1.45rem`,
        }}
      >
        <div>
          {currentUserEmail && (
            <>
              Signed in as <b>{currentUserEmail}</b>{" "}
              <Button onClick={logout} disabled={loading}>
                Log out
              </Button>
            </>
          )}
          {!currentUserEmail && location.pathname !== withPrefix("/login/") && (
            <Link to="/login/">Log in</Link>
          )}
        </div>
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default props => (
  <Location>
    {locationProps => <Layout {...locationProps} {...props} />}
  </Location>
)
