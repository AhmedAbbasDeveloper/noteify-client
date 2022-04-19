import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App"

const API_ENDPOINT = process.env.NODE_ENV === "production" ? "https://noteify-server.herokuapp.com/graphql" : "http://localhost:4000/graphql"
const client = new ApolloClient({
  uri: API_ENDPOINT,
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>
)
