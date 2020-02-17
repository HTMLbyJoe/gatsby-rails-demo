import React from 'react';
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const getCookie = (name) => {
  // https://stackoverflow.com/a/15724300
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) return parts.pop().split(";").shift();
};

const LoginPage = () => {
  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    fetch('http://localhost:3000/sign_in', { credentials: 'include' }).then(() => {
      fetch('http://localhost:3000/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': decodeURIComponent(getCookie('CSRF-TOKEN')),
        },
        credentials: 'include',
        body: JSON.stringify({email, password}),
      });
    });
  };

  return (
  <Layout>
    <SEO title="Login Page" />
    <form onSubmit={onSubmit}>
      <input placeholder="Email" name="email" />
      <input placeholder="Password" type="password" name="password" />
      <button type="submit">Go</button>
    </form>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)};

export default LoginPage
