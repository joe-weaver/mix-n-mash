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
        active,
        mixtapes,
        receivedMashmateRequests {
            senderId,
            recipientId,
            username,
            timeSent,
            seen
        },
        mashmates
    }
}`;

export const getUser = gql`
    query User($id: String!){
        user(id: $id){
            _id,
            username,
            email,
            hashedPassword,
            bio,
            numFollowers,
            active,
            mixtapes,
            receivedMashmateRequests {
                senderId,
                recipientId,
                username,
                timeSent,
                seen
            },
            mashmates {
                id,
                username
            }
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
        active,
        mixtapes,
        receivedMashmateRequests {
            senderId,
            recipientId,
            username,
            timeSent,
            seen
        },
        mashmates {
            id,
            username
        }
    }
}`

export const queryUsers = gql`
query qUsers($searchTerm: String!){
    queryUsers(searchTerm: $searchTerm){
        _id,
        username,
        email,
        hashedPassword,
        bio,
        numFollowers,
        active,
        mixtapes,
        receivedMashmateRequests {
            senderId,
            recipientId,
            username,
            timeSent,
            seen
        },
        mashmates {
            id,
            username
        }
    }
}`

export const addUser = gql`
mutation AddUser(
        $username: String!
        $email: String!
        $hashedPassword: String!
        $bio: String!
        $numFollowers: Int!
        $following: [String]!
        $mashmates: [mashmateInput]!
        $mixtapes: [String]!
        $genrePreferences: [genrePreferencesInput]!
        $sentMashmateRequests: [mashmateRequestInput]!
        $receivedMashmateRequests: [mashmateRequestInput]!
        $active: Boolean!
    ){
    addUser(
        username: $username
        email: $email
        hashedPassword: $hashedPassword
        bio: $bio
        numFollowers: $numFollowers
        following: $following
        mashmates: $mashmates
        mixtapes: $mixtapes
        genrePreferences: $genrePreferences
        sentMashmateRequests: $sentMashmateRequests
        receivedMashmateRequests: $receivedMashmateRequests
        active: $active
    ){
        _id
        username
    }
}`;