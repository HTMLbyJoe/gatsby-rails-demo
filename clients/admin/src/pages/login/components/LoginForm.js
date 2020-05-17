import React, { useContext } from "react"
import { navigate } from "gatsby"
import { Button } from "theme-ui"
import gql from "graphql-tag"
import { useMutation } from "@apollo/client"
import { Formik, Form } from "formik"
import AppContext from "../../../AppContext"
import TextInput from "../../../components/inputs/TextInput"

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
  const { currentUserEmail, setCurrentUserEmail } = useContext(AppContext)
  const [login] = useMutation(LOGIN_MUTATION)

  if (currentUserEmail) {
    navigate("/")
  }

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={({ email, password }, { setSubmitting, setStatus }) => {
        login({
          variables: { email, password },
        }).then(
          ({
            data: {
              login: { success, email, errors },
            },
          }) => {
            setSubmitting(false)
            setStatus({ errors })
            if (success) {
              setCurrentUserEmail(email)
              navigate("/")
            }
          }
        )
      }}
    >
      {({ status: { errors = [] } = {}, isSubmitting }) => (
        <Form>
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="jane@example.com"
            disabled={isSubmitting}
          />
          <br />
          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="letmein"
            disabled={isSubmitting}
          />
          <Button mt={2} type="submit" disabled={isSubmitting}>
            Go
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default LoginForm
