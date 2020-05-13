import React from "react"
import { Link } from "gatsby"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import LoginForm from "./components/LoginForm"

const LoginPage = () => {
  return (
    <Layout>
      <SEO title="Login Page" />
      <LoginForm />
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default LoginPage
