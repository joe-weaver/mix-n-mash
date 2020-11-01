import { gql, ApolloClient, InMemoryCache } from '@apollo/client';

export const userClient = new ApolloClient({
    uri: "http://localhost:3000/users",
    cache: new InMemoryCache()
})

export const getUsers = gql`
{
    users {
    _id,
    username,
    email,
    hashedPassword,
    bio,
    numFollowers,
    active
    }
}`