/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useContext } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';

import AppContext from "../AppContext"
import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const { curentUserEmail, setCurentUserEmail } = useContext(AppContext);

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

  useQuery(CURRENT_USER_QUERY, { onCompleted: ({me}) => {
    me && setCurentUserEmail(me);
  } });

  const [logout, { data: {logout: logoutData} = {}, loading }] = useMutation(gql`
    mutation LogoutMutation {
      logout {
        success
      }
    }
  `);

  logoutData?.success && setCurentUserEmail();

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
        {curentUserEmail && <div>Signed in as <b>{curentUserEmail}</b> <button onClick={logout}>Log out</button></div>}
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
