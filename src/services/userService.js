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
}`;

export const getUser = gql`
    query User($id: String!){
        user(id: $id){
            username,
            email,
            hashedPassword,
            bio,
            numFollowers,
            active
        }
    }
`;

export const getUserByUsernameOrEmail = gql`
query User($usernameOrEmail: String!){
    getUserByUsernameOrEmail(usernameOrEmail: $usernameOrEmail){
        _id,
        username,
        email,
        hashedPassword,
        bio,
        numFollowers,
        active
    }
}`
