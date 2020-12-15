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
            likedMixtapes,
            dislikedMixtapes,
            receivedMashmateRequests {
                senderId,
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
        likedMixtapes,
        dislikedMixtapes,
        receivedMashmateRequests {
            senderId,
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
query qUsers($searchTerm: String!, $skip: Int!, $limit: Int!){
    queryUsers(searchTerm: $searchTerm, skip: $skip, limit: $limit){
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

export const updateUserLikes = gql`
mutation like(
    $id: String!
    $mixtapeId: String!
    $mixtapeGenres: [String]!
    $genrePreferences: [genrePreferencesInput]!
    $like: Boolean!
    $wasDisliked: Boolean!
    ){
    setLikeMixtape(
        id: $id
        mixtapeId: $mixtapeId
        mixtapeGenres: $mixtapeGenres
        genrePreferences: $genrePreferences
        like: $like
        wasDisliked: $wasDisliked
    ){
        _id
        likedMixtapes
        dislikedMixtapes
        genrePreferences{
            genre
            val
        }
    }
}`
  
export const updateUserDislikes = gql`
  mutation dislike(
      $id: String!
      $mixtapeId: String!
      $mixtapeGenres: [String]!
      $genrePreferences: [genrePreferencesInput]!
      $dislike: Boolean!
      $wasLiked: Boolean!
  ){
    setDislikeMixtape(
        id: $id
        mixtapeId: $mixtapeId
        mixtapeGenres: $mixtapeGenres
        genrePreferences: $genrePreferences
        dislike: $dislike
        wasLiked: $wasLiked
    ){
        _id
        dislikedMixtapes
        likedMixtapes
        genrePreferences{
            genre
            val
        }
    }
}`

export const updateBio = gql`
    mutation newBio(
        $id: String!
        $bio: String!
    ){
        updateBio(
            id: $id
            bio: $bio
        ){
          _id
          bio  
        }
    }
`

export const deactivateAccount = gql`
mutation deactivateUserAccount($id: String!){
    deactivateAccount(id: $id){
        active
    }
}
`

export const reactivateAccount = gql`
mutation reactivateUserAccount($id: String!){
    reactivateAccount(id: $id){
        active
    }
}
`

export const sendMMRequest = gql`
mutation sendMashmateRequest(
    $id: String!,
    $newMashmateRequest: mashmateRequestInput!
    ){
      sendMashmateRequest(
        id: $id
        newMashmateRequest: $newMashmateRequest
        ){
        _id
        receivedMashmateRequests{
            senderId
            username
            timeSent
            seen
        }
    }
}`
  
export const resolveMashmateRequest = gql`
mutation resolveMashmateRequest(
    $id: String!,
    $senderId: String!,
    $username: String!,
    $senderUsername: String!,
    $accepted: Boolean!){
        resolveMashmateRequest(
            id: $id
            senderId: $senderId
            username: $username
            senderUsername: $senderUsername
            accepted: $accepted
        ){
            _id
            receivedMashmateRequests{
                senderId
                username
                timeSent
                seen
            }
            mashmates{
                id
                username
            }
    }
}`;

export const follow = gql`
mutation followUser(
    $id: String!,
    $idToFollow: String!
    ){
        followUser(
        id: $id
        idToFollow: $idToFollow
        ){
        _id
        following
    }
}`

export const incFollowersCount = gql`
mutation incNumFollowers(
    $id: String!,
    ){
        incNumFollowers(
        id: $id
        ){
        _id
        numFollowers
    }
}`

export const unfollow = gql`
mutation unfollowUser(
    $id: String!,
    $idToUnfollow: String!
    ){
        unfollowUser(
        id: $id
        idToUnfollow: $idToUnfollow
        ){
        _id
        following
    }
}`

export const decFollowersCount = gql`
mutation decNumFollowers(
    $id: String!,
    ){
        decNumFollowers(
        id: $id
        ){
        _id
        numFollowers
    }
}`

export const removeMashmate = gql`
mutation removeMashmate(
    $id: String!,
    $mashmateId: String!,
    $username: String!,
    $mashmateUsername: String!
    ){
        removeMashmate(
            id: $id
            mashmateId: $mashmateId
            username: $username
            mashmateUsername: $mashmateUsername
        ){
            _id
            mashmates{
                id
                username
            }
    }
}`;

export const updateGenrePreferences = gql`
mutation updateGenrePrefs($id: String!, $genrePreferences: [genrePreferencesInput]!){
    updateGenrePreferences(id: $id, genrePreferences: $genrePreferences){
        _id
        genrePreferences{
            genre
            val
        }
    }
}
`

export const addUser = gql`
mutation addUser(
    $username: String!
    $email: String!
    $bio: String!
){
    addUser(
        username: $username
        email: $email
        bio: $bio
    ){
        _id
        username
    }
}
`