import React, { useContext } from "react"
import { navigate } from "gatsby"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import AppContext from "../../../AppContext"

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password)
      @connection(key: "login", filter: ["email"]) {
      success
      email
      errors
    }
  }
`

const LoginForm = () => {
  const { setCurrentUserEmail } = useContext(AppContext)
  const [login, { data: { login: loginData } = {}, loading }] = useMutation(
    LOGIN_MUTATION,
    {
      onCompleted: ({ login: { success, email } }) => {
        if (success) {
          setCurrentUserEmail(email)
          navigate("/")
        }
      },
    }
  )

  const onSubmit = event => {
    event.preventDefault()
    const email = event.target.elements.email.value
    const password = event.target.elements.password.value

    login({ variables: { email, password } })
  }

  return (
    <form onSubmit={onSubmit}>
      {loginData?.errors.map((error, index) => (
        <div key={index}>{error}</div>
      ))}
      <input placeholder="Email" name="email" disabled={loading} />
      <input
        placeholder="Password"
        type="password"
        name="password"
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        Go
      </button>
    </form>
  )
}

export default LoginForm
