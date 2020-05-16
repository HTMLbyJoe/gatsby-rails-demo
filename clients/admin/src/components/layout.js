/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import gql from "graphql-tag"
import { useQuery, useMutation } from "@apollo/client"

import AppContext from "../AppContext"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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

  const [logout, { loading }] = useMutation(
    gql`
      mutation LogoutMutation {
        logout {
          success
        }
      }
    `,
    {
      onCompleted: ({ logout: { success } }) => {
        success && setCurrentUserEmail()
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
        {currentUserEmail && (
          <div>
            Signed in as <b>{currentUserEmail}</b>{" "}
            <button onClick={logout} disabled={loading}>
              Log out
            </button>
          </div>
        )}
        <main>{children}</main>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
