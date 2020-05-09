import React from 'react';
import { Link } from "gatsby"
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
  const [login, { data }] = useMutation(LOGIN_MUTATION);
  console.log(data);

  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const password = event.target.elements.password.value;

    login({ variables: { email, password } });
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
