import React from "react"
import { AppProvider } from "./AppContext"
import ApolloWrapper from "./apollo/ApolloWrapper"

export const wrapRootElement = ({ element }) => (
  <AppProvider>
    <ApolloWrapper>{element}</ApolloWrapper>
  </AppProvider>
)
