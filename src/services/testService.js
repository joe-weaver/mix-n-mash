import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const testClient = new ApolloClient({
    uri: "https://mix-n-mash.herokuapp.com/test",
    cache: new InMemoryCache()
})

export const getTests = gql`
{
    tests {
    _id,
    username
    }
}`



  