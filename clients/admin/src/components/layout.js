/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
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
  `;

  const { data } = useQuery(CURRENT_USER_QUERY);

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
        {data && data.me && <div>Signed in as <b>{data.me}</b></div>}
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
