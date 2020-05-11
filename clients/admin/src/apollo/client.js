import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client"
import { setContext } from "apollo-link-context"
import fetch from "node-fetch"

const getCookie = name => {
  // https://stackoverflow.com/a/15724300
  var value = "; " + document.cookie
  var parts = value.split("; " + name + "=")
  if (parts.length === 2)
    return parts
      .pop()
      .split(";")
      .shift()
}

async function getCsrfToken() {
  if (getCookie("CSRF-TOKEN")) {
    return decodeURIComponent(getCookie("CSRF-TOKEN"))
  } else {
    return await fetch(`${process.env.API_URL}/cookie`, {
      credentials: "include",
    }).then(() => {
      return decodeURIComponent(getCookie("CSRF-TOKEN"))
    })
  }
}

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRF-Token": await getCsrfToken(),
    },
  }
})

const httpLink = createHttpLink({
  fetch,
  uri: `${process.env.API_URL}/graphql`,
  credentials: "include",
})

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})
