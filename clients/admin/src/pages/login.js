import React from 'react';
import { Link, navigate } from "gatsby"
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Layout from "../components/layout"
import SEO from "../components/seo"

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) @connection(key: "login", filter: ["email"]) {
      success
      email
      errors
    }
  }
`;

const LoginPage = () => {
  const [login, { data: {login: loginData} = {}, loading }] = useMutation(LOGIN_MUTATION);

  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    login({ variables: { email, password } });
  };

  if (loginData?.success) {
    navigate('/');
    return null;
  }

  return (
  <Layout>
    <SEO title="Login Page" />

    {loginData?.errors.map((error, index) => <div key={index}>{error}</div>)}

    <form onSubmit={onSubmit}>
      <input placeholder="Email" name="email" disabled={loading} />
      <input placeholder="Password" type="password" name="password" disabled={loading} />
      <button type="submit" disabled={loading}>Go</button>
    </form>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)};

export default LoginPage
