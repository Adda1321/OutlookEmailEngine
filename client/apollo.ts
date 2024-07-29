import { ApolloClient, split, InMemoryCache, HttpLink } from "@apollo/client/core"
 import { WebSocketLink } from "@apollo/client/link/ws"
import { getMainDefinition } from '@apollo/client/utilities';
const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:8082/v1/graphql',
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:8082/v1/graphql',
  options: {
    reconnect: true,
  },
})

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription")
  },
  wsLink,
  httpLink
)

// Create the apollo client
const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})
export default apolloClient;
