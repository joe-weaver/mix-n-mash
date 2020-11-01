import { gql, useQuery, ApolloClient, InMemoryCache } from '@apollo/client';

export const testClient = new ApolloClient({
    uri: "http://localhost:3000/test",
    cache: new InMemoryCache()
})

export const getTests = gql`
{
    tests {
    _id,
    username
    }
}`



  