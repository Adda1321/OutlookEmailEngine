// apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';

const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/graphql',

//   uri: 'http://localhost:8082/console',
  uri: 'http://localhost:8082/v1/graphql',

});

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
});

export default apolloClient;
